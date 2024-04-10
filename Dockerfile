# Use the official Node.js image as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install

# Build the React application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]

#FROM node:21 as build
#WORKDIR /app
#COPY package*.json ./
#RUN npm ci
#COPY . .
#RUN npm run build
## Stage 2: Serve the React application using Nginx
#FROM nginx:stable-alpine
#
#COPY --from=build /app/build /usr/share/nginx/html
#
## Copy the default nginx.conf provided by the docker image
#COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
#
#EXPOSE 5000
#
#CMD ["nginx", "-g", "daemon off;"]