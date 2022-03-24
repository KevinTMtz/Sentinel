FROM node:14

WORKDIR /usr/local/bin/web

COPY . /usr/local/bin/web/

RUN yarn install

RUN yarn install --cwd ./client

RUN yarn --cwd ./client build

CMD ["yarn", "start"]