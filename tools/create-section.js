const fs = require('fs');
const path = require('path');

// Get section name from command arguments
const args = process.argv.slice(2);
const sectionName = args[0];

if (!sectionName) {
  console.error('Please provide a section name');
  process.exit(1);
}

// Convert section name to kebab case for files and BEM class
const kebabCase = `custom-${sectionName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;

// Liquid section template
const liquidTemplate = `{{ 'section-${kebabCase}.css' | asset_url | stylesheet_tag }}

{% comment %}
------------------------------------------------------------------------------
  Section: ${sectionName}
  - Add section description here
------------------------------------------------------------------------------
{% endcomment %}

{%- style -%}
  .section-{{ section.id }} {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }} {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}

<div class="section-{{ section.id }} ${kebabCase}">
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

// Create section file
fs.writeFileSync(path.join(process.cwd(), 'sections', `${kebabCase}.liquid`), liquidTemplate);

// Create SCSS file
fs.writeFileSync(path.join(process.cwd(), 'src/sections', `_${kebabCase}.scss`), scssTemplate);

console.log(`✨ Created section: ${sectionName}`);
console.log(`📁 sections/${kebabCase}.liquid`);
console.log(`📁 src/sections/_${kebabCase}.scss`);
