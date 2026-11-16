import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LeadsPage } from '../pages/LeadsPage';
import type { UserCredentials } from '../test-data/users';

interface AppPages {
  login: LoginPage;
  leads: LeadsPage;
  loginAs(user: UserCredentials): Promise<void>;
}

export const test = base.extend<{ app: AppPages }>({
  app: async ({ page }, use) => {
    const login = new LoginPage(page);
    const leads = new LeadsPage(page);
    const app: AppPages = {
      login,
      leads,
      async loginAs(user) {
        await login.open();
        await login.login(user);
        await expect(leads.heading).toBeVisible();
      },
    };

    await use(app);
    if (await page.getByTestId('search-input').count()) {
      await leads.cleanupCreatedLeads();
    }
  },
});

export { expect };
