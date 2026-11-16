# Findings

## Run status

The suite was run once, but all 13 tests stopped before their assertions because
navigation to `http://localhost:5173/login` returned
`net::ERR_CONNECTION_REFUSED`. This is an environment/setup blocker, not evidence
that a test is wrong or that an application behavior is broken. Start the database,
backend, and frontend using the assignment instructions, then run `npm test` again.
Review a behavioral failure trace with `npx playwright show-trace`.

## Finding to verify when the app is running

- **Search count reflects filtered results** — likely **the application has a bug**:
  the Leads page renders the full stored total for both numbers in the count label,
  while the test expects one matching result out of twelve. This is based on source
  inspection only; the count test could not reach the app, so verify it after startup.

## Test failures

No behavioral test failures have been confirmed yet because the application was
unavailable during the run.
