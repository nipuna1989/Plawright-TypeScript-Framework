import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for the Home page.
 */
export class HomePage extends BasePage {
  readonly root: Locator;
  readonly loginLink: Locator;
  readonly newArticleLink: Locator;
  readonly userDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.locator('div.home-page');
    this.loginLink = page.locator('li.nav-item a[href="#/login"]');
    this.newArticleLink = page.locator('li.nav-item a[href="#/editor"]');
    this.userDropdown = page.locator('li.nav-item.dropdown .nav-link.dropdown-toggle');
  }

    /**
     * Navigates to the home page.
     * @returns Promise<boolean> - true if successfully navigated to home page
     */
    async goToHomePage(): Promise<boolean> {
        try {
            await this.navigateTo('/#/');
            await this.root.waitFor({ state: 'visible'});
            console.log('Home page is visible');
            return true;
        } catch (error) {
            console.log('Failed to navigate to home page:', error);
            return false;
        }
    }

    /**
     * Clicks on the Login link in the navigation to go to login page.
     * @returns Promise<boolean> - true if successfully navigated to login page
     */
    async goToLoginPageFromHomePage(): Promise<boolean> {
      try {
        console.log('Clicking on Login link in navigation');        
        await this.loginLink.click();    
        await this.page.waitForURL('/#/login');
        console.log('Successfully navigated to login page');
        return true;
      } catch (error) {
        console.log('Failed to navigate to login page:', error);
        return false;
      }
    }

    /**
     * Clicks on the New Article link in the navigation to go to article editor.
     * @returns Promise<boolean> - true if successfully navigated to article editor
     */ 
    async createNewArticle(): Promise<boolean> {
        try {
            console.log('Clicking on New Article link in navigation');
            await this.newArticleLink.click();
            await this.waitForPageToLoad();
            await this.page.waitForURL('/#/editor');
            console.log('Successfully navigated to article editor');
            return true;
        } catch (error) {
            console.log('Failed to navigate to article editor:', error);
            return false;
        }
    }

    /**
     * Checks if user is authenticated by verifying multiple indicators.
     * @returns Promise<boolean> - true if user is authenticated, false otherwise
     */
    async isUserAuthenticated(): Promise<boolean> {
        try {
            // Check 1: Login link should not be visible            
            const isLoginLinkHidden = await this.loginLink.isHidden();
            
            // Check 2: User dropdown menu should be visible (authenticated user indicator)          
            const isUserDropdownVisible = await this.userDropdown.isVisible();
                     
            // Check 3: Home page content is visible
            const isAtHome = await this.root.isVisible();
            
            console.log('Authentication checks:', {
                loginLinkHidden: isLoginLinkHidden,
                userDropdownVisible: isUserDropdownVisible,
                homePageVisible: isAtHome
            });

            return isLoginLinkHidden && isUserDropdownVisible && isAtHome;
        } catch (error) {
            console.log('Error checking authentication status:', error);
            return false;
        }
    }
   
}
