
const routerHome = require("./home");
const router404 = require("./Error404");
const nationRouter = require("./nationRouter");
const playersRouter = require("./playersRouter");

module.exports = function (app) {
  app.use('/players', playersRouter)
  app.use('/nations', nationRouter)
  app.use('/', routerHome)
  app.use('*', router404)
  
};