module.exports = {
  'packages/**/*.js': ['prettier --write .'],
  '*.js': 'eslint packages/** --fix',
}
