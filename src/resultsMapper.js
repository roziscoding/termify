module.exports = {
  map(results) {
    const tracks = results.body.tracks.items
    return tracks.reduce((acc, track) => {
      const artists = track.artists.map(x => x.name).join(', ')
      if (!acc[artists]) acc[artists] = []
      acc[artists].push(track)
      return acc
    }, {})
  }
}