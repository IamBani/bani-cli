const exp = ['packages/**/*']

module.exports = {
  'packages/**/*.{js,jsx,ts,tsx}': ['prettier --write .', 'eslint  --fix'],
  '.md': ['prettier --write .'],
}
