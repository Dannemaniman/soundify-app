import { toast } from "react-toastify"

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

export function populateLocalStorage(key, data) {
  const myStorage = window.localStorage
  try {
    myStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
  }
}

export function getDataLocalStorage(key) {
  const myStorage = window.localStorage
  try {
    return JSON.parse(myStorage.getItem(key))
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
  }
}

export function removeNullFromArray(arr) {
  return arr.filter((ele) => {
    return ele !== null
  })
}