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
4. To run API tests, create a `cypress.env.json` file in the root directory. This is required to provide authentication values for generating a token.
   You can retrieve the credentials from the  [Restful Booker site](https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-CreateBooking)
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

Screenshots of the corresponding JIRA-style bug tickets are stored in the `bug-reports/` folder in the project root. Each file is named using the JIRA ticket number and a short description. <br>

[View the bug-reports folder on GitHub](https://github.com/AlexMolCode/cypress-automation-tests/tree/main/bug-reports) - Each filename can be clicked on to view eahc ticket screenshot.

## Test Reports with Mochawesome

After each run, Cypress generates reports in the cypress/reports/ folder:
- HTML summary with test results, status, and screenshots
- Failed test screenshots (automatically captured)
- Useful for visualizing coverage during local dev or CI runs

If you are testing this repo locally, you can follow these steps:
- Run this to generate a new report after running all the spec files: `npx cypress run`
- Open the HTML report here: `cypress/reports/index.html`

If you want to see the reports on Github, you can go to the link [here](https://github.com/AlexMolCode/cypress-automation-tests/actions) and download the previously run reports.<br>
Note: GitHub does not render HTML reports in-browser. You’ll need to download and open them locally.

## What This Project Demonstrates
- Writing Cypress tests for both UI and API flows
- Testing known bugs and unexpected behaviors
- Handling incorrect API status codes and validation cases
- CI integration via GitHub Actions with multi-browser runs
- Creating automated HTML reports with Mochawesome
- Cross-referencing failed tests with bug tickets (JIRA-style)
