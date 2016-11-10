class Organization
  include Virtus.model

  attribute :login, String
  attribute :type, String, default: 'organization'
  attribute :avatar_url, String
end
