FROM node:alpine
# FROM node:14.15.4-alipne3.12

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
