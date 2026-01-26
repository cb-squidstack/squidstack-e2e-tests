FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install Playwright browsers
RUN npx playwright install chromium

# Copy playwright config (tests will come from ConfigMap)
COPY playwright.config.js ./

# Keep container running - tests will be executed via kubectl exec
CMD ["tail", "-f", "/dev/null"]
