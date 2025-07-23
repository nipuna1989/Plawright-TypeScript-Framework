import { test, expect } from './utils/fixtures';
import { loginTestData } from '../src/data/loginTestData';
import { getTestArticle, getUpdatedArticle } from '../src/data/articleTestData';

test.describe('Article Lifecycle Test', () => {
  test('should complete full article lifecycle: create, validate, and delete', async ({ 
    page, 
    homePage, 
    loginPage, 
    newArticlePage, 
    articleDetailPage 
  }) => {
    // Generate unique test data
    const randomId = Math.floor(Math.random() * (999999 - 10000 + 1)) + 10000;
    const testArticle = getTestArticle(randomId.toString());

    // Get valid credentials from test data
    const validCredentials = loginTestData.find((data: any) => data.scenario === 'valid');
    if (!validCredentials) {
      throw new Error('Valid login credentials not found in loginTestData');
    }

    // step 1: Navigate to the home page
    console.log('Step 1: Navigating to home page');
    const navigateToHomePage = await homePage.goToHomePage();
    expect(navigateToHomePage).toBe(true);
    await page.waitForTimeout(2000);

    // Step 2: Navigate to the login page
    console.log('Step 2: Navigating to login page');
    const navigatedToLogin = await homePage.goToLoginPageFromHomePage();
    expect(navigatedToLogin).toBe(true);
    await page.waitForTimeout(2000);

    // Step 3: Perform login with valid credentials and verify logged successfully
    console.log('Step 3: Logging in with valid credentials');
    const loginResult = await loginPage.loginWithValidCredentials(
      validCredentials.email, 
      validCredentials.password
    );
    expect(loginResult).toBe(true);
    await page.waitForTimeout(2000);

    // step 4: go to new article creation page
    console.log('Step 4: Navigating to new article creation page');
    const newArticleNavigated = await homePage.createNewArticle();
    expect(newArticleNavigated).toBe(true);
    await page.waitForTimeout(2000);

    // step 5: Create new article
    console.log('Step 5: Creating new article');
    console.log(`Article data: Title="${testArticle.title}", Tags=[${testArticle.tags.join(', ')}]`);
    const articleCreated = await newArticlePage.createArticle(
        testArticle.title,
        testArticle.description,
        testArticle.body,
        testArticle.tags
      );
      await page.waitForTimeout(2000);
      
    // step 6: Validate created article title
    console.log('Step 6: Validating article title');
    await articleDetailPage.validateArticleTitle(testArticle.title);
    await page.waitForTimeout(1500);
    
    // step 7: Validate created article body content
    console.log('Step 7: Validating article body content');
    await articleDetailPage.validateArticleBody(testArticle.body);
    await page.waitForTimeout(1500);

    // step 8: Validate created article tags
    console.log('Step 8: Validating article tags');
    await articleDetailPage.validateArticleTags(testArticle.tags);
    await page.waitForTimeout(1500);

    // step 9: Go to edit article page
    console.log('Step 9: Navigating to edit article page');
    const editResult = await articleDetailPage.editArticle();
    expect(editResult).toBe(true);
    await page.waitForTimeout(2000);

    // step 10: Verify previous data is populated
    console.log('Step 10: Verifying article fields are populated with existing data');
    const dataVerified = await newArticlePage.verifyArticleFieldsData(
        testArticle.title,
        testArticle.description,
        testArticle.body,
        testArticle.tags
      );
      expect(dataVerified).toBe(true);
      await page.waitForTimeout(2000);

    // step 11: Update article with new data
    console.log('Step 11: Updating article with new data');
    const updatedArticle = getUpdatedArticle(testArticle);
    console.log(`Updated article data: Title="${updatedArticle.title}", Tags=[${updatedArticle.tags.join(', ')}]`);

    const articleUpdated = await newArticlePage.createArticle(
        updatedArticle.title,
        updatedArticle.description,
        updatedArticle.body,
        updatedArticle.tags 
      );
      expect(articleUpdated).toBe(true);   
      await page.waitForTimeout(2000);

    // step 12: Validate updated article title
    console.log('Step 12: Validating updated article title');
    await articleDetailPage.validateArticleTitle(updatedArticle.title); 
    await page.waitForTimeout(1500);

    // step 13: Validate updated article body content
    console.log('Step 13: Validating updated article body content');
    await articleDetailPage.validateArticleBody(updatedArticle.body);
    await page.waitForTimeout(1500);

    // step 14: Validate updated article tags
    console.log('Step 14: Validating updated article tags...');
    await articleDetailPage.validateArticleTags(updatedArticle.tags);
    await page.waitForTimeout(1500);

    // step 15: Delete the article
    console.log('Step 15: Deleting the article...');
    const deleteResult = await articleDetailPage.deleteArticle();
    expect(deleteResult).toBe(true);
    await page.waitForTimeout(2000);
    console.log('Complete article lifecycle test completed successfully!');
    
  });
});
