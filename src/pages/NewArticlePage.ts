import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NewArticlePage extends BasePage {
  readonly editorroot: Locator;
  readonly articletitle: Locator;
  readonly articledescription: Locator;
  readonly articlebody: Locator;
  readonly articletags: Locator;
  readonly publishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.editorroot = page.locator('form');
    this.articletitle = page.locator('input[name="title"]');
    this.articledescription = page.locator('input[name="description"]');
    this.articlebody = page.locator('textarea[name="body"]');
    this.articletags = page.locator('input[name="tags"]');
    this.publishButton = page.locator('button[type="submit"]');
  }

  /**
   * Creates a new article by filling all required fields and publishing.
   * @param title - Article title
   * @param description - Article description
   * @param body - Article body content
   * @param tags - Article tags as array
   * @returns Promise<boolean> - true if article created successfully
   */

  /**
   * Navigates to the new article editor page.
   * @returns Promise<boolean> - true if successfully navigated to editor
   */
  async gotoNewArticlePage(): Promise<boolean> {
    try {
      await this.navigateTo('/#/editor');
      await this.editorroot.waitFor({ state: 'visible' });
      console.log('New article editor page is visible');
      return true;
    } catch (error) {
      console.error('Failed to navigate to new article editor:', error);
      return false;
    }
  }

  async createArticle(
    title: string,
    description: string,
    body: string,
    tags: string[]
  ): Promise<boolean> {
    try {
      console.log('Creating new article:', title);

      // Fill in the article fields
      await this.articletitle.fill(title);
      await this.articledescription.fill(description);
      await this.articlebody.fill(body);      
      await this.articletags.click();
      await this.articletags.fill('');
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        console.log(`Adding tag: "${tag}"`);
        await this.articletags.pressSequentially(tag);
        if (i < tags.length - 1) {
          await this.articletags.pressSequentially(' ');
        }
        await this.page.waitForTimeout(100);
      }
      // Click the publish button
      console.log('Clicking publish button');
      await this.publishButton.click();
      await this.waitForPageToLoad();

      // Generate proper URL slug 
      const expectedSlug = title
        .toLowerCase()
        .replace(/\s+/g, '-')           
        .replace(/[^\w\-]/g, '')        
        .replace(/--+/g, '-')           
        .replace(/^-|-$/g, '');        

      await this.page.waitForURL(new RegExp(`.*article.*${expectedSlug}.*`));
      
      const currentUrl = this.page.url();
      const isOnCorrectArticlePage = currentUrl.includes(expectedSlug);
      
      if (isOnCorrectArticlePage) {
        console.log('Article created successfully and navigated to correct article page:', currentUrl);
        return true;
      } else {
        console.log('Article creation failed - not on expected article page. Expected slug:', expectedSlug, 'Actual:', currentUrl);
        return false;
      }
    } catch (error) {
      console.log('Failed to create article:', error);
      return false;
    }
  }

  /**
   * Verifies that article fields contain the expected data (for edit scenarios).
   * @param expectedTitle - Expected article title
   * @param expectedDescription - Expected article description  
   * @param expectedBody - Expected article body content
   * @param expectedTags - Expected article tags as array
   * @returns Promise<boolean> - true if all fields contain expected data
   */
  async verifyArticleFieldsData(
    expectedTitle: string,
    expectedDescription: string,
    expectedBody: string,
    expectedTags: string[]
  ): Promise<boolean> {
    try {
      console.log('Verifying existing article fields data...');

      // Wait for fields to be visible
      await this.articletitle.waitFor({ state: 'visible' });
      await this.articledescription.waitFor({ state: 'visible' });
      await this.articlebody.waitFor({ state: 'visible' });
      await this.articletags.waitFor({ state: 'visible' });

      // Verify title
      const actualTitle = await this.articletitle.inputValue();
      if (actualTitle !== expectedTitle) {
        console.log(`Title verification failed. Expected: "${expectedTitle}", Actual: "${actualTitle}"`);
        return false;
      }
      console.log(`Title verification passed: "${actualTitle}"`);

      // Verify description
      const actualDescription = await this.articledescription.inputValue();
      if (actualDescription !== expectedDescription) {
        console.log(`Description verification failed. Expected: "${expectedDescription}", Actual: "${actualDescription}"`);
        return false;
      }
      console.log(`Description verification passed: "${actualDescription}"`);

      // Verify body
      const actualBody = await this.articlebody.inputValue();
      if (actualBody !== expectedBody) {
        console.log(`Body verification failed. Expected: "${expectedBody}", Actual: "${actualBody}"`);
        return false;
      }
      console.log(`Body verification passed: "${actualBody.substring(0, 50)}..."`);

      // Verify tags - handle both comma-separated (edit view) and space-separated (create view) formats
      const actualTagsValue = await this.articletags.inputValue();
      console.log(`Raw tags value from input: "${actualTagsValue}"`);

      // Check for comma-separated format (edit view)
      let expectedTagsValue: string;
      let isCommaFormat = actualTagsValue.includes(',');
      
      if (isCommaFormat) {
        // Sort both expected and actual tags for consistent comparison in edit view
        const actualTagsSorted = actualTagsValue.split(',').map(tag => tag.trim()).sort();
        const expectedTagsSorted = expectedTags.slice().sort();
        expectedTagsValue = expectedTagsSorted.join(',');
        
        console.log(`Edit view format detected - comparing sorted tags`);
        console.log(`Expected (sorted): "${expectedTagsValue}"`);
        console.log(`Actual (sorted): "${actualTagsSorted.join(',')}"`);
        
        if (actualTagsSorted.join(',') !== expectedTagsValue) {
          console.log(`Tags verification failed. Expected: "${expectedTagsValue}", Actual: "${actualTagsSorted.join(',')}"`);
          return false;
        }
      } else {
        // Space-separated format (create view)
        expectedTagsValue = expectedTags.join(' ');
        console.log(`Create view format detected`);
        console.log(`Expected: "${expectedTagsValue}"`);
        console.log(`Actual: "${actualTagsValue}"`);
        
        if (actualTagsValue !== expectedTagsValue) {
          console.log(`Tags verification failed. Expected: "${expectedTagsValue}", Actual: "${actualTagsValue}"`);
          return false;
        }
      }      
      console.log(`Tags verification passed: "${actualTagsValue}"`);

      console.log('All field verifications passed - data is correctly populated');
      return true;
    } catch (error) {
      console.log('Error verifying article fields data:', error);
      return false;
    }
  }  
}
