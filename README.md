# Cypress QA Automation Portfolio

This project showcases my end-to-end UI and API automation skills using Cypress, with CI/CD integration, cross-browser testing, and bug tracking in Jira.

---

## Project Overview  

| Area | Description |
|------|-------------|
| **UI Testing** | Automated end-to-end tests of the [SauceDemo](https://www.saucedemo.com/) e-commerce test site using Cypress. |
| **Mobile Testing** | Mobile viewport spec to validate SauceDemo’s UI responsiveness. |
| **API Testing** | CRUD API tests for the [Restful Booker](https://restful-booker.herokuapp.com/apidoc) API test site using Cypress. |
| **Bug Tracking** | Known issues documented in Jira, linked to related test coverage. |
| **CI/CD** | GitHub Actions pipeline runs Cypress tests in Chrome and Firefox on each branch merge, blocking merges if tests fail. |
| **Reporting** | Local Mochawesome reports for visual pass/fail summaries. |

---

## Folder Structure

```bash
cypress-automation-tests/
├── .github/
│   ├──  workflows/      # GitHub Actions workflow to run Cypress tests
├── cypress/
│   ├── e2e/
│   │   ├── api/         # API tests (Restful Booker)
│   │   ├── ui/          # UI tests (SauceDemo)
│   ├── data/            # Static records for API test inputs
│   ├── reports/         # Mochawesome test reports (local only)
│   ├── selectors/       # Page Object Model selectors for UI tests
│   ├── support/         # Reusable UI commands (login, menu navigation)
├── bug-reports/         # Screenshots of Jira bug tickets
```
## Running Tests Locally
1. Make sure you have Git installed: [Download Git](https://git-scm.com/downloads)
2. Clone this repo to your machine: `git clone https://github.com/AlexMolCode/cypress-automation-tests.git`
3. Navigate to the downloaded folder (cypress-automation-tests) and install dependencies (it includes Cypress): `npm install`
4. To successfully run API tests that require an authentication token, create a `cypress.env.json` file in the root directory with the JSON record below.
   Replace the credential placeholder values below with the ones from the Restful Booker [API docs](https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth-CreateToken).
```json
{
  "BOOKING_USERNAME": "api-username",
  "BOOKING_PASSWORD": "api-password"
}
```
5. To run all tests on the command line: `npx cypress run`
6. To run tests by each type on the command line:
- API tests: `npx cypress run --spec "cypress/e2e/api/*.cy.js"`
- UI tests: `npx cypress run --spec "cypress/e2e/ui/*.cy.js"`
7. To use the Cypress test runner UI to run tests: `npx cypress open`

## Mobile Testing
This project includes a Cypress spec that validates SauceDemo’s UI responsiveness in a mobile viewport (Samsung Galaxy S22, 360×780). This ensures the application layout and functionality remain consistent on smaller screens. The test file is at `cypress/e2e/ui/mobile-spec.cy.js`.

![Mobile viewport test of SauceDemo site](./images/mobile-saucedemo.png)

## Bug Tracking
Automated tests for known bugs are located in:
- `cypress/e2e/ui/ui-error-spec.cy.js`
- `cypress/e2e/api/api-error-spec.cy.js`
- `cypress/e2e/api/auth-spec.cy.js`

Since the Jira board isn’t publicly accessible, I’ve included screenshots of the bug tickets I created. Each file is named with its ticket number and a short description, and those ticket IDs match the ones referenced in the comments within the files above. View the folder [here](https://github.com/AlexMolCode/cypress-automation-tests/tree/main/bug-reports).

## CI/CD via GitHub Actions
This project uses GitHub Actions to automatically run Cypress tests on every pull request. The pipeline includes:
- All UI tests using both Chrome and Firefox
- All API tests

These checks ensures the regression suite passes before code is merged, simulating a true CI/CD workflow. Below is an example of a successful test run.

![CI Pipeline](./images/ci-pipeline.png)

## Local Test Reports with Mochawesome
When Cypress tests are run locally in headless mode (`npx cypress run`), Mochawesome generates a visual HTML report in the `cypress/reports/` folder. The report lists each scenario as an individual test case with a pass/fail status and attaches screenshots for failed tests.

![Mochawesome Report](./images/mochawesome-report.png)

*Note: This project was previously integrated with Cypress Cloud as well for storing and reviewing test runs. Due to plan limits, this feature is currently disabled in favor of local Mochawesome reports and GitHub Actions CI results.*
