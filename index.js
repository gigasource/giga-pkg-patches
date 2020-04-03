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

mock('usb', require(path.resolve(process.argv[0], '../usb.node')));
mock('serialport', require(path.resolve(process.argv[0], '../serialport.node')));
mock(path.resolve(__dirname, '../pkg/dictionary/phantom.js'), require('./patches/phantom.js'));
