FROM node:14.16.0

WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]
