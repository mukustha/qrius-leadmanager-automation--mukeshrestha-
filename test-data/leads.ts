export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';

export interface LeadData {
  name: string;
  email: string;
  company: string;
  status: LeadStatus;
}

export const seededLeads = {
  byName: 'Sita Sharma',
  byCompany: 'HimalKart',
} as const;

export function createLeadData(): LeadData {
  const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
  return {
    name: `Playwright Lead ${uniqueId}`,
    email: `playwright-${uniqueId}@example.test`,
    company: `Playwright Company ${uniqueId}`,
    status: 'Qualified',
  };
}
