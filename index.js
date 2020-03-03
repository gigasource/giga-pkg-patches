const mock = require('mock-require');
const path = require('path');

mock(path.resolve(__dirname, '../pkg/dictonary/phantom.js'), './patches/phantom.js');
