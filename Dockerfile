# Use the official Node image as a base
FROM node:alpine

# Set the working directory
WORKDIR /src/app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./

# RUN npm install // bad practice
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the Node.js app
CMD ["npm", "start"]