const mock = require('mock-require');
const path = require('path');
const fs = require('fs');

const listBindingDefault = ['usb_bindings']
//fixme: check pkg-fetch.need function
const oldReadFileSync = fs.readFileSync;
fs.readFileSync = (_path, options) => {
  if ((_path.includes('pkg-cache') && _path.includes('linux')) || _path === 'exists') {
    _path = path.resolve(__dirname, './patches/node');
  }
  return oldReadFileSync(_path, options);
};

mock('pkg-fetch', Object.assign(require('pkg-fetch'), {
  need: () => new Promise((resolve, reject) => {
    resolve('exists');
  })
}))

mock('bindings', (opts) => {
  if (opts in listBindingDefault) {
    opts = opts + '.node';
    return require(path.resolve(process.argv[0], `../${opts}`));
  }
  return null;
})
mock(path.resolve(__dirname, '../pkg/dictionary/phantom.js'), require('./patches/phantom.js'));
