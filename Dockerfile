# Use the official Node.js image as the base image
FROM --platform=linux/amd64 node:20.11-alpine

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Specify the command to run your application
CMD ["npm", "run", "start"]