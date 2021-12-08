const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQCdSda03f1-7SHowm5Dpa8ns9xWZP_c_12ocO4cDgTHvtsT1NJ-8j07McDB_c9wp2Fu0m2altIXjKDRtouV-eSVPSqyc8uWtdvYcXEji1TAvBa9DmcLqTiYBJZVgCXxxgU2tEPQN0anldTGQWQDcta_-I2TU6_PQgHCEZn55b2FRIe0T6yTP7LnORMTffyhYUVvAuMg4bJOHjsJpoxzY0z8O_Ufda9PAgLD7COkTNXkK5c-5GpYaoWOOmu4zo0-dgRj00CaY0_BJEkwIp9J3wwPQ3U3yIhCFiJsHJEkGikoAxW4u0jM";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 10,
    fields: 'items'
  })

  console.log('The playlist contains these tracks', data.body);
  console.log('The playlist contains these tracks: ', data.body.items[0].track);
  console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData();