# ServeRest Cypress Suite

Test automation suite built with **Cypress** and **JavaScript**, covering both End-to-End (frontend) and API scenarios for the [ServeRest](https://serverest.dev/) application — a REST API and frontend built for QA practice, simulating a simple e-commerce platform.

- Frontend under test: https://front.serverest.dev/
- API under test: https://serverest.dev/

## Test coverage

### E2E (frontend)

| Scenario | Type | File |
|---|---|---|
| Register a new user successfully | Positive | `cypress/e2e/frontend/user-registration.cy.js` |
| Login with invalid credentials | Negative | `cypress/e2e/frontend/login.cy.js` |
| Search/filter products by name | Positive | `cypress/e2e/frontend/product-search.cy.js` |

### API

| Scenario | Type | Endpoint | File |
|---|---|---|---|
| Login with valid credentials | Positive | `POST /login` | `cypress/e2e/api/login.cy.js` |
| Register a user with a duplicate email | Negative | `POST /usuarios` | `cypress/e2e/api/users.cy.js` |
| List and filter products | Positive | `GET /produtos` | `cypress/e2e/api/products.cy.js` |

## Project structure

```
cypress/
├── e2e/
│   ├── frontend/        # E2E test specs
│   └── api/              # API test specs
├── fixtures/
│   └── adminUser.json    # Stable admin user, reused across suites
├── support/
│   ├── pages/             # Page Object Model classes
│   ├── commands.js        # Custom Cypress commands
│   └── e2e.js
cypress.config.js
```

## Architecture and design decisions

- **Page Object Model (POM)** is used for all frontend specs, isolating selectors and UI interactions (`support/pages/`) from test logic (`e2e/frontend/`), which keeps tests readable and easier to maintain.
- **Custom Cypress commands** (`cy.apiLogin`, `cy.apiCreateUser`, `cy.apiCreateProduct`) in `support/commands.js` avoid duplicating API request logic across specs.
- **Dynamic test data** is generated with [`@faker-js/faker`](https://fakerjs.dev/) in every scenario that creates data (users, products), avoiding collisions in the shared ServeRest database across test runs and machines.
- **Fixtures** are reserved for data that needs to stay stable across runs — in this case, a single admin user (`fixtures/adminUser.json`) reused for actions that require elevated permissions (e.g. creating a product via API).
- **`defaultBrowser: 'chrome'`** is set in `cypress.config.js`, since Electron is being deprecated as Cypress's default test browser.

### Cart scenario replaced by product search

The original plan included an "add to cart and checkout" E2E scenario. During implementation, this was found to be unfeasible: the `/carrinho` route currently displays a static "under construction" placeholder in the live application, and the "Adicionar a lista" button on the product list redirects to a wishlist page (`/minhaListaDeProdutos`), not a shopping cart.

This scenario was replaced with **product search/filter**, which exercises a distinct, fully functional part of the application instead. That test also required two separate users: an **admin** user (to create a product via the authenticated `POST /produtos` endpoint) and a **client** user (since the product search bar only exists on `/home`, while admin users are redirected to `/admin/home` after login).

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [Google Chrome](https://www.google.com/chrome/) installed (used as the default test browser)

## Installation

```bash
git clone <repository-url>
cd serverest-cypress-suite
npm install
```

## Running the tests

```bash
# Run everything (E2E + API)
npm run cy:run

# Run only E2E (frontend) tests
npm run cy:run:e2e

# Run only API tests
npm run cy:run:api

# Open Cypress in interactive mode
npm run cy:open
```

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
