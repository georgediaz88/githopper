Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :organizations, only: :index
      resources :repos, only: :index
      resources :user_events, only: :index
      resources :github_users, only: :create
      post '/github_users/unfollow', to: 'github_users#unfollow'
      post '/github_users/follow', to: 'github_users#follow'
    end
  end
end
