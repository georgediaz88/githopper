class Api::V1::GithubUsersController < ApplicationController
  skip_before_action :validate_token, only: :create

  def create
    user = GithubUser.where(uid: params[:uid]).first_or_initialize
    if user.update_attributes(user_params)
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: 422
    end
  end

  def follow
    github_user = session[:user]
    github = Octokit::Client.new(access_token: github_user.access_token, per_page: 1000)

    if params[:mass_update] && params[:repos].any?
      # mass updating helps clean stale data in `unfollowing`
      organization_name = params[:repos].first.split(":").first
      params[:repos].each do |repo|
        github_user.unfollowing.reject!{|unfollowing_repo| unfollowing_repo.start_with?(organization_name) }
      end
    else
      params[:repos].each do |repo|
        github_user.unfollowing.reject!{|unfollowing_repo| unfollowing_repo == repo }
      end
    end

    if github_user.save
      render json: github_user
    else
      render json: { errors: github_user.errors.full_messages }, status: 422
    end
  end

  def unfollow
    github_user = session[:user]
    github = Octokit::Client.new(access_token: github_user.access_token, per_page: 1000)

    if params[:repos].any?
      github_user.unfollowing.push(*params[:repos]).uniq!
    end

    if github_user.save
      render json: github_user
    else
      render json: { errors: github_user.errors.full_messages }, status: 422
    end
  end

  def user_params
    params.require(:github_user).permit(:email, :uid, :name, :access_token)
  end
end
