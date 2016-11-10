class UserEvent
  include Virtus.model

  attribute :action_type, String
  attribute :action_text, String
  attribute :title, String
  attribute :organization, Organization
  attribute :repo_name, String
  attribute :event_url, String
  attribute :compare_url, String
  attribute :commits, Array[Commit]
  attribute :created_at, DateTime
end

