const inq = require('inquirer')

const select = data => {
  const artists = Object.keys(data)
  const questions = [{
    type: 'list',
    name: 'artist',
    choices: artists,
    message: 'Artista'
  }, {
    type: 'list',
    name: 'song',
    choices: answers => data[answers.artist].map((x, i) => `${i} - ${x.name}`),
    message: 'Música'
  }]
  return inq.prompt(questions)
}

module.exports = {
  select
}