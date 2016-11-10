class Api::V1::UserEventsController < ApplicationController
  def index
    github_user = session[:user]
    github = Octokit::Client.new(access_token: github_user.access_token, per_page: 1000)
    github_client_user = github.user

    user_events = github.user_events(github_client_user.login, { per_page: 100, page: 1}).sort_by!(&:created_at)

    if user_events.first.created_at > 7.days.ago
      user_events.concat(github.user_events(github_client_user.login, { per_page: 100, page: 2})).sort_by!(&:created_at)

      if user_events.first.created_at > 7.days.ago
        user_events.concat(github.user_events(github_client_user.login, { per_page: 100, page: 3})).sort_by!(&:created_at)
      end
    end

    normalized_events = user_events.map do |user_event|

      if user_event.type == "PullRequestEvent"
        organization = user_event.payload.pull_request.head.repo.owner
        repo_name = user_event.payload.pull_request.head.repo.full_name
        normalized_user_event = UserEvent.new({
          action_type: 'pull_request',
          action_text: "#{user_event.payload.action} pull request",
          title: user_event.payload.pull_request.title,
          repo_name: repo_name,
          organization: organization,
          event_url: user_event.payload.pull_request.html_url,
          created_at: user_event.created_at
        })
      elsif user_event.type == "CreateEvent"
        organization = get_or_set_organization(github_client_user, user_event)
        repo_name = user_event.repo.name
        normalized_user_event = UserEvent.new({
          action_type: user_event.payload.ref_type,
          action_text: "created #{user_event.payload.ref_type}",
          title: user_event.payload.ref,
          repo_name: repo_name,
          organization: organization,
          event_url: "https://github.com/#{user_event.repo.name}/tree/#{user_event.payload.ref}",
          created_at: user_event.created_at
        })
      elsif user_event.type == "DeleteEvent"
        organization = get_or_set_organization(github_client_user, user_event)
        repo_name = user_event.repo.name
        normalized_user_event = UserEvent.new({
          action_type: user_event.payload.ref_type,
          action_text: "deleted #{user_event.payload.ref_type}",
          title: user_event.payload.ref,
          repo_name: repo_name,
          organization: organization,
          created_at: user_event.created_at
        })
      elsif user_event.type == "PushEvent"
        organization = get_or_set_organization(github_client_user, user_event)
        repo_name = user_event.repo.name
        normalized_user_event =UserEvent.new({
          action_type: 'commit',
          action_text: get_commit_message(user_event),
          title: user_event.payload.ref.split("refs/heads/").last,
          repo_name: repo_name,
          organization: organization,
          commits: user_event.payload.commits,
          event_url: "https://github.com/#{user_event.repo.name}/tree/#{user_event.payload.ref.split("refs/heads/").last}",
          compare_url: "https://github.com/#{user_event.repo.name}/compare/#{user_event.payload.before}...#{user_event.payload.head}",
          created_at: user_event.created_at
        })
      else
        next
      end
      next if github_user.unfollowing.include?("#{organization[:login]}:#{repo_name}")
      normalized_user_event
    end.compact

    render json: normalized_events
  end

  private

  def get_commit_message(user_event)
    if user_event.payload.size == 1
      "pushed 1 commit to"
    else
      "pushed #{user_event.payload.size} commits to"
    end
  end

  def get_or_set_organization(github_client_user, user_event)
    return user_event.org if user_event.org.present?
    # otherwise, it was your organization who did it if not present
    {
      login: github_client_user.login,
      avatar_url: github_client_user.avatar_url,
      type: github_client_user.type
    }
   end

end
