# Visual Regression Testing

This directory contains visual regression tests for the Senka component library using Playwright.

## Overview

The visual tests capture screenshots of Storybook stories in both light and dark themes to ensure visual consistency across code changes.

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Install Playwright browsers:

```bash
yarn playwright install
```

## Running Tests

### Basic Commands

```bash
# Run all visual tests
yarn test:visual

# Run all components (comprehensive test suite)
yarn test:visual:all

# Run only critical component tests
yarn test:visual:critical

# Run tests with interactive UI
yarn test:visual:ui

# Update snapshots (when you've made intentional visual changes)
yarn test:visual:update

# Update all component snapshots
yarn test:visual:all:update

# View test results report
yarn test:visual:report
```

### First Time Setup

When running visual tests for the first time:

1. **Generate baseline snapshots for all components**:

```bash
yarn test:visual:all:update
```

2. **Run tests to verify**:

```bash
yarn test:visual:all
```

_Note: Storybook will be started automatically when running tests._

## Test Structure

### Critical Components (`critical-components.spec.ts`)

Tests the most important components with specific stories:

- Button (all variants, states)
- TextField (default, error, disabled)
- Card (default, with image, compact)
- Avatar (all sizes, with image, with initials)
- Dropdown (default, error, disabled)

### All Components (`all-components.spec.ts`)

Tests all 25 components in both light and dark themes with external image mocking for deterministic results. Includes:

- All UI components with their working stories
- Both light and dark theme variants
- Mock external images (picsum.photos, etc.) for consistent snapshots
- Icons and IndividualIcons components with correct story paths

## Understanding Results

### ✅ Passing Tests

Visual tests pass when current screenshots match the baseline snapshots.

### ❌ Failing Tests

Visual tests fail when there are visual differences. This could indicate:

- **Intentional changes**: Update snapshots with `yarn test:visual:update`
- **Unintentional regressions**: Review and fix the visual changes
- **Theme issues**: Problems with light/dark theme implementation

### 📊 Test Reports

View detailed results with:

```bash
yarn test:visual:report
```

## Workflow

### During Development

1. Make component changes
2. Run `yarn test:visual:critical` to check key components quickly
3. For comprehensive testing, run `yarn test:visual:all`
4. If tests fail, review the visual differences in the HTML report
5. Update snapshots if changes are intentional

### Before Committing

1. Run all visual tests: `yarn test:visual:all`
2. Ensure all 50 tests pass (25 components × 2 themes)
3. Commit both code changes and updated snapshots

### CI/CD Integration

The visual tests can be integrated into CI/CD pipelines to automatically catch visual regressions.

## Troubleshooting

### Tests Timing Out

- Storybook starts automatically (no need to run manually)
- Check that stories exist and load properly in Storybook UI
- Increase timeout in `playwright.config.ts` if needed

### Screenshots Look Different

- Fonts may render differently on different systems
- Consider using Docker for consistent CI environments
- Check that themes are applied correctly

### Performance Issues

- Run tests in headed mode for debugging: `yarn test:visual:all --headed`
- Reduce parallelization: `yarn test:visual:all --workers=1`
- Focus on specific components: `yarn test:visual:critical`
- Test individual components: `yarn test:visual:all --grep "Button Component"`

## Configuration

Visual testing configuration is in:

- `playwright.config.ts` - Main Playwright configuration (single config file)
- `tests/visual/utils.ts` - Utility functions including external image mocking
- Stories must be accessible at `http://localhost:6006/iframe.html?id=story-id`
- Automatic Storybook server startup on port 6006

## Best Practices

1. **Keep snapshots up to date** - Update when making intentional visual changes
2. **Test critical paths** - Use `yarn test:visual:critical` for quick feedback during development
3. **Use comprehensive testing** - Run `yarn test:visual:all` before committing changes
4. **External images are mocked** - Tests use static placeholders for consistent results
5. **Both themes tested** - Light and dark themes are tested for every component
6. **Review failures carefully** - Don't automatically update snapshots without understanding why they changed
7. **Run locally first** - Test changes locally before pushing to CI

## Snapshot Storage

Screenshots are stored in:

- `tests/visual/critical-components.spec.ts-snapshots/` - Critical component snapshots
- `tests/visual/all-components.spec.ts-snapshots/` - All 50 component snapshots (25 components × 2 themes)

These directories should be committed to version control to track visual changes over time.

## Current Status

✅ **All 25 components tested** - Complete coverage of the component library  
✅ **50 visual snapshots** - Both light and dark themes for every component  
✅ **100% test success rate** - All components working including Icons and IndividualIcons  
✅ **External image mocking** - Deterministic results with static placeholders  
✅ **Single configuration** - Simplified setup with automatic Storybook startup
