'use strict';

const axios = require("axios")
const semver = require('semver')
const urlJoin = require('url-join')

function getNpmInfo(npmName, registry) {
    if (!npmName) {
        return null
    }
    let registryUrl = registry || getRegistry()
    const npmUrlJoin = urlJoin(registryUrl, npmName)
    return axios.get(npmUrlJoin).then(res => {
        console.log(res.data)
        if (res.status === 200) {
            return res.data
        }
    }).catch(err => {
        Promise.reject(err)
    })
    
}

function getRegistry(isDriginal = false) {
    return isDriginal?'https://registry.npmjs.org':'https://registry.npm.taobao.org'
}

module.exports = { getNpmInfo };
