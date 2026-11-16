import { test, expect } from '../helpers/fixtures';
import { users } from '../test-data/users';
import { seededLeads } from '../test-data/leads';

test.beforeEach(async ({ app }) => {
  await app.loginAs(users.admin);
});

test('searching by a lead name narrows the list', async ({ app }) => {
  await app.leads.search(seededLeads.byName);

  await expect(app.leads.leadRows).toHaveCount(1);
  await expect(app.leads.leadRow(seededLeads.byName)).toBeVisible();
});

test('searching by a company name narrows the list', async ({ app }) => {
  await app.leads.search(seededLeads.byCompany);

  await expect(app.leads.leadRows).toHaveCount(1);
  await expect(app.leads.leadRow(seededLeads.byName)).toBeVisible();
});

test('a search with no matches shows the empty state', async ({ app }) => {
  await app.leads.search('No Matching Lead 6bb467d5');

  await expect(app.leads.emptyState).toHaveText('No leads found.');
  await expect(app.leads.leadRows).toHaveCount(0);
});

test('the count reflects the number of matching leads', async ({ app }) => {
  await app.leads.search(seededLeads.byName);

  await expect(app.leads.leadRows).toHaveCount(1);
  await expect(app.leads.leadCount).toHaveText('Showing 1 of 12 leads');
});
