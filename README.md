# [githopper](http://www.githopper.com)
Sometimes we forget what we did at Scrum :(. So, this modern web application is your extra brain that gives you this information by accessing your Github activity for the current week.

The application is split into two apps that are brought up as one through our great friend, Docker. See the `docker-compose.yml` file for more.

## Frontend App
This is a rich frontend app utilizing:
  * React (15.1)
  * React Router
  * Redux (state management),
  * Firebase 3.x for Github OAuth Authentication
  * JSON web token used for current user session
  * React Flexbox Grid
  * React Icons
  * Webpack
  * Sass
  * ScrollReveal
  * animate.css

## Backend App
This is the API written in Rails 5.

### Running the App
I recommend first installing [Docker for Mac (stable)](https://docs.docker.com/docker-for-mac/)

1. Run `docker-compose build backend`
2. Run `docker-compose build frontend`
3. Run `docker-compose run --rm backend rake db:create db:migrate`
4. Run `docker-compose run --rm frontend npm install`
5. Finally boot the app `docker-compose up`

If you would like to contribute a feature to this app, create an issue so I can give you the Green Light :).

### Deployment
This app was previously deployed to DockerCloud. Versioned _docker cloud_ files show what that configuration looks like. This app currently lives on [Heroku's Docker-based infrastructure](https://devcenter.heroku.com/articles/container-registry-and-runtime).
