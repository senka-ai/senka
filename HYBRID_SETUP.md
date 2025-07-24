# Hybrid Repository Architecture

This document describes the hybrid repository architecture implemented for the Senka UI library, where development happens in the monorepo but publishing occurs from a dedicated standalone repository.

## Architecture Overview

```
senka/ (monorepo - development)    →    @senka-ai/ui/ (standalone - publishing)
├── packages/ui/                        ├── src/
├── .github/workflows/                  ├── package.json
└── sync-ui-library.yml                 ├── package-lock.json
                                        └── .github/workflows/publish.yml
```

## How It Works

### **Development Flow:**
1. **Monorepo Development**: All UI library development happens in `packages/ui/`
2. **Automatic Detection**: Workflow detects changes to UI library files
3. **Quality Gates**: Runs type checking, Svelte checking, build, and tests
4. **Intelligent Sync**: Copies UI library to standalone repository with npm compatibility
5. **Automatic Publishing**: Standalone repository publishes to npm with version checking

### **Sync Process:**
- **Triggered by**: Pushes to main with `packages/ui/` changes
- **Files Synced**: All UI library source code, configs, and documentation
- **npm Compatibility**: Generates `package-lock.json` and updates scripts
- **Workflow Integration**: Copies publish workflow to standalone repository
- **Repository URLs**: Updates package.json to point to standalone repository

### **Publishing Pipeline:**
- **Quality Checks**: Type checking, Svelte checking, build, and tests
- **Version Detection**: Prevents duplicate publishing of existing versions
- **npm Publishing**: Automatic publishing to npm registry
- **GitHub Releases**: Optional release creation with changelog (if permissions allow)
- **Error Handling**: Graceful handling of permission issues

## Current Implementation

### **Repositories:**
- **Development**: [`senka-ai/senka`](https://github.com/senka-ai/senka) - Monorepo for all development
- **Publishing**: [`senka-ai/ui`](https://github.com/senka-ai/ui) - Standalone UI library
- **Package**: [`@senka-ai/ui`](https://www.npmjs.com/package/@senka-ai/ui) - npm organization package

### **Workflows:**
- **Sync Workflow**: `.github/workflows/sync-ui-library.yml` - Handles monorepo to standalone sync
- **Publish Workflow**: `standalone-repo-files/.github/workflows/publish.yml` - Handles npm publishing

### **Key Features:**
- **Smart Triggering**: Runs on all pushes but only syncs when UI changes detected
- **Efficient Resource Usage**: Skips expensive operations when no UI changes
- **Scheduled Backup**: Daily sync at 2 AM UTC to catch any missed syncs
- **Manual Override**: Force sync option for manual workflow dispatch
- **npm Compatibility**: Full npm ecosystem support with proper lockfiles

## Development Workflow

### **Making Changes:**
```bash
# 1. Work in monorepo as usual
cd packages/ui
# ... make your changes ...

# 2. Test locally
yarn ui:dev     # Storybook development
yarn ui:test    # Run tests
yarn ui:build   # Build library

# 3. Release (when ready)
npm version patch  # or minor, major
git add package.json
git commit -m "feat: add new component"
git push origin main

# 4. Everything else is automatic! 🤖
# Publishes as @senka-ai/ui to npm
```

### **What Happens Automatically:**
1. **Change Detection**: Workflow detects UI changes
2. **Quality Gates**: Runs full test suite and type checking
3. **Sync Process**: Copies to standalone repository with npm compatibility
4. **Publishing**: Standalone repository publishes to npm
5. **Release Notes**: GitHub release created (if permissions allow)

## Monitoring and Maintenance

### **Dashboard Links:**
- **Monorepo Actions**: https://github.com/senka-ai/senka/actions
- **Standalone Actions**: https://github.com/senka-ai/ui/actions
- **npm Package**: https://www.npmjs.com/package/@senka-ai/ui
- **Package Statistics**: https://npm-stat.com/charts.html?package=@senka-ai/ui

### **Manual Operations:**

**Force Sync (if needed):**
1. Go to Actions tab in `senka-ai/senka`
2. Click "Sync UI Library to @senka-ai/ui"
3. Click "Run workflow" → Enable "Force sync" → "Run workflow"

**Manual Publish (if needed):**
1. Go to Actions tab in `senka-ai/ui`
2. Click "Publish to npm"
3. Click "Run workflow" → Choose version type → "Run workflow"

## Technical Details

### **Required Secrets:**
- **Monorepo** (`senka-ai/senka`):
  - `SYNC_TOKEN`: GitHub Personal Access Token with `repo` and `workflow` permissions
- **Standalone** (`senka-ai/ui`):
  - `NPM_TOKEN`: npm Automation token for publishing

### **Workflow Permissions:**
- **Sync Workflow**: Uses `SYNC_TOKEN` for cross-repository operations
- **Publish Workflow**: Requires `contents: write` for GitHub releases

### **Development Workflow Optimizations:**

#### **Enhanced Quality Gates** (Recommended Additions)
- **Visual Regression Testing**: Automated screenshot comparison for UI changes
- **Performance Monitoring**: Lighthouse CI integration for generated component performance
- **Bundle Size Analysis**: Track bundle size impact of new components
- **Accessibility Testing**: Automated a11y testing in CI pipeline

#### **User Testing Integration**
- **Storybook Deployment**: Automatic Storybook deployment for stakeholder review
- **Component Usage Analytics**: Track which components are most/least used
- **Feedback Collection**: Automated feedback requests for new component versions
- **Breaking Change Detection**: Automated detection of API breaking changes

### **File Transformations:**
- **package.json**: Repository URLs updated to point to standalone repository
- **package-lock.json**: Generated from monorepo yarn.lock for npm compatibility
- **Scripts**: Updated to use npm commands instead of yarn
- **README**: Replaced with standalone-specific documentation

## Benefits

✅ **Seamless Development**: Continue working in familiar monorepo environment  
✅ **Automatic Publishing**: Zero manual steps for releases  
✅ **Clean Public Interface**: Users see only the UI library, not monorepo complexity  
✅ **Proper npm Integration**: Package points to dedicated repository with correct URLs  
✅ **Version Control**: Full history of releases and changes  
✅ **Quality Assurance**: Comprehensive testing before every publish  
✅ **Error Resilience**: Handles edge cases and permission issues gracefully  
✅ **Developer Experience**: Simple workflow with clear status reporting

## Architecture Decisions

### **Why Hybrid Approach:**
- **Development Efficiency**: Keep related packages together in monorepo
- **Publishing Clarity**: Provide clean, focused repository for public consumption
- **URL Correctness**: npm package links point to relevant repository
- **Separation of Concerns**: Development vs. distribution concerns handled separately

### **Why npm over Yarn in Standalone:**
- **Broader Compatibility**: npm is more universally supported in CI/CD
- **Simpler Setup**: Fewer configuration requirements
- **Lockfile Generation**: Easier to generate from yarn.lock

### **Why Automatic Sync:**
- **Reduced Manual Work**: Eliminates human error in publishing process
- **Consistency**: Ensures standalone repository always reflects latest changes
- **Speed**: Immediate publishing after development changes

This hybrid architecture provides the best of both worlds: convenient monorepo development with professional standalone package presentation.