export async function decodeImg(url) {
  console.log(url)
  const img = new Image()
  img.src = url
  return await img.decode()
}

export async function getThumbnail(ele) {

  //Taking last index because extern API returns the best quality image at last index.
  const last = ele.thumbnails?.length - 1

  if (ele.thumbnails?.url) {
    return await decodeImg(ele.thumbnails.url)
  }
  else if (ele?.thumbnails[last].url) {
    return await decodeImg(ele.thumbnails[last].url)
  }
}