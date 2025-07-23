import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { HomePage } from '@pages/HomePage';
import { NewArticlePage } from '@pages/NewArticlePage';
import { ArticleDetailPage } from '@pages/ArticleDetailPage';

// Define custom fixtures
type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  newArticlePage: NewArticlePage;
  articleDetailPage: ArticleDetailPage;
};

// Extend the base test with custom fixtures
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  newArticlePage: async ({ page }, use) => {
    const newArticlePage = new NewArticlePage(page);
    await use(newArticlePage);
  },

  articleDetailPage: async ({ page }, use) => {
    const articleDetailPage = new ArticleDetailPage(page);
    await use(articleDetailPage);
  },
});

export { expect } from '@playwright/test';
