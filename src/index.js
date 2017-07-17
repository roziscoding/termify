#!/usr/bin/env node
const { error, info } = require('coloredlog')
const open = require('open')
const inq = require('inquirer')
require('dotenv').config()

// Modules
const setup = require('./setup')
const selector = require('./selector')
const spotify = require('./spotify')
const resultsMapper = require('./resultsMapper')

// Arguments
const options = require('./options')
const modules = require('./modules')
const argv = require('argv').option(options).mod(modules)
const args = argv.run()

const getQuery = async () => {
  const answers = await inq.prompt([{
    type: 'string',
    name: 'query',
    message: 'Song title',
    required: true
  }])
  return answers.query
}

const run = async () => {
  let api

  try {
    api = await spotify.getInstance()
  } catch (err) {
    error(`Erro ao conectar com a API: ${err.message}`)
  }

  const query = args.options.query || await getQuery()

  const results = await api.searchTracks(query)
  const data = resultsMapper.map(results)

  const choice = await selector.select(data)
  const track = data[choice.artist][choice.song.match(/(\d*).*/)[1]]
  info('URI:')
  info(track.uri)
}

const main = async () => {
  if (args.mod === 'setup') {
    setup(args)
      .then(() => info('Config file created'))
  } else {
    const configOK = checkConfig()
    if (configOK) run()
    else error('API Credentials not set. Please, run termify setup')
  }
}

checkConfig = () => {
  const ok = !process.env.CLIENT_ID || !process.env.CLIENT_SECRET
  return !ok
}

main()