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
CMD [ "npm", "run", "dev" ]