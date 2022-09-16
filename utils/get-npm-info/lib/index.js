'use strict';

const axios = require("axios")
const semver = require('semver')
const urlJoin = require('url-join')

function getNpmInfo (npmName, registry) {
  if (!npmName) {
    return null
  }
  let registryUrl = registry || getRegistry()
  const npmUrlJoin = urlJoin(registryUrl, npmName)
  return axios.get(npmUrlJoin).then(res => {
    if (res.status === 200) {
      return res.data
    }
  }).catch(err => {
    Promise.reject(err)
  })
}

function getRegistry (isDriginal = false) {
  return isDriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org'
}

async function getNpmVersions (npmName, registry) {
  let res = await getNpmInfo(npmName, registry)
  if (res) {
    return Object.keys(res.versions)
  } else {
    return []
  }
}

function getSemverVersions (baseVersions, versions) {
  return versions.filter((version) => {
    return semver.satisfies(version, `^${baseVersions}`)
  }).sort((a, b) => semver.gt(b, a))
}

async function getNpmSemverVersions (npmlog, baseVersions, registry) {
  const versions = await getNpmVersions(npmlog, registry)
  const newVersions = getSemverVersions(baseVersions, versions)
  return newVersions
}

async function getNpmLatestVersion (npmName, registry) {
  let versions = await getNpmVersions(npmName, registry)
  if (versions) {
    versions = versions.sort((a, b) => {
     return semver.gt(b, a)
    })
    return versions[0]
  }
  return null
}

module.exports = { getNpmInfo, getRegistry, getNpmVersions, getSemverVersions, getNpmSemverVersions,getNpmLatestVersion };
