class ApplicationController < ActionController::API
  before_action :validate_token

  private

  def validate_token
    begin
      decoded_token = FirebaseVerify.verify_id_token(request.headers['X-Firebase-Token'])
      session[:uid] = decoded_token[0]['sub']
      session[:user] = GithubUser.where(uid: session[:uid]).first
    rescue JWT::DecodeError, InvalidTokenError => e
      render 'Unauthorized', status: :unauthorized
    end
  end
end
