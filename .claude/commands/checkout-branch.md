---
allowed-tools: Bash(git checkout:*), Bash(git branch:*), Bash(git status:*)
description: Create and checkout a new branch with conventional naming
---

# Claude Command: Checkout Branch

This command helps you create and checkout a new git branch following conventional naming conventions.

## Usage

To create a new branch, type:
```
/checkout-branch <description of task>
```

For example:
```
/checkout-branch add user authentication
/checkout-branch fix memory leak in parser
/checkout-branch update api documentation
```

## What This Command Does

1. Takes the task description from the user
2. Analyzes the description to determine the appropriate branch type
3. Converts the description to kebab-case format
4. Creates a branch name following the pattern: `<type>/<description>`
5. Creates and checks out the new branch

## Branch Naming Convention

Branch names follow the pattern: `<type>/<description-in-kebab-case>`

### Branch Types

- **feat/**: New features or enhancements
  - Examples: `feat/user-authentication`, `feat/dark-mode-toggle`
- **fix/**: Bug fixes
  - Examples: `fix/memory-leak`, `fix/login-validation`
- **chore/**: Maintenance tasks, dependencies, tooling
  - Examples: `chore/update-dependencies`, `chore/configure-eslint`
- **docs/**: Documentation changes
  - Examples: `docs/api-endpoints`, `docs/setup-instructions`
- **refactor/**: Code restructuring without changing behavior
  - Examples: `refactor/auth-logic`, `refactor/component-structure`
- **test/**: Adding or updating tests
  - Examples: `test/user-service`, `test/integration-tests`
- **style/**: Code formatting and style changes
  - Examples: `style/component-formatting`, `style/css-cleanup`
- **perf/**: Performance improvements
  - Examples: `perf/optimize-queries`, `perf/reduce-bundle-size`
- **ci/**: CI/CD pipeline changes
  - Examples: `ci/github-actions`, `ci/deploy-workflow`
- **security/**: Security fixes and improvements
  - Examples: `security/fix-xss`, `security/update-auth`

### Naming Guidelines

- Use lowercase letters
- Use hyphens to separate words (kebab-case)
- Be concise but descriptive
- Avoid special characters except hyphens
- Keep branch names under 50 characters when possible

## Examples

User input → Generated branch name:
- "add user authentication" → `feat/add-user-authentication`
- "fix memory leak in parser" → `fix/memory-leak-in-parser`
- "update API documentation" → `docs/update-api-documentation`
- "refactor error handling" → `refactor/error-handling`
- "optimize database queries" → `perf/optimize-database-queries`
- "update dependencies" → `chore/update-dependencies`
- "add unit tests for auth" → `test/add-unit-tests-for-auth`

## Best Practices

- Create a new branch for each task or feature
- Base branches off the main/master branch unless working on a feature branch
- Keep branch names descriptive but concise
- Delete branches after they're merged
- Use the appropriate type prefix to indicate the nature of the work
