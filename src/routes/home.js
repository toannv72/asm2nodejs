const express = require('express')
const routerHome = express.Router()
const HomeController = require('../app/controllers/HomeController') 

routerHome.get('/', HomeController.show)

module.exports = routerHome