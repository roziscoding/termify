const SpotifyWebApi = require('spotify-web-api-node')
const { log } = require('coloredlog')
const getToken = async () => {
  const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }

  const api = new SpotifyWebApi(credentials)

  const data = await api.clientCredentialsGrant()
  return data.body.access_token
}

const getInstance = async () => {
  const api = new SpotifyWebApi()
  const token = await getToken()
  api.setAccessToken(token)
  return api
}

module.exports = { getInstance }