const exp = ['packages/commands', 'packages/core', 'packages/module', 'packages/utils']


module.exports = {
    [`{${exp.toString()}}.{js,jsx,ts,tsx}`]: ["prettier --write .", "eslint  --fix"],
    ".md": ["prettier --write ."]
}