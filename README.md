# Cypress QA Automation Portfolio

This project showcases my end-to-end UI and API automation skills using [Cypress](https://www.cypress.io/), complete with CI integration, cross-browser testing, and bug tracking via JIRA.

---

## Project Overview

| Area | Description |
|------|-------------|
| UI Testing | Cypress UI tests using [SauceDemo](https://www.saucedemo.com/) |
| Mobile Testing | Dedicated spec that tests the SauceDemo site UI in mobile view |
| API Testing | Cypress API tests using [Restful Booker](https://restful-booker.herokuapp.com/apidoc) |
| CI/CD | Cypress tests running in GitHub Actions using both Chrome and Firefox |
| Bug Tracking | Known issues documented in JIRA, with test coverage for expected vs. actual behavior |
| Reporting | Tests include Mochawesome reports and screenshots of failed runs |

---

## Folder Structure

```bash
project-root/
├── cypress/
│   ├── e2e/
│   │   ├── api/         # Cypress API tests (Restful Booker)
│   │   ├── ui/          # Cypress UI tests (SauceDemo)
│   ├── support/         # Custom commands and shared test setup
│   ├── reports/         # Mochawesome test reports (gitignored)
│   ├── data/            # Static data and request bodies for API tests
│   ├── selectors/       # Page object-style selectors for UI tests
├── cypress.config.js    # Cypress configuration file
├── cypress.env.json     # Local environment variables for API auth (gitignored)
├── package.json         # Project dependencies
├── .gitignore           # Files and folders ignored by Git
├── README.md            # Project overview and setup instructions
├── bug-reports          # Screenshots of JIRA-style bug tickets
```
## How to Run the Tests Locally
1. Make sure you have Git installed: [Download Git](https://git-scm.com/downloads)
2. Clone this repo to your machine: `git clone https://github.com/AlexMolCode/cypress-automation-tests.git`
3. Navigate to the project directory and install dependencies (includes Cypress): `npm install`
4. To run API tests, create a `cypress.env.json` file in the root directory with the JSON record below. This is required to provide authentication values for generating a token.
   You can retrieve the actual credentials from the [Restful Booker site](https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-CreateBooking)
```json
{
  "BOOKING_USERNAME": "X",
  "BOOKING_PASSWORD": "Y"
}
```
5. Run all tests: `npx cypress run`
6. Run tests by type:
- API tests: `npx cypress run --spec "cypress/e2e/api/*.cy.js"`
- UI tests: `npx cypress run --spec "cypress/e2e/ui/*.cy.js"`

## Bug Reports
Automated tests for known bugs are located in:
- `ui-error-spec.cy.js`
- `api-error-spec.cy.js`
- `auth.cy.js` (for authentication-related errors)<br>

Screenshots of the corresponding JIRA-style bug tickets are stored in the `bug-reports/` folder in the project root. Each file is named using the JIRA ticket number and a short description. The folder of screenshots on Github is linked [here](https://github.com/AlexMolCode/cypress-automation-tests/tree/main/bug-reports)

## CI/CD via GitHub Actions
This project is integrated with GitHub Actions to automatically run Cypress tests on *every* pull request. The pipeline runs:
- All UI tests using both Chrome and Firefox
- All API tests
- Headless Cypress execution in parallel jobs
- Automatic test reporting via Mochawesome<br>

These checks ensure that all test cases are validated before any code is merged, simulating a real-world CI/CD pipeline.

## Local Test Reports with Mochawesome

After each run, Cypress generates reports in the cypress/reports/ folder. This includes:
- An HTML summary of test results and statuses
- Screenshots for failed tests (automatically captured)
- A visual way to review test coverage when running locally

To view the report:
- Run all tests: `npx cypress run`
- Open the HTML report: `cypress/reports/index.html`

CI Reports: You can also view test reports generated during GitHub Actions by visiting the [Actions](https://github.com/AlexMolCode/cypress-automation-tests/actions) tab and downloading the report artifacts.

Note: GitHub does not render HTML reports in-browser. You must download them to view locally.

## Cypress Cloud Integration
All test runs (UI and API) are automatically recorded to Cypress Cloud via GitHub Actions on every pull request.

Cypress Cloud includes:
- Full test run history (per PR or commit)
- Screenshots, videos, and command logs for each test
- Test Replay for step-by-step debugging of failures

Runs are grouped by test type:
- UI Tests – Chrome
- UI Tests – Firefox
- API Tests

Note: API tests using cy.request() are executed in Node (not in the browser). Because of this, console logs and network activity will not appear in Cloud replay like they do in UI tests.

Here is documentation on Cypress Cloud's Test Replay to step through previous test runs: [Test Replay Documentation](https://docs.cypress.io/cloud/features/test-replay)

## What This Project Demonstrates

- Writing Cypress tests for both **UI** and **API** flows
- Testing and documenting known bugs and unexpected behaviors
- Handling incorrect API status codes and validation edge cases
- Integrating tests with **CI/CD** via GitHub Actions (Chrome, Firefox)
- Recording test runs to **Cypress Cloud** for visibility, replay, and debugging
- Generating HTML reports with **Mochawesome** for local runs
- Cross-referencing test failures with **JIRA-style bug tickets**

