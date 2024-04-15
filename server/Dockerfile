FROM node:18

# Install necessary build tools
RUN apt-get update && \
    apt-get install -y cmake build-essential

WORKDIR /app

COPY server/package*.json ./
COPY server/yarn.lock ./

# Install dependencies
RUN yarn install

COPY server/ .

EXPOSE 3001

CMD ["yarn", "start"]