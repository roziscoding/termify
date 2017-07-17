const inq = require('inquirer')
const fs = require('fs')
const path = require('path')

const writeFile = (path, data) => new Promise((resolve, reject) => {
  fs.writeFile(path, data, err => {
    if (err) reject(err)
    else resolve()
  })
})

const createDotEnv = async credentials => {
  const data = [
    `CLIENT_ID=${credentials.id}`,
    `CLIENT_SECRET=${credentials.secret}`
  ]

  const content = data.join('\n')
  await writeFile('.env', content)
}

module.exports = async args => {

  const credentials = {
    id: args.options.id,
    secret: args.options.secret
  }

  const answers = await inq.prompt([{
    type: 'string',
    name: 'id',
    message: 'Client ID',
    required: true,
    when: !args.options.id
  }, {
    type: 'string',
    name: 'secret',
    message: 'Client Secret',
    required: true,
    when: !args.options.secret
  }])

  credentials.id = credentials.id || answers.id
  credentials.secret = credentials.secret || answers.secret

  await createDotEnv(credentials)
}