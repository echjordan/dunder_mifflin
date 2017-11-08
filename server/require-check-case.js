const {Module} = require('module')
const {_resolveFilename} = Module
const exec = require('child_process').execSync
const chalk = require('chalk')

Module._resolveFilename = function(parent, ...args) {
  const result = _resolveFilename(parent, ...args)

  if (result.match(/^[a-z\-]+$/) ||  // builtin
      parent && parent.filename && parent.filename.match(/node_modules/) || // parent is a node_module
      result.match(/node_modules/)) // result was a node module
      return result

  // Check to see if the file is in git
  try {
    exec(`git ls-files --error-unmatch "${result}"`)
  } catch(x) {
    console.log(chalk.yellow(`Failed to find ${result} in git from module ${parent && parent.filename}`))
  }
  return result
}
