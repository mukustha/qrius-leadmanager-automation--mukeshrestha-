import { test, expect } from '../helpers/fixtures';
import { users } from '../test-data/users';

test('login page has the expected title', async ({ app, page }) => {
  await app.login.open();

  await expect(page).toHaveTitle('Qrius Lead Manager');
  await expect(app.login.heading).toBeVisible();
});

test('an admin can sign in and reach the Leads page', async ({ app, page }) => {
  await app.login.open();
  await app.login.login(users.admin);

  await expect(page).toHaveURL(/\/leads$/);
  await expect(app.leads.heading).toBeVisible();
});

test('an agent can sign in and sees the AGENT role', async ({ app }) => {
  await app.loginAs(users.agent);

  await expect(app.leads.roleBadge).toHaveText(users.agent.role);
});

test('a wrong password shows an error and stays on the login page', async ({ app, page }) => {
  await app.login.open();
  await app.login.login(users.invalidPassword);

  await app.login.expectLoginError('Invalid username or password');
  await expect(page).toHaveURL(/\/login$/);
});
