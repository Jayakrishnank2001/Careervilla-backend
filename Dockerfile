# Use the official Node image as a base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json .

COPY tsconfig*.json .

# RUN npm install // bad practice
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the Node.js app
CMD ["npm", "start"]


# FROM ubuntu as build

# RUN apt-get update
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
# RUN apt-get upgrade -y
# RUN apt-get install -y nodejs
# RUN apt-get install  typescript

# WORKDIR /app

# COPY package.json package.json
# COPY package-lock.json package-lock.json

# RUN npm install
# RUN tsc -p .

# FROM node as runner 
# WORKDIR /app
# COPY --from=build /app . 
# ENTRYPOINT [ "node", "/app/src/index.js" ]