import { expect, type Locator, type Page } from '@playwright/test';
import type { UserCredentials } from '../test-data/users';

export class LoginPage {
  readonly heading: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Lead Manager' });
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByTestId('login-error');
  }

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(user: UserCredentials): Promise<void> {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.signInButton.click();
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }
}
