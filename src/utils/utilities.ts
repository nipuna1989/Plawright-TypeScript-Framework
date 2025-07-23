import { Page, expect } from '@playwright/test';

/**
 * Takes a screenshot and compares it with baseline for visual regression testing
 * @param page - Playwright page object
 * @param name - Name for the screenshot
 * @param threshold - Pixel difference threshold (0-1, default 0.2)
 */
export async function takeVisualSnapshot(page: Page, name: string, threshold: number = 0.2): Promise<void> {
  // Use Playwright's built-in visual comparison
  await expect(page).toHaveScreenshot(`login-${name}.png`, {
    threshold,
    maxDiffPixels: 1000
  });
  
  console.log(`Visual snapshot taken and compared: login-${name}.png`);
}