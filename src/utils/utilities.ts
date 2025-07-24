import { Page } from '@playwright/test';

/**
 * Generates a random ID within a specified range
 * @param min - Minimum value (default: 10000)
 * @param max - Maximum value (default: 999999)
 * @returns string - Random ID as a string
 */
export function generateRandomId(min: number = 10000, max: number = 999999): string {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
