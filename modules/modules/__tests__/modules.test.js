'use strict';

const modules = require('..');
const assert = require('assert').strict;

assert.strictEqual(modules(), 'Hello from modules');
console.info("modules tests passed");
