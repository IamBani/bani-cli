'use strict';

const commands = require('../lib');
const assert = require('assert').strict;

assert.strictEqual(commands(), 'Hello from commands');
console.info("commands tests passed");
