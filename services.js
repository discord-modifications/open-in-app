module.exports = [
   {
      name: 'Steam',
      links: ['store.steampowered.com', 'steamcommunity.com', 'help.steampowered.com'],
      replace: (url) => `steam://openurl/${url}`
   },
   {
      name: 'Tidal',
      links: ['listen.tidal.com', 'tidal.com'],
      replace: (url) => `tidal://${url}`
   },
   {
      name: 'Spotify',
      links: ['open.spotify.com'],
      replace: (url) => `spotify:${url}`
   }
]