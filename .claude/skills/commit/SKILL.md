---
name: commit
description: Create well-formatted git commits with conventional commit messages and emoji. Use when the user asks to create a commit, commit changes, or save work to git. Runs pre-commit checks (lint, build, test) before committing.
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(git commit:*), Bash(bun run test), Bash(bun run build), Bash(bun run lint), Bash(bun test)
model: haiku
---

# Git Commit Skill

This skill helps you create well-formatted commits with conventional commit messages and emoji. It ensures code quality by running pre-commit checks before committing.

## Instructions

When the user asks to create a commit, follow these steps:

### 1. Run Pre-Commit Checks (unless --no-verify flag is provided)

Run these checks in parallel:
```bash
bun run lint
bun run build
bun test 2>&1 || echo "No test script found"
```

**CRITICAL**: If tests fail, do NOT proceed with the commit. Instead:
- Provide the user a summary of the failing test/s
- Ask if they would like you to fix the failing tests
- Only continue after tests pass or user explicitly requests to skip

### 2. Check Git Status and Stage Files

```bash
git status
```

If 0 files are staged, automatically add all modified and new files:
```bash
git add .
```

### 3. Analyze Changes

View all staged changes:
```bash
git diff --cached
```

Analyze the diff to determine:
- What type of change this is (feat, fix, docs, etc.)
- Whether multiple distinct logical changes are present
- If changes should be split into multiple commits

### 4. Determine Commit Strategy

**Single Commit**: If all changes are related and serve a single purpose, create one commit.

**Multiple Commits**: If the diff contains multiple distinct changes, suggest splitting them based on:
- Different concerns (unrelated parts of codebase)
- Different types of changes (mixing features, fixes, refactoring)
- Different file patterns (source code vs documentation)
- Logical grouping (changes easier to understand separately)
- Size (very large changes clearer if broken down)

### 5. Create Commit(s)

For each commit, use this format:
```bash
git commit -m "$(cat <<'EOF'
<emoji> <type>: <description>
EOF
)"
```

## Commit Message Format

Use conventional commit format: `<emoji> <type>: <description>`

### Commit Types and Emoji

- ✨ **feat**: A new feature
- 🐛 **fix**: A bug fix
- 📝 **docs**: Documentation changes
- 💄 **style**: Code formatting/style
- ♻️ **refactor**: Code restructuring
- ⚡️ **perf**: Performance improvements
- ✅ **test**: Tests
- 🔧 **chore**: Tooling, config, dependencies
- 🚀 **ci**: CI/CD changes
- 🔒️ **security**: Security fixes
- 🗑️ **revert**: Revert changes
- 🚧 **wip**: Work in progress
- 💥 **breaking**: Breaking changes
- ♿️ **a11y**: Accessibility improvements
- 🗃️ **db**: Database changes
- 🚨 **fix**: Resolve linter warnings
- 🧑‍💻 **chore**: Improve developer tooling
- 👔 **feat**: Implement business logic
- 🩹 **fix**: Minor fixes
- 🚑️ **fix**: Critical hotfix
- 🎨 **style**: Improve structure/format
- 🔥 **fix**: Remove code/files
- 🦺 **feat**: Add validation
- 💚 **fix**: Fix CI build
- 📈 **feat**: Add analytics
- 🏷️ **feat**: Add/update types
- 🧵 **feat**: Add/update threading

### Message Guidelines

- **Present tense, imperative mood**: "add feature" not "added feature"
- **Concise first line**: Keep under 72 characters
- **Focus on why, not what**: The diff shows what changed, explain why

## Examples

### Good Commit Messages

```
✨ feat: add user authentication system
🐛 fix: resolve memory leak in rendering process
📝 docs: update API documentation with new endpoints
♻️ refactor: simplify error handling logic in parser
🚨 fix: resolve linter warnings in component files
🧑‍💻 chore: improve developer tooling setup process
👔 feat: implement business logic for transaction validation
🩹 fix: address minor styling inconsistency in header
🚑️ fix: patch critical security vulnerability in auth flow
🎨 style: reorganize component structure for better readability
🔥 fix: remove deprecated legacy code
🦺 feat: add input validation for user registration form
💚 fix: resolve failing CI pipeline tests
📈 feat: implement analytics tracking for user engagement
🔒️ fix: strengthen authentication password requirements
♿️ feat: improve form accessibility for screen readers
```

### Splitting Commits Example

If the diff shows:
- New Solidity compiler support
- Documentation updates
- Package dependency updates
- New type definitions
- Concurrency improvements
- Linting fixes
- New tests
- Security patches

Split into separate commits:
```
✨ feat: add support for Solidity v0.8.x compiler
📝 docs: update documentation for new solc versions
🔧 chore: update package.json dependencies
🏷️ feat: add type definitions for new API endpoints
🧵 feat: improve concurrency handling in worker threads
🚨 fix: resolve linting issues in new code
✅ test: add unit tests for new solc version features
🔒️ fix: update dependencies with security vulnerabilities
```

## Command Options

The user may provide these flags:
- `--no-verify`: Skip running the pre-commit checks (lint, build, test)
- `--d`: Update relevant documentation if needed before committing

## Best Practices

- **Verify before committing**: Ensure code is linted, builds correctly, and tests pass
- **Atomic commits**: Each commit should contain related changes that serve a single purpose
- **Split large changes**: If changes touch multiple concerns, split them into separate commits
- **Never commit secrets**: Do not commit files that likely contain secrets (.env, credentials.json, etc.). Warn the user if they request to commit those files

## After Committing

After successfully creating the commit(s):
1. Run `git status` to verify the commit was successful
2. Inform the user of the commit hash and message
3. Ask if they would like to push to remote (but don't push unless explicitly requested)

**IMPORTANT**: When the user asks to push, use the `safe-push` skill to protect against accidental pushes to protected branches (main, master, production, staging, testing, etc.). The safe-push skill will:
- Check if the current branch is protected
- Warn the user and suggest alternatives (creating a feature branch or PR)
- Only push to protected branches with explicit confirmation
