# Create base node image and install curl, bash and node prude
FROM node:alpine AS base
RUN apk update && apk add curl bash && curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# Install the dependencies and build the next project
FROM base AS builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
ENV NODE_ENV=production
RUN yarn run build

# Clean node module folder for production and clear next cache
RUN npm prune --production --no-audit
RUN /usr/local/bin/node-prune
RUN rm -rf /app/.next/cache

# Copy relevant files from builder and start the next server
FROM gcr.io/distroless/nodejs
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/.next/ ./.next/
# COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public/ ./public
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]

