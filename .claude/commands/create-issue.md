---
allowed-tools: Bash(gh issue create:*), Bash(gh issue view:*), Bash(gh issue list:*)
description: Create well-structured GitHub issues following best practices
---

# Claude Command: Create Issue

This command helps you create clear, actionable GitHub issues that follow best practices.

## Usage

To create an issue, type:
```
/create-issue
```

Or provide a title directly:
```
/create-issue Add user authentication
/create-issue Fix memory leak in parser
```

## What This Command Does

1. Asks for issue details (title, description, labels)
2. Determines appropriate issue type (bug, feature, enhancement, etc.)
3. Creates a well-structured issue with proper formatting
4. Assigns labels automatically based on type
5. Returns the issue URL and number

## Issue Structure

Issues should include:

### Title
- Clear, concise description of the issue
- Use imperative mood ("Add feature" not "Adding feature")
- Include context when needed

### Description
- **Problem/Need**: What needs to be done and why
- **Proposed Solution**: How to address it (if known)
- **Acceptance Criteria**: What defines "done"
- **Additional Context**: Any relevant info, links, or examples

## Issue Types and Labels

Common issue types:
- **bug**: Something isn't working
- **feature**: New functionality
- **enhancement**: Improvement to existing feature
- **documentation**: Documentation updates
- **chore**: Maintenance, dependencies, tooling
- **refactor**: Code restructuring
- **performance**: Speed or efficiency improvements
- **security**: Security-related issues

## Best Practices

**Good Titles:**
- "Add JWT authentication to API"
- "Fix memory leak in WebSocket handler"
- "Update README with setup instructions"

**Bad Titles:**
- "Fix bug" (too vague)
- "Help" (not descriptive)
- "The app crashes sometimes" (not specific)

**Good Descriptions:**
- Start with the problem/need
- Provide context and examples
- List clear acceptance criteria
- Include relevant technical details

**Bad Descriptions:**
- Too vague ("Make it better")
- No context or examples
- No clear definition of done

## Examples

### Good Bug Issue

**Title**: Fix memory leak in WebSocket connection handler

**Description**:
```
## Problem
Server crashes after sustained load (~1000 concurrent connections). Memory profiling shows WebSocket connections aren't being cleaned up properly.

## Steps to Reproduce
1. Start server
2. Connect 1000+ clients via WebSocket
3. Disconnect clients
4. Memory usage remains high
5. Eventually crashes with OOM error

## Expected Behavior
Memory should be released when connections close.

## Acceptance Criteria
- [ ] Connections properly cleaned up on disconnect
- [ ] Memory usage stable under load
- [ ] Load test: 2000 concurrent connections for 1 hour without crash
```

### Good Feature Issue

**Title**: Add branch protection and safe-push workflow

**Description**:
```
## Need
Prevent accidental pushes to protected branches (main, production, testing) that should go through PR workflows.

## Proposed Solution
- Create protected branches configuration file
- Add safe-push skill that checks current branch before pushing
- Warn users and suggest alternatives when attempting to push to protected branches
- Allow emergency override with explicit confirmation

## Acceptance Criteria
- [ ] Protected branches config created with common branch names
- [ ] Safe-push skill intercepts push attempts
- [ ] Users warned when pushing to protected branches
- [ ] Emergency override available with confirmation
- [ ] Documentation added for configuration

## Additional Context
Should support multiple protected branch patterns: deployment (main, prod), testing (integration, e2e), and QA (qa, uat) branches.
```

## Command Options

- No arguments: Interactive mode (asks for all details)
- `<title>`: Creates issue with title, prompts for description

## Integration

Works with:
- **create-pr skill**: Issues can be linked to PRs
- **checkout-branch skill**: Can create branches for issues
- **commit skill**: Can reference issues in commits

## Requirements

- GitHub CLI (`gh`) must be installed and authenticated
- Must be in a GitHub repository
