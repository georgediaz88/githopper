FROM node:slim
MAINTAINER George Diaz

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD package.json $APP_HOME/

RUN npm install -g webpack
RUN npm install

ENV NODE_ENV=production \
  PATH=$APP_HOME/node_modules/.bin:$PATH

ADD . $APP_HOME

RUN npm run build

CMD ["npm", "start"]
