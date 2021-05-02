FROM node:14.16.0

WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

ENTRYPOINT [ "yarn", "start" ]
