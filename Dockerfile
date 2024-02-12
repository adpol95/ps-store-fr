FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]

# # Base image
# FROM node:14

# # Working directory
# WORKDIR /app

# # Copy package.json and package-lock.json and install dependencies
# COPY package*.json ./
# RUN npm ci

# # Copy the rest of the project files
# COPY . .

# # Expose the server port
# EXPOSE 8000

# # Command to start the server
# CMD ["npm", "run", "server"]



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
