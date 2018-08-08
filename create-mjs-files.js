const copy = require('copy');
const replace = require('replace-in-file');

const copyOptions = {
  ext: 'mjs',
  overwrite: true
};

// Copy relevant .js files and rename their extensions to .mjs
copy.each(['src/reverse-iterable-map.js', 'test/tests.js'], '.', copyOptions, error => {
  if (error) {
    console.error('copy error:', error);
  }

  updateImports();
});

const replaceOptions = {
  files: 'test/tests.mjs',
  // Match import lines with .js extensions
  from: /^(import.*)\.js/gm,
  // And replace the .js extensions with .mjs
  to: (match, p1) => `${p1}.mjs`
};

function updateImports() {
  // Update the import statements to reference *.mjs instead of *.js files
  replace(replaceOptions)
    .catch(error => {
      console.error('replace-in-file error:', error);
    });
}
