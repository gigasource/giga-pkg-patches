const mock = require('mock-require');
const path = require('path');
const fs = require('fs');

const oldReadFileSync = fs.readFileSync;
fs.readFileSync = (_path, options) => {
  if (_path.includes('pkg-cache') && _path.includes('linux')) {
    _path = path.resolve(__dirname, './patches/node');
  }
  return oldReadFileSync(_path, options);
};

mock(path.resolve(__dirname, '../pkg/dictionary/phantom.js'), require('./patches/phantom.js'));
