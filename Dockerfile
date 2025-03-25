# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# update npm version to latest
RUN npm install -g npm@latest

# Install pnpm
RUN npm install -g pnpm

# cache clean
RUN npm cache clean --force

# Install the application dependencies
RUN pnpm install

# update the application dependencies latest version
RUN pnpm update --latest

# Copy the rest of the application files
COPY . .


# RUN chmod +x /usr/src/app
# RUN chmod +x /usr/src/app/entrypoint.sh

# Generate Prisma Client code
RUN npx prisma generate

# Build the NestJS application
RUN pnpm run build
# for development
# RUN pnpm run start:dev

# ENTRYPOINT ["/usr/src/app/entrypoint.sh", "pnpm", "run", "start:dev"]

EXPOSE 3011

# Command to run the application
# CMD ["node", "dist/main"]
CMD ["pnpm", "run", "start:migrate:dev"]