class Commit
  include Virtus.model

  attribute :sha, String
  attribute :message, String
  attribute :author, Author
end
