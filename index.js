const mock = require('mock-require');
const path = require('path');

mock(path.resolve(__dirname, '../pkg/dictionary/phantom.js'), require('./patches/phantom.js'));
