import { test, expect } from './utils/fixtures';
import { loginTestData } from '../src/data/loginTestData';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Login Page', () => {
  test.beforeAll(async () => {
    // Ensure screenshots directory exists
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });
  // Loop through each test data scenario
  loginTestData.forEach(({ email, password, scenario, expectedError }) => {
    test(`should handle ${scenario} login with email: ${email}`, async ({ loginPage, homePage, page }) => {
       
      // step 1: Navigate to the home page
      console.log(`Step 1: Navigating to home page for ${scenario} test`);
      const navigateToHomePage = await homePage.goToHomePage();
      expect(navigateToHomePage).toBe(true);
      await page.waitForTimeout(2000);

      // Step 2: Navigate to the login page
      console.log(`Step 2: Navigating to login page...`);
      const navigatedToLogin = await homePage.goToLoginPageFromHomePage();
      expect(navigatedToLogin).toBe(true);
      await page.waitForTimeout(2000);      
      
      // Step 3: Execute the appropriate login scenario based on test data
      if (scenario === 'valid') {
        // Step 3a: Attempt login with valid credentials
        console.log(`Step 3a: Attempting login with valid credentials (${email})`);
        const success = await loginPage.loginWithValidCredentials(email, password);
        await page.waitForTimeout(2000);
        // Step 4a: Verify successful navigation to home page
        console.log(`Step 4a: Verifying successful login`);
        expect(success).toBe(true);
        await page.waitForTimeout(1500);
      } else if (scenario === 'invalid_email') {
        // Step 3b: Attempt login with invalid email
        console.log(`Step 3b: Attempting login with invalid email (${email})`);
        const errorMessage = await loginPage.loginWithInvalidEmail(email, password);
        await page.waitForTimeout(2000);
        // Step 4b: Verify correct error message for invalid email
        console.log(`Step 4b: Verifying error message for invalid email`);
        console.log(`Expected: "${expectedError}", Actual: "${errorMessage}"`);
        expect(errorMessage).toBe(expectedError);
        await page.waitForTimeout(1500);
      } else if (scenario === 'wrong_password') {
        // Step 3c: Attempt login with wrong password
        console.log(`Step 3c: Attempting login with wrong password for ${email}`);
        const errorMessage = await loginPage.loginWithWrongPassword(email, password);
        await page.waitForTimeout(2000);
        // Step 4c: Verify correct error message for wrong password
        console.log(`Step 4c: Verifying error message for wrong password`);
        console.log(`Expected: "${expectedError}", Actual: "${errorMessage}"`);
        expect(errorMessage).toBe(expectedError);
        await page.waitForTimeout(1500);
      }

      console.log(` ${scenario} login test completed successfully!`);
    });
  });
});
