FROM node:18-alpine

# Install yarn globally
RUN corepack enable && yarn set version stable

WORKDIR /usr/src/app

# Copy dependency files
COPY package.json yarn.lock ./

COPY . .

ENV NODE_ENV=production

# Install dependencies
RUN yarn install --check-cache


EXPOSE 8000

CMD ["yarn", "start"]
