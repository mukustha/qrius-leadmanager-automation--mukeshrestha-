import { test, expect } from '../helpers/fixtures';
import { users } from '../test-data/users';

test('the seeded leads list contains twelve leads and shows the admin role', async ({ app }) => {
  await app.loginAs(users.admin);

  await expect(app.leads.leadRows).toHaveCount(12);
  await expect(app.leads.roleBadge).toHaveText(users.admin.role);
});

test('an agent does not see a delete button', async ({ app }) => {
  await app.loginAs(users.agent);

  await expect(app.leads.leadRows.first()).toBeVisible();
  await expect(app.leads.leadRows.first().getByRole('button', { name: 'Delete' })).toHaveCount(0);
});
