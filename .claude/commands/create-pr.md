---
allowed-tools: Bash(gh pr create:*), Bash(gh pr view:*), Bash(git log:*), Bash(git diff:*), Bash(git rev-parse:*), Read
description: Create a well-written pull request with clear context for reviewers
---

# Claude Command: Create PR

This command helps you create concise yet comprehensive pull requests that help reviewers understand your changes.

## Usage

To create a PR, type:
```
/create-pr
```

Or specify a base branch:
```
/create-pr main
/create-pr develop
```

## What This Command Does

1. Analyzes all commits in the current branch (since diverging from base)
2. Reviews the full diff to understand changes
3. Generates a clear PR description following the template
4. Creates the PR using GitHub CLI (`gh`)
5. Returns the PR URL

## PR Structure

The PR description follows this format (based on `.github/pull_request_template.md`):

### Summary
A brief 1-3 sentence overview of what the PR does and why.

### Changes
Key changes made in bullet points:
- Focus on WHAT changed (files, features, behavior)
- Group related changes together
- Use clear, specific language

### Testing
How the changes were tested:
- Linting status
- Build status
- Test results
- Manual testing performed

### Context
Additional context that helps reviewers:
- WHY these changes were made
- Design decisions and trade-offs
- Related issues or PRs
- Migration notes (if applicable)

## Best Practices

**For Clarity:**
- Lead with the "why" before the "what"
- Use concrete examples over abstract descriptions
- Group related changes together
- Highlight breaking changes prominently

**For Reviewers:**
- Point out areas needing extra attention
- Explain non-obvious decisions
- Provide testing instructions
- Include before/after for behavior changes

**Conciseness:**
- 1-3 sentences for summary
- Bullet points over paragraphs
- Skip obvious details (code shows this)
- Focus on reviewer-relevant info

## Examples

### Good PR Description

```markdown
## Summary
Adds branch protection safeguards to prevent accidental pushes to main, production, and testing branches. Introduces a safe-push skill that checks branch status and prompts users before pushing to protected branches.

## Changes
- Added `.claude/protected-branches.json` with list of protected branches
- Created `safe-push` skill with branch checking logic
- Updated `commit` skill to reference safe-push for post-commit pushes
- Protected branches: main, master, production, staging, testing, qa, etc.

## Testing
- [x] Linted
- [x] Built successfully
- [x] Manual testing: Verified protection works on main branch
- [x] Manual testing: Verified normal branches push without blocking

## Context
This prevents common mistakes where commits are accidentally pushed directly to important branches that should go through PR workflows. Users can still override for emergencies with explicit confirmation.
```

### Example: Feature PR

```markdown
## Summary
Implements user authentication system with JWT tokens, including login, signup, and session management.

## Changes
- Added auth API endpoints (`/login`, `/signup`, `/logout`)
- Created `AuthService` with token generation and validation
- Added auth middleware for protected routes
- Set up session storage with Redis
- Added login/signup UI components

## Testing
- [x] Linted
- [x] Built successfully
- [x] Tests pass (15 new auth tests added)
- [x] Manual testing: Tested login flow, session persistence, logout

## Context
Uses JWT with 24h expiration and refresh tokens. Redis chosen for session storage due to fast lookup requirements. Auth middleware checks token on every protected route request.

Breaking change: All protected routes now require authentication header.
```

## Command Options

- No arguments: Creates PR to default branch (usually `main`)
- `<base-branch>`: Creates PR to specified base branch

## Integration

Works with:
- **commit skill**: Natural next step after committing
- **checkout-branch skill**: Complete the branch → commit → PR workflow
- **safe-push skill**: Push branch before creating PR

## Requirements

- GitHub CLI (`gh`) must be installed and authenticated
- Current branch must have commits ahead of base branch
- Remote branch should be pushed (will be prompted if not)
