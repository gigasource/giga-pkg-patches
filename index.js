const mock = require('mock-require');
const path = require('path');
const fs = require('fs');
//Test
const listBindingDefault = ['usb_bindings']
//fixme: check pkg-fetch.need function
const oldReadFileSync = fs.readFileSync;
fs.readFileSync = (_path, options) => {
  if ((_path.includes('pkg-cache') && _path.includes('linux')) || _path === 'exists') {
    _path = path.resolve(__dirname, './patches/node');
  } else if (_path.includes('prelude/bootstrap')) {
    _path = path.resolve(__dirname, './patches/pkg-bootstrap.js');
  }
  return oldReadFileSync(_path, options);
};

const refiner = require('pkg/lib-es5/refiner.js');
mock('pkg/lib-es5/refiner.js', function () {
  const result = refiner.default(...arguments);
  const records = result.records;
  const newRecords = {};
  for (const file in records) {
    let _file = file.split('/');
    _file.shift();
    _file.shift();
    _file.unshift('root');
    newRecords['/' + _file.join('/')] = records[file];
  }
  let _entrypoint = result.entrypoint.split('/');
  _entrypoint.shift();
  _entrypoint.shift();
  _entrypoint.unshift('root');
  return Object.assign(result, {records: newRecords, entrypoint: '/' + _entrypoint.join('/')});
})

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

mock('pkg/lib-es5/producer.js', require('./patches/pkg-producer.js'));
mock('pkg/lib-es5/packer.js', require('./patches/pkg-packer.js'));
