# Frontend Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose the port and build the frontend
EXPOSE 3000
CMD ["yarn", "dev", "--host"]