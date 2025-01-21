# Dawn

[![Build status](https://github.com/shopify/dawn/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Shopify/dawn/actions/workflows/ci.yml?query=branch%3Amain)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?color=informational)](/.github/CONTRIBUTING.md)

[Getting started](#getting-started) |
[Staying up to date with Dawn changes](#staying-up-to-date-with-dawn-changes) |
[Developer tools](#developer-tools) |
[Contributing](#contributing) |
[Code of conduct](#code-of-conduct) |
[Theme Store submission](#theme-store-submission) |
[License](#license)

Dawn represents a HTML-first, JavaScript-only-as-needed approach to theme development. It's Shopify's first source available theme with performance, flexibility, and [Online Store 2.0 features](https://www.shopify.com/partners/blog/shopify-online-store) built-in and acts as a reference for building Shopify themes.

[Templates](https://shopify.dev/docs/storefronts/themes/architecture/templates) |
[Theme Architecture](https://shopify.dev/docs/storefronts/themes/architecture) |
[Theme Development](https://shopify.dev/docs/storefronts/themes/best-practices) |
[Theme Check](https://shopify.dev/docs/storefronts/themes/tools/theme-check) |
[Lighthouse](https://shopify.dev/docs/storefronts/themes/tools/lighthouse-ci) |
[Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli) |

## Extension Guidelines

### 1. Section Development

Following `coding-standards/liquid/README.md` standards:

- Use standardized naming conventions for settings:
  - `title` for Titles
  - `content` for Content areas (use `richtext` or `inline_richtext`)
  - `cta_text` and `cta_link` for CTAs
  - `image_desktop`, `image_tablet`, `image_mobile` for responsive images

### 2. Styling

Based on `coding-standards/css/README.md` (lines 479-486):

- Follow OOCSS and BEM methodology
- Create reusable, composable components
- Maintain low specificity
- Use CSS custom properties for theme settings
- Mobile-first responsive approach

### 3. JavaScript Integration

Following `coding-standards/blubolt-quality/README.md` (lines 26-31):

- Use provided helper utilities:
  - `data-smooth-scroll`
  - `data-click-toggle`
- Add new functionality in `src/scripts/`
- Use data attributes for JavaScript targeting

### 4. Documentation Requirements

Based on `coding-standards/documentation/README.md` (lines 13-14):

Each new feature/component should include:
- Inline documentation for complex functionality
- Usage examples
- Available customization options
- Performance considerations

### 5. Quality Assurance

Following `.github/PULL_REQUEST_TEMPLATE.md` (lines 36-43):

- Test on multiple browsers
- Ensure mobile responsiveness
- Validate accessibility
- Run Theme Check linting
- Check performance metrics

### 6. Development Workflow

1. Create feature branch: `[initials]-[ticket-id]`
2. Follow coding standards
3. Document changes
4. Create PR with comprehensive description
5. Include mobile/desktop screenshots

## Getting Started with Extension

1. Install recommended VS Code extensions
2. Use provided snippets for common patterns
3. Follow the folder structure
4. Use existing theme settings where possible
5. Add new features progressively

## Performance Guidelines

Based on `.github/CONTRIBUTING.md` (lines 53-58):

- Maintain zero Cumulative Layout Shift
- Avoid render-blocking resources
- Optimize for core web vitals
- Use lazy loading where appropriate
- Implement proper image sizing

## Contributing

1. Review existing components before creating new ones
2. Follow the naming conventions
3. Update documentation
4. Create meaningful PRs
5. Update changelog

* **Web-native in its purest form:** Themes run on the [evergreen web](https://www.w3.org/2001/tag/doc/evergreen-web/). We leverage the latest web browsers to their fullest, while maintaining support for the older ones through progressive enhancement—not polyfills.
* **Lean, fast, and reliable:** Functionality and design defaults to "no" until it meets this requirement. Code ships on quality. Themes must be built with purpose. They shouldn't support each and every feature in Shopify.
* **Server-rendered:** HTML must be rendered by Shopify servers using Liquid. Business logic and platform primitives such as translations and money formatting don't belong on the client. Async and on-demand rendering of parts of the page is OK, but we do it sparingly as a progressive enhancement.
* **Functional, not pixel-perfect:** The Web doesn't require each page to be rendered pixel-perfect by each browser engine. Using semantic markup, progressive enhancement, and clever design, we ensure that themes remain functional regardless of the browser.

You can find a more detailed version of our theme code principles in the [contribution guide](https://github.com/Shopify/dawn/blob/main/.github/CONTRIBUTING.md#theme-code-principles).

## Getting started
We recommend using Dawn as a starting point for theme development. [Learn more on Shopify.dev](https://shopify.dev/themes/getting-started/create).

> If you're building a theme for the Shopify Theme Store, then you can use Dawn as a starting point. However, the theme that you submit needs to be [substantially different from Dawn](https://shopify.dev/themes/store/requirements#uniqueness) so that it provides added value for merchants. Learn about the [ways that you can use Dawn](https://shopify.dev/themes/tools/dawn#ways-to-use-dawn).

Please note that the main branch may include code for features not yet released. The "stable" version of Dawn is available in the theme store.

## Staying up to date with Dawn changes

Say you're building a new theme off Dawn but you still want to be able to pull in the latest changes, you can add a remote `upstream` pointing to this Dawn repository.

1. Navigate to your local theme folder.
2. Verify the list of remotes and validate that you have both an `origin` and `upstream`:
```sh
git remote -v
```
3. If you don't see an `upstream`, you can add one that points to Shopify's Dawn repository:
```sh
git remote add upstream https://github.com/Shopify/dawn.git
```
4. Pull in the latest Dawn changes into your repository:
```sh
git fetch upstream
git pull upstream main
```

Alternatively, you can create a separate branch for upstream changes and merge them carefully:

```sh
# Create a branch for upstream changes
git checkout -b dawn-upstream
git fetch upstream
git reset --hard upstream/main

# Go back to your main branch
git checkout main

# Merge upstream changes while ignoring your custom files
git merge dawn-upstream -X ignore-space-change -X ignore-all-space --no-commit
```

## Developer tools

There are a number of really useful tools that the Shopify Themes team uses during development. Dawn is already set up to work with these tools.

### Shopify CLI

[Shopify CLI](https://github.com/Shopify/shopify-cli) helps you build Shopify themes faster and is used to automate and enhance your local development workflow. It comes bundled with a suite of commands for developing Shopify themes—everything from working with themes on a Shopify store (e.g. creating, publishing, deleting themes) or launching a development server for local theme development.

You can follow this [quick start guide for theme developers](https://shopify.dev/docs/themes/tools/cli) to get started.

### Theme Check

We recommend using [Theme Check](https://github.com/shopify/theme-check) as a way to validate and lint your Shopify themes.

We've added Theme Check to Dawn's [list of VS Code extensions](/.vscode/extensions.json) so if you're using Visual Studio Code as your code editor of choice, you'll be prompted to install the [Theme Check VS Code](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) extension upon opening VS Code after you've forked and cloned Dawn.

You can also run it from a terminal with the following Shopify CLI command:

```bash
shopify theme check
```

### Continuous Integration

Dawn uses [GitHub Actions](https://github.com/features/actions) to maintain the quality of the theme. [This is a starting point](https://github.com/Shopify/dawn/blob/main/.github/workflows/ci.yml) and what we suggest to use in order to ensure you're building better themes. Feel free to build off of it!

#### Shopify/lighthouse-ci-action

We love fast websites! Which is why we created [Shopify/lighthouse-ci-action](https://github.com/Shopify/lighthouse-ci-action). This runs a series of [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) audits for the home, product and collections pages on a store to ensure code that gets added doesn't degrade storefront performance over time.

#### Shopify/theme-check-action

Dawn runs [Theme Check](#Theme-Check) on every commit via [Shopify/theme-check-action](https://github.com/Shopify/theme-check-action).

### Creating Sections and Snippets

Dawn includes CLI commands to generate new sections and snippets with the correct file structure and boilerplate code:

```bash
# Create a new section
npm run create:section mySectionName

# Create a new snippet
npm run create:snippet mySnippetName
```

This will:
1. Create the Liquid template with proper stylesheet inclusion
2. Generate the SCSS file with BEM structure
3. Set up responsive breakpoints
4. Add standard padding/margin variables

Generated files follow this structure:

```text
sections/
└── custom-my-section-name.liquid
src/
└── sections/
    └── _custom-my-section-name.scss
```

The build process will:
- Compile section SCSS files to `assets/section-*.css`
- Compile snippet SCSS files to `assets/component-*.css`
- Watch for changes during development (`npm run start:testing`)
- Auto-reload the theme preview

Each generated section includes:
- Standard padding settings
- Mobile-first responsive design
- BEM class structure
- Proper asset loading

Each generated snippet includes:
- Component-based styling
- BEM methodology
- Responsive breakpoints
- Asset optimization

## Contributing

Want to make commerce better for everyone by contributing to Dawn? We'd love your help! Please read our [contributing guide](https://github.com/Shopify/dawn/blob/main/.github/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build for Dawn.

## Code of conduct

All developers who wish to contribute through code or issues, please first read our [Code of Conduct](https://github.com/Shopify/dawn/blob/main/.github/CODE_OF_CONDUCT.md).

## Theme Store submission

The [Shopify Theme Store](https://themes.shopify.com/) is the place where Shopify merchants find the themes that they'll use to showcase and support their business. As a theme partner, you can create themes for the Shopify Theme Store and reach an international audience of an ever-growing number of entrepreneurs.

Ensure that you follow the list of [theme store requirements](https://shopify.dev/themes/store/requirements) if you're interested in becoming a [Shopify Theme Partner](https://themes.shopify.com/services/themes/guidelines) and building themes for the Shopify platform.

## License

Copyright (c) 2021-present Shopify Inc. See [LICENSE](/LICENSE.md) for further details.
