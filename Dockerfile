# Stage 1: Build the React application
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

## Copy the default nginx.conf provided by the docker image
#COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



#FROM node:16-alpine AS builder
## Set working directory
#WORKDIR /app
## Copy all files from current directory to working dir in image
#COPY . .
## install node modules and build assets
#RUN yarn install && yarn build
#
## nginx state for serving content
#FROM nginx:alpine
## Set working directory to nginx asset directory
#WORKDIR /usr/share/nginx/html
## Remove default nginx static assets
#RUN rm -rf ./*
## Copy static assets from builder stage
#COPY --from=builder /app/build .
## Containers run nginx with global directives and daemon off
#ENTRYPOINT ["nginx", "-g", "daemon off;"]