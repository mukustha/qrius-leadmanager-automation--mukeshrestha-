import { expect, type Locator, type Page } from '@playwright/test';
import type { LeadData, LeadStatus } from '../test-data/leads';

export class LeadsPage {
  readonly heading: Locator;
  readonly roleBadge: Locator;
  readonly searchInput: Locator;
  readonly addLeadButton: Locator;
  readonly leadRows: Locator;
  readonly leadCount: Locator;
  readonly emptyState: Locator;
  private readonly createdLeadNames = new Set<string>();

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Leads', exact: true });
    this.roleBadge = page.getByTestId('nav-role');
    this.searchInput = page.getByTestId('search-input');
    this.addLeadButton = page.getByRole('button', { name: 'Add lead' });
    this.leadRows = page.getByTestId('lead-row');
    this.leadCount = page.getByTestId('lead-count');
    this.emptyState = page.getByTestId('empty-state');
  }

  leadRow(name: string): Locator {
    return this.leadRows.filter({ has: this.page.getByText(name, { exact: true }) });
  }

  async search(text: string): Promise<void> {
    await this.searchInput.fill(text);
  }

  async addLead(lead: LeadData): Promise<void> {
    this.createdLeadNames.add(lead.name);
    await this.addLeadButton.click();
    await this.page.getByTestId('name').fill(lead.name);
    await this.page.getByTestId('email').fill(lead.email);
    await this.page.getByTestId('company').fill(lead.company);
    await this.page.getByTestId('status').selectOption(lead.status);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async editLeadStatus(name: string, status: LeadStatus): Promise<void> {
    const row = this.leadRow(name);
    await row.getByRole('button', { name: 'Edit' }).click();
    await this.page.getByTestId('status').selectOption(status);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async deleteLead(name: string): Promise<void> {
    const row = this.leadRow(name);
    await row.getByRole('button', { name: 'Delete' }).click();
    this.createdLeadNames.delete(name);
  }

  async cleanupCreatedLeads(): Promise<void> {
    for (const name of this.createdLeadNames) {
      await this.search(name);
      const row = this.leadRow(name);
      if (await row.count()) {
        await row.getByRole('button', { name: 'Delete' }).click();
      }
    }
    this.createdLeadNames.clear();
    await this.search('');
  }

  async expectLeadStatus(name: string, status: LeadStatus): Promise<void> {
    await expect(this.leadRow(name).getByTestId('lead-status')).toHaveText(status);
  }
}
