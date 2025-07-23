# Hybrid Repository Setup Guide

This guide will help you set up the hybrid approach where the UI library is developed in the monorepo but automatically synced to a standalone repository for publishing.

## Overview

```
senka/ (monorepo - development)    →    senka-ui/ (standalone - publishing)
├── packages/ui/                        ├── src/
├── .github/workflows/                  ├── package.json
└── sync-ui-library.yml                 └── .github/workflows/publish.yml
```

## Step 1: Create Standalone Repository

1. **Create new repository on GitHub:**

   ```bash
   # Go to https://github.com/senka-ai and create a new repository named "senka-ui"
   # Make it public and don't add README, .gitignore, or license (we'll sync these)
   ```

2. **Clone and set up the standalone repository:**

   ```bash
   git clone https://github.com/senka-ai/senka-ui.git
   cd senka-ui

   # Copy the workflow files from your monorepo
   mkdir -p .github/workflows
   cp ../senka/standalone-repo-files/.github/workflows/* .github/workflows/

   # Create initial commit
   git add .
   git commit -m "Initial setup: Add GitHub workflows"
   git push origin main
   ```

## Step 2: Set Up Secrets and Tokens

### A. Create Personal Access Token for Syncing

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name: `senka-ui-sync-token`
4. Scopes needed:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
5. Copy the generated token

### B. Create npm Token for Publishing

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Go to Access Tokens → Generate New Token
3. Type: "Automation"
4. Copy the generated token

### C. Set Repository Secrets

**In the monorepo (`senka-ai/senka`):**

```bash
# Go to Settings → Secrets and variables → Actions
# Add these Repository secrets:
```

- `SYNC_TOKEN`: The GitHub Personal Access Token created above

**In the standalone repo (`senka-ai/senka-ui`):**

```bash
# Go to Settings → Secrets and variables → Actions
# Add these Repository secrets:
```

- `NPM_TOKEN`: The npm authentication token
- `MONOREPO_NOTIFY_TOKEN`: Same GitHub PAT as above (for notifications)

## Step 3: Test the Setup

### A. Test Sync Workflow

1. **Make a change to the UI library in your monorepo:**

   ```bash
   cd senka/packages/ui
   # Edit package.json to bump version
   npm version patch
   git add package.json
   git commit -m "test: bump ui version for sync test"
   git push origin main
   ```

2. **Check the sync workflow:**
   - Go to Actions tab in `senka-ai/senka`
   - Look for "Sync UI Library to senka-ui" workflow
   - It should trigger automatically and sync to `senka-ai/senka-ui`

### B. Test Publish Workflow

1. **Check the standalone repository:**

   ```bash
   # The senka-ui repo should now have your UI library files
   cd senka-ui
   git pull origin main
   ls -la  # Should show your UI library structure
   ```

2. **Test publishing:**
   - Go to Actions tab in `senka-ai/senka-ui`
   - Look for "Publish to npm" workflow
   - It should trigger automatically if the version changed
   - Check [npmjs.com/package/senka-ui](https://www.npmjs.com/package/senka-ui) for the new version

## Step 4: Development Workflow

### For Regular Development:

1. **Work in the monorepo as usual:**

   ```bash
   cd senka/packages/ui
   # Make your changes
   yarn ui:dev  # Test in Storybook
   yarn ui:test  # Run tests
   ```

2. **When ready to release:**

   ```bash
   # Bump version in monorepo
   cd packages/ui
   npm version patch  # or minor, major

   # Commit and push
   git add package.json
   git commit -m "release: bump ui library to v0.1.4"
   git push origin main

   # The workflows will handle the rest automatically!
   ```

### Manual Sync (if needed):

You can manually trigger the sync workflow:

1. Go to Actions tab in `senka-ai/senka`
2. Click "Sync UI Library to senka-ui"
3. Click "Run workflow" → "Run workflow"

### Manual Publish (if needed):

You can manually trigger publishing:

1. Go to Actions tab in `senka-ai/senka-ui`
2. Click "Publish to npm"
3. Click "Run workflow" → Choose version type → "Run workflow"

## Step 5: Update Package URLs

Your `packages/ui/package.json` will be automatically updated during sync, but you may want to update documentation and links:

1. **Update CLAUDE.md and other docs** to mention the standalone repository
2. **Update any hardcoded URLs** to point to `senka-ai/senka-ui` for public consumption

## Monitoring and Maintenance

### Dashboard Links:

- **Monorepo Actions**: https://github.com/senka-ai/senka/actions
- **Standalone Actions**: https://github.com/senka-ai/senka-ui/actions
- **npm Package**: https://www.npmjs.com/package/senka-ui
- **Package Downloads**: https://npm-stat.com/charts.html?package=senka-ui

### Troubleshooting:

**Sync fails:**

- Check the `SYNC_TOKEN` has correct permissions
- Verify the standalone repository exists and is accessible
- Check workflow logs for specific errors

**Publish fails:**

- Verify `NPM_TOKEN` is valid and has publish permissions
- Check if version already exists on npm
- Ensure build and tests pass before publishing

**Out of sync:**

- Run manual sync workflow
- Check for merge conflicts in standalone repo
- Verify file permissions and git configuration

## Benefits You'll Get:

✅ **Seamless Development**: Continue working in monorepo  
✅ **Automatic Publishing**: Releases happen automatically  
✅ **Clean Public Repo**: Users see only the UI library  
✅ **Proper npm URLs**: Package points to dedicated repository  
✅ **Version Control**: Full history of releases  
✅ **Quality Gates**: Tests run before publishing

Your hybrid setup is now ready! The UI library will automatically sync and publish whenever you make changes in the monorepo.
