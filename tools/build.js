const sass = require('sass');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chokidar = require('chokidar');

const args = process.argv.slice(2);
const mode = args.find(arg => arg.startsWith('--mode='))?.split('=')[1] || 'development';
const watch = args.includes('--watch');
const isBaseline = args.includes('--baseline');

function compileSass(file) {
  const outputStyle = mode === 'production' ? 'compressed' : 'expanded';
  const result = sass.compile(file, {
    outputStyle,
    loadPaths: [
      path.join(process.cwd(), 'src/styles'),
      isBaseline ? path.join(process.cwd(), 'baseline/styles') : null
    ].filter(Boolean)
  });

  const relativePath = path.relative('src', file);
  const outputPath = path.join(process.cwd(), relativePath.replace('.scss', '.css').replace('_', ''));

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, result.css);

  console.log(`✨ Compiled: ${relativePath} → ${path.relative(process.cwd(), outputPath)}`);
}

function build() {
  const pattern = isBaseline ? 'src/**/*.scss' : 'src/styles/**/*.scss';
  const files = glob.sync(pattern);
  files.forEach(compileSass);
}

if (watch) {
  const pattern = isBaseline ? 'src/**/*.scss' : 'src/styles/**/*.scss';
  chokidar.watch(pattern).on('change', compileSass);
  console.log(`👀 Watching for changes... (${isBaseline ? 'baseline' : 'theme'} mode)`);
} else {
  build();
}
