import { NextFunction, Request, Response, Router } from 'express'
import { PlaylistInterface } from '../db/models/Playlist'
import Playlist from '../db/schemas/playlistSchema'
import playlistService from '../services/playlistService'
import userService from '../services/userService'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../db/schemas/userSchema'

const router: Router = Router()

//create a new playlist (empty)
router.post('/createplaylist', async (req: Request, res: Response) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token || !process.env.TOKEN_KEY) return

    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_KEY as string
    ) as JwtPayload

    const currentUser = await User.findById(decoded._id)
    if (!currentUser) {
      return
    }

    const newPlaylist = await playlistService.createNewPlaylist(
      req.body as PlaylistInterface,
      currentUser
    )
    if (newPlaylist) {
      currentUser.playlists.push(newPlaylist)
      currentUser.save()
    }

    res.sendStatus(200)
  } catch (error: any) {
    res.sendStatus(500).json(error.message)
  }
})
//get all playlists by user
router.get('/getallplaylists', async (req: Request, res: Response) => {
  try {
    const token = req.cookies.loggedIn
    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_KEY as string
    ) as JwtPayload

    const doc = await Playlist.find({ user: decoded })
    console.log(doc)

    res.send(doc)
  } catch (error: any) {
    res.sendStatus(500).json(error.message)
  }
})

//get specific playlist by name
router.get('/getplaylist/:name', (req: Request, res: Response) => {
  let paramName = req.params.name

  Playlist.findOne(
    { playlist_name: paramName },
    function (err: any, docs: any) {
      if (err) {
        res.send(err.message)
      } else {
        res.send(docs)
      }
    }
  )
})
//delete a specific playlist
router.delete('/deleteplaylist/:id', async (req: Request, res: Response) => {
  res.send(req.params)
})

//update a specific playlist
router.put('/playlist/update/:id', async (req: Request, res: Response) => {
  //hämta listan med id
  res.json(req.body)
})

export = router

//get, save, update, delete, create
