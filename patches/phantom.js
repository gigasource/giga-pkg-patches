'use strict';

module.exports = {
  pkg: {
    patches: {
      'dist/phantom.js': [
        '`\$\{__dirname\}/shim/index.js`',
        '_path.resolve(process.argv[0], \'../shim/index.js\')'
      ]
    },
    deployFiles: [
      [ 'lib/shim/index.js', 'phantom/index.js' ],
      [ 'lib/shim/function_bind_polyfill.js', 'phantom/function_bind_polyfill.js' ]
    ]
  }
};
