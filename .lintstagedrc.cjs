module.exports = {
  'packages/**!(*node_nodules)/*.js': [
    'prettier --write .',
    'eslint packages/** --fix',
  ],
}
