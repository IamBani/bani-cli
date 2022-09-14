'use strict';

const pkgDir = require('pkg-dir');

const { Packages } = require("@bani-cli/package")

const SETTINGS = {
  create:'@bani-cli/create'
}
module.exports = create;

function create (name, options) {
  const optionValues = arguments[2]?.parent?._optionValues
  let targetPath = optionValues?.targetPath
  const homePath = process.env.cliHome
  const createName = arguments[2]?.name()
  const packageName = SETTINGS[createName]
  if (!targetPath) {
    targetPath = ""
  }
  const pgk = new Packages({
    targetPath,
    homePath,
    packageName,
    packageVersion:'latest'
  })
  console.log(pgk);
}
