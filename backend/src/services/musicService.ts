import Album from '../db/models/Album'
import Artist from '../db/models/Artist'
import Song from '../db/models/Song'


export const saveSong = async (song: Song) => {

}

export const deleteSong = async (song: Song) => {

}


export const saveAlbum = async (album: Album) => {

}

export const saveArtist = async (artist: Artist) => {

}

export const getSong = async (id: number) => {
  return await Song.findOne({ id })
}

export const getArtist = async (id: number) => {

}

export const getAlbum = async (id: number) => {

}

const musicService = {
  saveSong,
  deleteSong,
  saveAlbum,
  saveArtist,
  getSong,
  getArtist,
  getAlbum
}

export default musicService


