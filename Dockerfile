# Stage 1: Install dependencies and build
FROM node:16 AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the backend directory
COPY package.json package-lock.json ./

RUN npm install --verbose

# Copy the rest of the application code from the backend directory
COPY . .

# Install Nest CLI and build the application
RUN npm install -g @nestjs/cli && nest build

# Stage 2: Create the runtime image
FROM node:16-alpine

WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/package-lock.json ./package-lock.json

# Reinstall node_modules to ensure correct binaries for Alpine
RUN npm install --production

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/main"]
