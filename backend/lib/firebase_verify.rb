class FirebaseVerify

  PROJECT_ID = 'project-5391227025497230644'
  ALGORITHM = 'RS256'
  CLIENT_CERT_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'

  @@public_keys_cache = nil
  @@public_keys_expiration = nil

  def self.verify_id_token(token)
    verification = new(token)
    verification.verify_token!
  end

  def initialize(token)
    @token = token
  end

  def fetch_public_keys
    return @@public_keys_cache unless !@@public_keys_cache || !@@public_keys_expiration || (@@public_keys_expiration < Time.now)
    uri = URI.parse(CLIENT_CERT_URL)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
    cache_expiration_seconds = response['cache-control'].match(/max\-age=(\d+)/)[1].to_i
    @@public_keys_expiration = Time.now + cache_expiration_seconds
    @@public_keys_cache = JSON.parse(response.body)
  end

  def cert_to_public_rsa_key(pem)
    OpenSSL::X509::Certificate.new(pem).public_key
  end

  def verify_token!
    keys = fetch_public_keys
    decoded_token = JWT.decode(@token, nil, false)
    decoded_payload = decoded_token.first
    decoded_headers = decoded_token.last

    error_message = nil
    if decoded_headers['alg'] != ALGORITHM
      error_message = 'Firebase Auth ID token has incorrect algorithm'
    elsif decoded_headers['kid'].blank?
      error_message = 'Firebase Auth ID token has no "kid" claim'
    elsif Time.at(decoded_payload['iat']) < Time.now
      error_message = ''
    elsif Time.at(decoded_payload['exp']) > Time.now
      error_message = ''
    elsif decoded_payload['aud'] != PROJECT_ID
      error_message = 'Firebase Auth ID token has incorrect "aud" claim'
    elsif decoded_payload['iss'] != "https://securetoken.google.com/#{PROJECT_ID}"
      error_message = 'Firebase Auth ID token has incorrect "aud" claim'
    elsif decoded_payload['sub'].blank?
      error_message = 'Firebase Auth ID token has invalid "sub" claim'
    end
    raise error_message if error_message.present?

    rsa_public = cert_to_public_rsa_key(keys[decoded_headers['kid']])
    JWT.decode(@token, rsa_public, true, { algorithm: ALGORITHM })
  end

end
