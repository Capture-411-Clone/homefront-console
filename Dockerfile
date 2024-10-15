# Define the base image for the builder
FROM node:20.10 as builder

WORKDIR /app

# Set an environment variable for the Yarn cache
ENV YARN_CACHE_FOLDER /root/.yarn-cache

# Copy package files
COPY package.json yarn.lock ./

# Install all dependencies including devDependencies
# Use the cache directory specified
RUN yarn install --cache-folder $YARN_CACHE_FOLDER

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Define the base image for the production environment
FROM node:20.10

WORKDIR /app

# Set the same environment variable for the Yarn cache in the production image
ENV YARN_CACHE_FOLDER /root/.yarn-cache

# Update and install necessary packages
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    dnsutils \
    curl \
    poppler-utils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json yarn.lock ./

# Copy the Yarn cache from the builder stage
# This allows us to use the already cached dependencies without redownloading
COPY --from=builder $YARN_CACHE_FOLDER $YARN_CACHE_FOLDER


# Install only production dependencies using the cached data
RUN yarn install --production --cache-folder $YARN_CACHE_FOLDER

# Copy the build output from the builder stage
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

ENV NODE_ENV production

EXPOSE 6655

CMD ["yarn", "start"]
