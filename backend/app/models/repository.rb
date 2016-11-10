class Repository
  include Virtus.model

  attribute :id, String
  attribute :name, String
  attribute :full_name, String
  attribute :description, String
  attribute :reference_name, String
  attribute :subscribed, Boolean, default: true
  attribute :created_at, DateTime
  attribute :updated_at, DateTime
  attribute :html_url, String
  attribute :owner, Hash
end
