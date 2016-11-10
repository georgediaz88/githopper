FROM ruby:2.3.1
MAINTAINER George Diaz

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev postgresql-client-9.4

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# skip installing gem documentation
RUN echo 'gem: --no-rdoc --no-ri' >> "$HOME/.gemrc"

ADD Gemfile $APP_HOME/Gemfile
ADD Gemfile.lock $APP_HOME/Gemfile.lock

ENV BUNDLE_GEMFILE=$APP_HOME/Gemfile \
  RAILS_ENV=production

RUN gem install bundler

RUN bundle install

ADD . $APP_HOME

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

CMD bundle exec puma -C config/puma.rb
# CMD ["rails", "s", "-p", "$PORT"]
# EXPOSE 3050
