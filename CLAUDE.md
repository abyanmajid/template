# Claude Configuration

## Build/Lint Error Fixes

When fixing build or lint errors, **always ask for permission before modifying logic-relevant code**. This includes:

- Removing or changing function calls (e.g., `jsonContentOneOf` -> `jsonContent`)
- Altering business logic or validation rules
- Removing imports that are actively used in application logic
- Changing API response structures or schemas
- Modifying database queries or handlers

**Acceptable without asking:**
- Adding missing imports
- Fixing typos or formatting
- Adding type annotations
- Updating configuration files (tsconfig, eslint, etc.)
- Adding/removing unused imports

If a build/lint fix requires changing logic, present the options and ask which approach the user prefers.
