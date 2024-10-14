# Backend Dockerfile
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port and start the application
EXPOSE 5000
CMD ["npm", "start"]