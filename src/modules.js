module.exports = {
  mod: 'setup',
  description: 'Configures termify with your spotify app ID and Secret',
  options: [{
    name: 'id', 
    short: 'i',
    type: 'string',
    description: 'Your Spotify API app Id',
    example: 'termify setup -i YOUR_CLIENT_ID'
  }, {
    name: 'secret',
    short: 's',
    type: 'string',
    description: 'Your Spotify API app secret',
    example: 'termify setup -s YOUR_CLIENT_SECRET'
  }]
}