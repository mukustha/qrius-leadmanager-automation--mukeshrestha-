# Qrius Lead Manager Playwright Automation

Playwright + TypeScript end-to-end tests for the Qrius Lead Manager assignment.

## Prerequisites

- Node.js 20 or newer
- The PostgreSQL `qrius_leads` database loaded with the supplied seed script
- The backend running at `http://localhost:3000`
- The frontend running at `http://localhost:5173`

In the project folder:

```bash
npm install
npx playwright install chromium
npm test
```

`npm run codegen` opens Playwright Codegen at the login page. Run it while both
servers are running, record a user flow, and clean the generated locators into the
page objects and tests.

Tests run sequentially because they share the seeded database. Created test leads
are removed by the shared fixture after each test. Failed runs keep a trace under
`test-results/`; open one with `npx playwright show-trace <trace.zip>`.

## Research notes

- [Playwright locators](https://playwright.dev/docs/locators): user-facing role
  locators, text-based filtering, and configured test IDs.
- [Playwright assertions](https://playwright.dev/docs/test-assertions): retrying
  web-first assertions such as `toHaveText` and `toBeVisible`.
- [Playwright fixtures](https://playwright.dev/docs/test-fixtures): the `{ page }`
  fixture and test-scoped setup/cleanup.
- [Playwright configuration](https://playwright.dev/docs/test-configuration):
  shared `baseURL`, test ID attribute, and trace settings.

## GitHub submission checklist

Create a public repository named `qrius-leadmanager-automation-MukeshShrestha`,
then initialize Git in this directory and push it to that repository. Do not commit
`node_modules`. The assignment requires at least five commits on different days;
make those as you work rather than fabricating commit dates.
