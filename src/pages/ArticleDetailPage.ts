import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ArticleDetailPage extends BasePage {
  readonly articlePage: Locator;
  readonly articleTitle: Locator;
  readonly articleBody: Locator;
  readonly articleTags: Locator;
  readonly deleteButton: Locator;
  readonly editButton: Locator;

  constructor(page: Page) {
    super(page);
    this.articlePage = page.locator('div.article-page');
    this.articleTitle = page.locator('.banner h1');
    this.articleBody = page.locator('.article-content .col-md-12');
    this.articleTags = page.locator('.article-content .tag-list .tag-default');
    this.deleteButton = page.locator('button.btn.btn-sm:has(i.ion-trash-a)').first();
    this.editButton = page.locator('a.nav-link:has(i.ion-edit)').first();
  }

  /**
   * Gets the article title from the page.
   * @returns Promise<string> - the article title
   */
  async getArticleTitle(): Promise<string> {
    const title = await this.articleTitle.textContent();
    return title?.trim() || '';
  }

  /**
   * Validates if the article title matches the expected title.
   * @param expectedTitle - the expected article title
   * @returns Promise<boolean> - true if the title matches
   */
  async validateArticleTitle(expectedTitle: string): Promise<boolean> {
    const actualTitle = await this.getArticleTitle();
    return actualTitle.trim() === expectedTitle.trim();
  }

  /**
   * Gets the article body content from the page.
   * @returns Promise<string> - the article body content
   */
  async getArticleBody(): Promise<string> {
    return await this.articleBody.textContent() || '';
  }  

    /**
   * Validates if the article title matches the expected title.
   * @param expectedTitle - the expected article title
   * @returns Promise<boolean> - true if the title matches
   */
  async validateArticleBody(expectedBody: string): Promise<boolean> {
    const actualBody = await this.getArticleBody();
    return actualBody.trim() === expectedBody.trim();
  }

  /**
   * Gets all article tags from the page.
   * @returns Promise<string[]> - array of tag names
   */
  async getArticleTags(): Promise<string[]> {
    const tagElements = await this.articleTags.all();
    const tags: string[] = [];
    
    for (const tag of tagElements) {
      const tagText = await tag.textContent();
      if (tagText) {
        tags.push(tagText.trim());
      }
    }
    
    return tags;
  }

  /**
   * Validates if the article has specific tags.
   * @param expectedTags - array of expected tag names
   * @returns Promise<boolean> - true if all expected tags are present
   */
  async validateArticleTags(expectedTags: string[]): Promise<boolean> {
    const actualTags = await this.getArticleTags();
    return expectedTags.every(expectedTag => actualTags.includes(expectedTag));
  }

  /**
   * Deletes the article by clicking delete button and confirming the alert.
   * @returns Promise<boolean> - true if deletion was successful
   */
  async deleteArticle(): Promise<boolean> {
    try {
      console.log('Starting article deletion process');

      // Set up dialog handler before clicking delete button
      this.page.once('dialog', async (dialog) => {
        console.log(`Dialog appeared with message: "${dialog.message()}"`);
        console.log(`Dialog type: ${dialog.type()}`);
        try {
          await dialog.accept();
          console.log('Dialog accepted');
        } catch (error) {
          console.error('Error accepting dialog:', error);
        }
      });      
      
      console.log('Clicking delete button');
      await this.deleteButton.click();     
      console.log('Waiting for navigation to home page');
      await this.waitForPageToLoad();    
      await this.page.waitForURL('/#/');
      console.log('Article deleted successfully, redirected to home page');
      return true;
      
    } catch (error) {
      console.error('Failed to delete article:', error);
      return false;
    }
  }

  /**
   * Clicks the edit article button and navigates to the editor page.
   * @returns Promise<boolean> - true if successfully navigated to editor
   */
  async editArticle(): Promise<boolean> {
    try {
      console.log('Clicking edit article button...');
      
      // Click the edit button
      await this.editButton.click(); 
      await this.waitForPageToLoad();              
      console.log('Successfully navigated to editor page');
      return true;
      
    } catch (error) {
      console.error('Failed to navigate to editor:', error);
      return false;
    }
  }

}