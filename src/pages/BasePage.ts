import { Page } from '@playwright/test';

/**
 * Base page class that provides common functionality for all page objects.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Waits for the page to fully load with multiple loading states.
   * This method combines common waiting patterns used across different pages.
   * @param timeout - Maximum time to wait in milliseconds (default: 30000)
   * @returns Promise<boolean> - true if page loaded successfully
   */
  async waitForPageToLoad(timeout: number = 30000): Promise<boolean> {
    try {      
      await this.page.waitForLoadState('networkidle', { timeout });
      await this.page.waitForLoadState('domcontentloaded', { timeout });    
      return true;
    } catch (error) {
      console.error('Failed to wait for page to load:', error);
      return false;
    }
  }

  /**
   * Navigates to a specific URL and waits for page to load.
   * This is a common pattern used across all page objects for navigation.
   * @param url - The URL to navigate to
   * @param timeout - Maximum time to wait in milliseconds (default: 30000)
   * @returns Promise<boolean> - true if navigation was successful
   */
  async navigateTo(url: string, timeout: number = 30000): Promise<boolean> {
    try {
      console.log(`Navigating to: ${url}`);
      await this.page.goto(url);
      await this.waitForPageToLoad(timeout);
      console.log(`Successfully navigated to: ${url}`);
      return true;
    } catch (error) {
      console.error(`Failed to navigate to ${url}:`, error);
      return false;
    }
  }
}
