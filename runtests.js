var glob = require('glob')

console.log('running tests...')

let filter = false
if (process.argv.length === 3) {
  filter = process.argv[2]
  console.log('filtering filenames by:', filter)
}

glob('src/**/*.test.js', (err, files) => {
  let testsRan = 0

  files.forEach((testJs) => {
    let runTest = true
    if (filter && !testJs.toLowerCase().includes(filter.toLowerCase())) {
      runTest = false
    }

    if (runTest) {
      console.log('running tests:', testJs)
      require('./' + testJs)
      testsRan++
    }
  })

  if (testsRan < 1) {
    console.log('*error* no matching tests found')
    process.exit(1)
  } else {
    console.log('*OK* all tests passed')
  }
})
