import { Page, Locator, expect } from '@playwright/test';
import { HomePage } from './HomePage';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginroot: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginroot = page.locator('div.auth-page');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button.btn-primary');
  }

  /**
   * Helper method to fill login form and click login button.
   * @param email - Email address to fill
   * @param password - Password to fill
   */
  private async fillLoginFormAndClick(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

   /**
   * Navigates to the login page.
   * @returns Promise<boolean> - true if successfully navigated to editor
   */
  async gotoLoginPage(): Promise<boolean> {
    try {
      await this.navigateTo('/#/login');
      await this.loginroot.waitFor({ state: 'visible' });
      console.log('Login page is visible');
      return true;
    } catch (error) {
      console.error('Failed to navigate to login page:', error);
      return false;
    }
  }

  /**
   * Logs in with valid credentials and navigates to home page.
   * @param email - Valid email address
   * @param password - Valid password
   * @returns Promise<boolean> - true if successfully navigated to home page
   */
  async loginWithValidCredentials(email: string, password: string): Promise<boolean> {
    try {
      console.log('Logging in with valid credentials');
      await this.fillLoginFormAndClick(email, password);
      await this.waitForPageToLoad();
      await this.page.waitForURL('/#/');
      
      // Check authentication state
      const homePage = new HomePage(this.page);
      const isAuthenticated = await homePage.isUserAuthenticated();
      
      if (isAuthenticated) {
        console.log('Successfully logged in and user is fully authenticated');
        return true;
      } else {
        console.log('Login completed but user authentication verification failed');
        return false;
      }
    } catch (error) {
      console.log('Failed to login with valid credentials:', error);
      return false;
    }
  }

  /**
   * Logs in with invalid email and returns error message.
   * @param email - Invalid email address
   * @param password - Any password
   * @returns Promise<string> - error message for invalid email
   */
  async loginWithInvalidEmail(email: string, password: string): Promise<string> {
    console.log('Logging in with invalid email');
    await this.fillLoginFormAndClick(email, password);
    await this.page.waitForSelector('ul.error-messages');
    const errorMessage = await this.page.locator('ul.error-messages li').textContent();
    console.log('Error message:', errorMessage);
    return errorMessage || '';
  }

  /**
   * Logs in with valid email but wrong password and returns error message.
   * @param email - Valid email address
   * @param password - Invalid password
   * @returns Promise<string> - error message for wrong password
   */
  async loginWithWrongPassword(email: string, password: string): Promise<string> {
    console.log('Logging in with wrong password');
    await this.fillLoginFormAndClick(email, password);
    await this.page.waitForSelector('ul.error-messages');
    const errorMessage = await this.page.locator('ul.error-messages li').textContent();
    console.log('Error message:', errorMessage);
    return errorMessage || '';
  }
}
