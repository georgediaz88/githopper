class Api::V1::OrganizationsController < ApplicationController
  def index
    github_user = session[:user]
    github = Octokit::Client.new(access_token: github_user.access_token)
    organizations = github.organizations.map{|organization| Organization.new(organization) }
    github_client_user = github.user

    # default
    organizations << Organization.new({
      login: github_client_user.login,
      avatar_url: github_client_user.avatar_url,
      type: github_client_user.type
    })
    render json: organizations
  end
end
