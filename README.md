# RemWaste UI Test Framework

A Playwright-based test automation framework for the RemWaste assignment, featuring end-to-end testing and CI/CD integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Running Tests](#running-tests)
- [CI/CD Integration](#cicd-integration)
- [Test Architecture](#test-architecture)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Limitations](#limitations)

## Overview

This framework provides automated testing capabilities for the RemWaste assignment using Playwright. It includes:

- **End-to-End Testing**: Login with valid/invalid scenarios. Create/edit/delete article.
- **CI/CD Integration**: GitHub Actions workflow
- **Page Object Model**: Used POM for better clearness


## 📁 Project Structure

```
remwaste-ui-framework/
├── .github/
│   └── workflows/
│       └── test.yml                 # GitHub Actions CI/CD pipeline
├── src/
│   ├── data/
│   │   ├── articleTestData.ts       # Test data for articles
│   │   ├── constants.ts             # Application constants
│   │   └── loginTestData.ts         # Test data for login
│   ├── pages/
│   │   ├── ArticleDetailPage.ts     # Article detail page object
│   │   ├── BasePage.ts              # Base page with common functionality
│   │   ├── HomePage.ts              # Home page object
│   │   ├── LoginPage.ts             # Login page object
│   │   └── NewArticlePage.ts        # New article creation page object
│   └── utils/
│       └── utilities.ts             # Common utility functions
├── tests/
│   ├── article.spec.ts              # Article lifecycle tests
│   ├── login.spec.ts                # Login functionality tests
│   └── utils/                       # Test fixtures
├── test-results/                    # Test execution results
├── playwright-report/               # HTML test reports
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Project dependencies and scripts
└── README.md                        # This file
```

## 🔧 Prerequisites

Before setting up the project, ensure you have:

- **Node.js**: Version 18 or higher
- **npm**: Latest version (comes with Node.js)
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, or Edge

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nipuna1989/remwaste-ui-framework
```

### 2. Navigate to Project Directory

```bash
cd remwaste-ui-framework
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Install Playwright Browsers

```bash
npx playwright install
```

### 5. Install System Dependencies (Linux/macOS only)

> **Note**: Windows users can skip this step - system dependencies are automatically handled.

```bash
npx playwright install-deps
```

### 6. Verify Installation

Option 1 - Run a simple test to verify everything works:
```bash
npm run test:headed
```

## Running Tests

### Local Development

#### Run All Tests
```bash
npm test                    # Run all tests (headless)
npm run test:headed         # Run all tests with browser UI
```

#### Run Specific Test Files
```bash
npm run test:article        # Run article tests only
npm run test:login          # Run login tests only
```

#### Interactive UI Mode
```bash
npm run test:ui             # Open Playwright UI for interactive testing
```

#### View Test Reports
```bash
npm run test:report         # Open HTML test report
```

### Test Data

The framework uses the following test scenarios:

#### Login Tests
- **Valid Login**: `nipuna@gmail.com` with correct password
- **Invalid Email**: `invalid@email.com` (non-existent user)
- **Wrong Password**: Valid email with incorrect password

#### Article Tests
- **Full Lifecycle**: Create → Validate → Edit → Update → Validate updated values → Delete
- **Content Validation**: Title, body, tags verification
- **Navigation Testing**: Article creation and editing flows

## 🔄 CI/CD Integration

### GitHub Actions Workflow

The project includes a GitHub Actions workflow (`.github/workflows/test.yml`) that:

#### **Automatic Triggers**
- **Push Events**: Runs on pushes to `main` and `develop` branches
- **Pull Requests**: Runs on PRs targeting `main` and `develop` branches

#### **Manual Execution**
You can manually trigger tests from GitHub Actions with options:

1. Go to **Actions** tab in your GitHub repository
2. Select **"Playwright Tests"** workflow
3. Click **"Run workflow"**
4. Choose options:
   - **Test File**: `article`, `login`, or leave empty for all tests
   - Click **"Run workflow"**

#### **Workflow Features**
- **Node.js 18** setup with npm caching
- **Dependency Installation** with fallback strategies
- **Browser Installation** with system dependencies
- **Test Execution** with parameterized options
- **Artifact Upload** (reports and test results)
- **Cross-platform Support** (Ubuntu runners)

#### **Artifacts Generated**
- **Test Reports**: HTML reports with screenshots and videos
- **Test Results**: JSON and XML formats for integration
- **Failure Evidence**: Screenshots, videos, and execution traces

### Environment Variables

The CI environment automatically sets:
- `CI=true`: disables any platform-specific features in CI

## Test Architecture

### Page Object Model

Each page extends `BasePage` and provides:
- **Locators**: Element selectors using Playwright locators
- **Actions**: User interaction methods (click, type, navigate)
- **Assertions**: Page-specific validation methods
- **Utilities**: Helper methods for complex operations

### Base Page Features
- **Navigation utilities**
- **Common element interactions**
- **Wait strategies**
- **Debugging helpers**

### Test Data Management
- **Centralized data files** in `src/data/`
- **Environment-specific configurations**
- **Dynamic data generation** for unique test scenarios

### Fixtures
- **Custom fixtures** for page object injection
- **Test setup and teardown** helpers

## Limitations

### GitHub Actions Workflow Access
While this repository is public and anyone can view and fork it, there are some inherent limitations with GitHub Actions:

- **Manual Test Triggers**: Only repository collaborators (users with write access) can manually trigger the test workflow from the Actions tab.
  - This is a GitHub security feature to protect repositories from potential abuse.
  - External contributors can still:
    - View all test runs and their results
    - Have tests automatically run on their Pull Requests
    - Fork the repository and run tests in their own fork

### Workarounds for External Contributors
If you need to run tests without creating a Pull Request:
1. Fork the repository
2. Enable GitHub Actions in your fork
3. Run the tests in your forked repository

For active contributors, repository maintainers can grant collaborator access on a case-by-case basis
