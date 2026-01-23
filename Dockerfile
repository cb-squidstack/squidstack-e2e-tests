FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy test files and config
COPY playwright.config.js ./
COPY tests/ ./tests/

# Run tests by default
CMD ["npm", "test"]
