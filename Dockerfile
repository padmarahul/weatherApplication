FROM node:14.2-alpine

WORKDIR /app

COPY package.json ./
COPY ./ ./

# RUN npm install -g yarn

RUN npm install

RUN npm install -g serve@13.0.4

RUN npm run-script build

ENTRYPOINT [ "serve", "-s", "build"]
