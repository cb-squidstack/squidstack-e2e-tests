# Squidstack E2E Tests

End-to-end tests for the Squidstack application using Playwright.

## Structure

```
squidstack-e2e-tests/
├── chart/              # Helm chart for deploying tests as Kubernetes Job
├── tests/              # Playwright test files
├── Dockerfile          # Docker image for test runner
├── package.json        # Node.js dependencies
└── playwright.config.js # Playwright configuration
```

## Running Locally

```bash
npm install
npm test
```

## Building Docker Image

```bash
docker build -t gururepservice/squidstack-e2e-tests:latest .
docker push gururepservice/squidstack-e2e-tests:latest
```

## Deploying with Helm

```bash
helm install e2e-tests ./chart \
  --set baseUrl=https://squid-demo-3.guru-rep.sa-demo.beescloud.com \
  --set image.tag=<version>
```

## CI/CD Integration

The tests are automatically run after deployment via the CloudBees workflow.
