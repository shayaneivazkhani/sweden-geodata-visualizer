FROM node:18

# Install necessary build tools
RUN apt-get update && \
    apt-get install -y cmake build-essential

# Set working directory
WORKDIR /app

# Copy directory to env
COPY server/ /app

# Install dependencies
RUN yarn install --production=true --audit

EXPOSE 3001

CMD ["yarn", "start"]