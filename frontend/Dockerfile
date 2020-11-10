FROM node:13.7.0-alpine
USER root

WORKDIR /frontend
COPY . /frontend
ARG API_URL
ENV REACT_APP_HOST_IP_ADDRESS $API_URL

RUN yarn
RUN yarn build