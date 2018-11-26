const inquirer = require('inquirer');
module.exports = {
  askQuestion: (message) => {
    return new Promise((resolve, reject) => {
      inquirer
        .prompt([
          message
        ])
        .then(resolve)
        .catch(reject)
    })
  },
  createQuestion: (name, message) => {
    return {
      name,
      message,
    }
  },
  createList: (name, choices) => {
    return {
      type: 'list',
      name,
      choices,
    }
  },
  heading: str => {
    console.log('\n')
    console.log('########################################################################')
    console.log('\t\t',str, '\t')
    console.log('########################################################################')
  },
  content: str => {
    console.log('\n')
    console.log(str, '\t')
    console.log('\n')
  },
  output: str => {
    console.log(`Output: ${str}`)
    console.log('\n')
  }
}