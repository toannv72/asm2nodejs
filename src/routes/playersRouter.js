const express = require('express')
const PlayersController = require('../app/controllers/PlayersController')
const playersRouter = express.Router()

playersRouter
    .route("/:id")
    .put(PlayersController.put)
    .delete(PlayersController.delete)

playersRouter
    .route("/")
    .post(PlayersController.post)
    .get(PlayersController.index)


module.exports = playersRouter