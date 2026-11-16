import { test, expect } from '../helpers/fixtures';
import { users } from '../test-data/users';
import { createLeadData } from '../test-data/leads';

test.beforeEach(async ({ app }) => {
  await app.loginAs(users.admin);
});

test('a lead can be added with its selected status', async ({ app }) => {
  const lead = createLeadData();

  await app.leads.addLead(lead);

  await expect(app.leads.leadRow(lead.name)).toBeVisible();
  await app.leads.expectLeadStatus(lead.name, lead.status);
});

test('an admin can edit a lead status', async ({ app }) => {
  const lead = createLeadData();
  await app.leads.addLead(lead);

  await app.leads.editLeadStatus(lead.name, 'Contacted');

  await app.leads.expectLeadStatus(lead.name, 'Contacted');
});

test('an admin can delete a lead and its row disappears', async ({ app }) => {
  const lead = createLeadData();
  await app.leads.addLead(lead);
  await expect(app.leads.leadRow(lead.name)).toBeVisible();

  await app.leads.deleteLead(lead.name);

  await expect(app.leads.leadRow(lead.name)).toHaveCount(0);
});
