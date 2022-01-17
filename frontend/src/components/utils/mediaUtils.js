
//Find and returns the thumbnail URL from passed object.
export function getThumbnailUrl(songObj) {

  //Taking last index because extern API returns the best quality image at last index.
  const last = songObj.thumbnails?.length - 1

  if (songObj.thumbnails?.url) {
    return songObj.thumbnails?.url
  }
  else if (songObj?.thumbnails[last].url) {
    return songObj?.thumbnails[last].url
  }
}

export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}