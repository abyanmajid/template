# Claude Configuration

## Type Safety Protocol

**CRITICAL: After ANY code change, you MUST verify types.**

### Required Steps After Every Code Change:
1. Run `bun run typecheck` in the affected workspace (apps/a3n-web or apps/a3n-api)
2. Show the full output to the user
3. Fix ALL type errors before proceeding
4. NEVER use `any` or type assertions (`as`) to suppress errors without explicit user approval
5. When you see a type error, READ IT - the types are usually correct and you're using the API wrong

### When Type Errors Appear:
- **FIRST:** Check if you're calling the API correctly (e.g., `api.tasks.$get()` not `api.tasks.index.$get()`)
- **SECOND:** Check if the types match reality (e.g., API returns dates as strings, not Date objects)
- **LAST RESORT:** Only use `any` or type assertions if the user explicitly approves it

### Why This Matters:
- The typed RPC client (Hono) PREVENTS API mismatches at compile time
- TypeScript errors are HINTS that you're doing something wrong, not obstacles to suppress
- Ignoring type errors wastes tokens and time debugging runtime issues

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
