var glob = require('glob')

glob('src/**/*.test.js', (err, files) => {
  files.forEach((testJs) => require('./' + testJs))
})
