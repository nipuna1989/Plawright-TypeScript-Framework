import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 50000,
  retries: 0,
  
  // HTML Report Configuration
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never' // Change to 'always' to auto-open report
    }],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }],
    ['list'] // Console output
  ],

  use: {
    headless: true, // Use headless mode in CI, can be overridden locally
    baseURL: 'https://conduit-realworld-example-app.fly.dev',
    viewport: { width: 1280, height: 720 },
    
    // Enhanced debugging options
    screenshot: 'only-on-failure', // 'always' | 'only-on-failure' | 'off'
    video: 'retain-on-failure',    // 'always' | 'retain-on-failure' | 'off'
    trace: 'retain-on-failure',    // 'always' | 'retain-on-failure' | 'off'
    
    // Additional debugging
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  // Define projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
