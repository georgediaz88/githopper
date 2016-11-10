class Api::V1::ReposController < ApplicationController
  def index
    github_user = session[:user]
    github = Octokit::Client.new(access_token: github_user.access_token, per_page: 1000)

    if params[:type] == 'organization'
      organization_name = params[:login]
      repos = github.org_repos(params[:login])
    else
      organization_name = github.user.login
      repos = github.repos.select{|repo| repo[:owner][:type] == 'User'}
    end

    repos.map! do |repo|
      reference_name = "#{organization_name}:#{repo.full_name}"
      repo[:reference_name] = reference_name
      repo[:subscribed] = false if github_user.unfollowing.include?(reference_name)
      Repository.new(repo)
    end

    render json: repos
  end
end
