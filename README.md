# Cypress QA Automation Portfolio

This project showcases my end-to-end UI and API automation skills using [Cypress](https://www.cypress.io/), complete with CI integration, cross-browser testing, and bug tracking via JIRA.

---

## Project Overview

| Area | Description |
|------|-------------|
| UI Testing | Cypress UI tests using [SauceDemo](https://www.saucedemo.com/). Shows automated end to end testing of an ecommerce site. |
| Mobile Testing | Dedicated spec that tests the SauceDemo site UI in mobile view. Shows the importance of UI testing on mobile. |
| API Testing | Cypress API tests using [Restful Booker](https://restful-booker.herokuapp.com/apidoc). Shows automated testing of CRUD APIs. |
| CI/CD | Cypress tests running in GitHub Actions using both Chrome and Firefox. Shows enforcement that automated tests must pass before merging. |
| Bug Tracking | Known issues documented in JIRA, with test coverage for expected vs. actual behavior. Shows communication of bug issues to stakeholders. |
| Reporting | Reports using Mochawesome (locally) and Cypress Cloud. Shows pass/fail tests in easier to read reports. |

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
5. Run all tests on the command line: `npx cypress run`
6. Run tests by type on the command line:
- API tests: `npx cypress run --spec "cypress/e2e/api/*.cy.js"`
- UI tests: `npx cypress run --spec "cypress/e2e/ui/*.cy.js"`
7. Or use the Cypress test runner UI to run tests individually.

## Bug Reports
Automated tests for known bugs are located in:
- `ui-error-spec.cy.js`
- `api-error-spec.cy.js`
- `auth.cy.js` (for authentication-related errors)<br>

To address the challenge of accessing a JIRA board, I have taken screenshots of the bug tickets I created instead. Each file is named using the JIRA ticket number and a short description. The folder of screenshots on Github is linked [here](https://github.com/AlexMolCode/cypress-automation-tests/tree/main/bug-reports)

## CI/CD via GitHub Actions
This project is integrated with GitHub Actions to automatically run Cypress tests with *every* pull request. The pipeline runs:
- All UI tests using both Chrome and Firefox
- All API tests
These checks ensure that all test cases are validated before any code is merged, simulating a real-world CI/CD pipeline.

## Local Test Reports with Mochawesome
After each run, Cypress generates reports in the cypress/reports/ folder. This includes:
- An HTML summary of test results and statuses
- Screenshots for failed tests (automatically captured)

You can also view test reports generated during GitHub Actions by visiting the [Actions](https://github.com/AlexMolCode/cypress-automation-tests/actions) tab and downloading the report artifacts.  
Note: GitHub does not render HTML reports in-browser. You must download them to view locally.

## Cypress Cloud Integration
All test runs are automatically recorded to Cypress Cloud via GitHub Actions on every pull request.

Cypress Cloud includes:
- Screenshots, videos, and command logs for each test
- Test Replay button for step-by-step debugging

Previous Cypress Cloud runs for this portfolio can be accessed on the [latest runs page](https://cloud.cypress.io/projects/in78pu/runs).  
Note: API tests using cy.request() are executed in Node (not in the browser). Because of this, console logs and network activity will not appear in Cloud replay like they do in UI tests.  
Here is documentation on Cypress Cloud's Test Replay to step through previous test runs: [Test Replay Documentation](https://docs.cypress.io/cloud/features/test-replay)
