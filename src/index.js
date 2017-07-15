#!/usr/bin/env node
const resultsMapper = require('./resultsMapper')
const { error, info } = require('coloredlog')
const argv = require('argv')
const options = require('./options')
const args = argv.option(options).run()
const selector = require('./selector')
const spotify = require('./spotify')
const { copy } = require('copy-paste')
const run = async () => {
  let api
  try {
    api = await spotify.getInstance()
  } catch (err) {
    error(`Erro ao conectar com a API: ${err.message}`)
  }

  const results = await api.searchTracks(args.options.query)
  const data = resultsMapper.map(results)

  const choice = await selector.select(data)
  const track = data[choice.artist][choice.song.match(/(\d*).*/)[1]]
  const URI = copy(track.uri)
  info(URI)
}

run()