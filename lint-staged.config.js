const exp = ['commands', 'core', 'module', 'utils']


module.exports = {
    [`{${exp.toString()}}.{js,jsx,ts,tsx}`]: ["prettier --write .", "eslint  --fix"],
    "*.md": ["prettier --write"]
}