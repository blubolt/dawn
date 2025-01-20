const fs = require('fs');
const path = require('path');

// Get snippet name from command arguments
const args = process.argv.slice(2);
const snippetName = args[0];

if (!snippetName) {
  console.error('Please provide a snippet name');
  process.exit(1);
}

// Convert snippet name to kebab case for files and BEM class
const kebabCase = `custom-${snippetName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;

// Liquid snippet template
const liquidTemplate = `{{ 'snippet-${kebabCase}.css' | asset_url | stylesheet_tag }}

{% comment %}
------------------------------------------------------------------------------
  Snippet: ${snippetName}
  - Add snippet description here
------------------------------------------------------------------------------
{% endcomment %}

<div class="${kebabCase}">
  {{ content }}
</div>`;

// SCSS template
const scssTemplate = `.${kebabCase} {
  &__title {
    margin-bottom: 2rem;
  }

  &__content {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 750px) {
    &__title {
      margin-bottom: 3rem;
    }

    &__content {
      margin-bottom: 3rem;
    }
  }
}`;

// Create directories if they don't exist
const snippetsDir = path.join(process.cwd(), 'snippets');
const stylesDir = path.join(process.cwd(), 'src/snippets');

fs.mkdirSync(snippetsDir, { recursive: true });
fs.mkdirSync(stylesDir, { recursive: true });

// Create snippet file
fs.writeFileSync(path.join(snippetsDir, `${kebabCase}.liquid`), liquidTemplate);

// Create SCSS file
fs.writeFileSync(path.join(stylesDir, `_${kebabCase}.scss`), scssTemplate);

console.log(`✨ Created snippet: ${snippetName}`);
console.log(`📁 snippets/${kebabCase}.liquid`);
console.log(`📁 src/snippets/_${kebabCase}.scss`);
