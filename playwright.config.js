// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://localhost:8080' },
  // Chromium only
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // Starts the booking page automatically before the tests run
  webServer: {
    command: 'npx http-server app -p 8080 -s',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});
