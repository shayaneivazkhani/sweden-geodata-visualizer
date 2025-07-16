# Use Node 18 as build image
FROM node:18

RUN apt-get update && \
    apt-get install -y cmake build-essential

# Set working directory
WORKDIR /app

# Copy directory to env
COPY client/ /app

# Install dependencies using Yarn
# yarn install --frozen-lockfile — Don’t generate a yarn.lock lockfile and fail if an update is needed.
# yarn install --production[=true|false] — --production is the same as --production=true
# yarn install --audit — Checks for known security issues with the installed packages.
RUN yarn install --production=true --audit
RUN yarn build 

# Expose port 3000
EXPOSE 3000

# Serve the production build output using serve
RUN yarn global add serve
CMD ["serve", "-s", "build"]
