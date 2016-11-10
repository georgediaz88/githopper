class CreateGithubUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :github_users do |t|
      t.string :uid
      t.string :email
      t.string :name
      t.string :access_token
      t.text :unfollowing, array: true, default: []
      t.timestamps
    end
    add_index :github_users, [:uid, :access_token]
  end
end
