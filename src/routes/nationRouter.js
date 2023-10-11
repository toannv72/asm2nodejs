const express = require('express')
const NationsController = require('../app/controllers/NationsController')
const nationRouter = express.Router()

nationRouter
    .route("/:id")
    .put(NationsController.put)
    .delete(NationsController.delete)

nationRouter
    .route("/")
    .post(NationsController.post)
    .get(NationsController.index)


module.exports = nationRouter