---
description: Use the gitops agent to create a pull request with changes made in this thread. Multi-agent aware - only commits changes from this session.
---

# Open Pull Request

You are being asked to create a pull request with the changes you've made in THIS conversation thread.

## Critical Multi-Agent Context

**IMPORTANT**: Multiple Claude agents may be working on this codebase simultaneously. You MUST:

1. ✅ **Only commit YOUR changes** - Files you modified/created in THIS thread
2. ✅ **Preserve other agents' work** - Do not touch, delete, or modify files you didn't change
3. ✅ **Respect staged changes** - If files are already staged by others, skip them
4. ✅ **Avoid conflicts** - Check git status carefully before staging anything
5. ✅ **Session awareness** - Review the conversation history to identify YOUR changes

## Instructions

### Step 1: Review Your Session Changes

Before proceeding, analyze the conversation history to identify:

**Files YOU modified in this thread:**

- List each file you created, edited, or deleted
- Review each change you made

**Files to SKIP:**

- Files mentioned but not modified by you
- Files with pre-existing uncommitted changes
- Files staged by other agents or developers
- Any file you're uncertain about

### Step 2: Invoke the GitOps Agent

Use the **Task tool** to spawn the **gitops** agent:

```
Use the Task tool with subagent_type='gitops' and provide:
- Clear description of what you accomplished in this thread
- List of specific files you modified (for agent verification)
- Instruction to create a pull request with ONLY these session changes
```

**Example prompt for gitops agent:**

```markdown
Create a pull request with the changes I made in this session.

## Session Changes Summary

[Describe what you accomplished - e.g., "Added authentication middleware and tests"]

## Files Modified in This Session

- src/auth/middleware.ts (created)
- src/auth/middleware.spec.ts (created)
- src/index.ts (modified - added auth import)

## Instructions

1. Review git status and verify these files
2. Stage ONLY these files (do not use `git add .`)
3. Create a descriptive commit following repository conventions
4. Push to a new branch with appropriate naming
5. Create a pull request with:
   - Clear title describing the feature/fix
   - Summary of changes
   - Test plan
   - Reference to any related issues

## Multi-Agent Safety

- Do NOT commit any files not listed above
- Do NOT modify or delete code from other sessions
- Skip any files that were already staged
- Verify each file before staging
```

### Step 3: Verification Checklist

Before the gitops agent executes, ensure:

- [ ] You've identified ALL and ONLY files you modified
- [ ] You haven't included files from previous sessions
- [ ] You're not touching other agents' work
- [ ] The changes are complete and tested
- [ ] You have a clear PR description ready

### Step 4: Post-PR Actions

After the gitops agent creates the PR:

1. ✅ Verify the PR URL is provided
2. ✅ Confirm only your session changes are included
3. ✅ Check the PR description is clear and accurate
4. ✅ Inform the user of the PR URL for review

## Multi-Agent Best Practices

### DO:

- ✅ Review conversation history thoroughly
- ✅ List specific files you modified
- ✅ Use `git add <specific-file>` for each file
- ✅ Verify git status before committing
- ✅ Create feature branches with unique names
- ✅ Write clear, scoped commit messages
- ✅ Include test changes with code changes

### DO NOT:

- ❌ Use `git add .` or `git add -A` (too broad)
- ❌ Commit files you didn't modify
- ❌ Delete or modify code from other agents
- ❌ Include unrelated changes
- ❌ Skip verification steps
- ❌ Assume all unstaged files are yours
- ❌ Force push or rewrite shared history

## Example Multi-Agent Scenario

**Scenario**: Three agents working concurrently:

- Agent 1 (YOU): Added authentication → Your session changes only
- Agent 2: Updated dependencies → Their changes, don't touch
- Agent 3: Fixed a bug → Their changes, don't touch

**Your git status might show:**

```
M  src/auth/middleware.ts        (YOU)
M  src/index.ts                   (YOU)
A  src/auth/middleware.spec.ts   (YOU)
M  package.json                   (Agent 2 - SKIP)
M  src/utils/helper.ts           (Agent 3 - SKIP)
```

**You should only stage:**

- src/auth/middleware.ts
- src/index.ts
- src/auth/middleware.spec.ts

## Error Handling

### If Unsure About a File

**ASK THE USER** before including it:

```
"I see src/utils/helper.ts is modified but I'm not certain if I changed it in this session.
Should I include it in the PR or skip it?"
```

### If Git Status Shows Unexpected Changes

**STOP and analyze**:

1. Review conversation history again
2. Identify which files are definitely yours
3. Ask user about ambiguous files
4. Proceed only with confirmed session changes

### If Another Agent's PR Conflicts

**Coordinate with user**:

```
"I see there's another PR open that touches similar files.
Should I:
1. Rebase on top of their changes?
2. Create my PR anyway for parallel review?
3. Wait for their PR to merge first?"
```

## Success Criteria

A successful PR creation includes:

✅ **Only your session changes** are committed
✅ **Clear PR title** describing the work
✅ **Comprehensive PR description** with summary and test plan
✅ **Proper branch naming** (e.g., `claude/feature-auth-middleware-20251121`)
✅ **Conventional commit message** following repo standards
✅ **No conflicts** with other agents' work
✅ **All tests pass** (if applicable)
✅ **PR URL provided** to user

## Notes

- The gitops agent has extensive safety checks and session awareness
- It will verify files before staging and committing
- It follows repository conventions automatically
- It creates properly formatted commit messages and PR descriptions
- Trust the gitops agent but provide clear, specific instructions

Remember: **When in doubt, ask the user**. It's better to clarify than to include wrong changes or break other agents' work.
