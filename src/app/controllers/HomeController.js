
const { mutipleMongooseToObject } = require('../../util/mongoose');
const Token = require('../../config/db/config');
var jwt = require('jsonwebtoken');
const Players = require('../models/Players');
class homeControllers {


    show(req, res) {

        Players.find({})
            .then((players => {
                console.log(players);
                res.render('view/home',
                    {
                        players: mutipleMongooseToObject(players),

                    })
            }
            ))



    }
}
module.exports = new homeControllers;
