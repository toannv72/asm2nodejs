
const { mutipleMongooseToObject } = require('../../util/mongoose');

const Players = require('../models/Players');
const clubData = [{
    id: 1,
    name: "Barcelona",
},
{
    id: 2,
    name: "Real Madrid",
},
{
    id: 3,
    name: "Manchester United",
},
{
    id: 4,
    name: "Manchester City",
},
{
    id: 5,
    name: "Chelsea",
},
{
    id: 6,
    name: "Arsenal",
},
{
    id: 7,
    name: "Liverpool",
},
];
const positions = [{
    id: 1,
    name: "Goalkeeper",
},
{
    id: 2,
    name: "Defender",
},
{
    id: 3,
    name: "Midfiedler",
},
{
    id: 4,
    name: "Foward",
},
];
class playersController {
    index(req, res, next) {
        try {
            Players.find({})
                .then((nations => {
                    res.render('view/players',
                        {
                            movie: mutipleMongooseToObject(nations),
                            clubList: clubData,
                            positionList: positions,
                        })
                }
                ))
                .catch(next)
        } catch (err) {
            res.render('view/home')
        }
    }
    post(req, res, next) {
        try {
            const { name, description } = req.body
            console.log(1111111, req.body);

            Players.findOne({ name: name })
                .then((players => {
                    if (players) {
                        Players.find({})
                            .then((players => {
                                res.render('view/players',
                                    {
                                        movie: mutipleMongooseToObject(players),
                                        clubList: clubData,
                                        positionList: positions,
                                        errorMessageName: `${name} name is already on the board`
                                    })
                            }
                            ))
                            .catch(next)
                        // res.redirect("back");
                    } else {
                        const players = new Players(req.body);
                        players.save()
                            .then(() => {
                                res.redirect("/players");
                            })
                            .catch(next);
                    }

                }
                ))
                .catch(next)

        } catch (err) {
            res.render('view/home')
        }
    }

    put(req, res, next) {
        try {
            const { name } = req.body
            Players.findOne({ name: name })
                .then((nations => {
                    if (nations) {
                        if (nations._id != req.params.id) {
                            Players.find({})
                                .then((nations => {
                                    res.render('view/players',
                                        {
                                            movie: mutipleMongooseToObject(nations),
                                            clubList: clubData,
                                            positionList: positions,
                                            errorPutName: `${name} name is already on the board`
                                        })
                                }
                                ))
                        } else {
                            Players.findByIdAndUpdate(req.params.id, req.body)
                                .then((movies => {
                                    res.redirect('/players')
                                }
                                ))
                                .catch(next)
                        }
                    } else {
                        Players.findByIdAndUpdate(req.params.id, req.body)
                            .then((movies => {
                                res.redirect('/players')
                            }
                            ))
                            .catch(next)
                    }
                }
                ))
                .catch(next)

        } catch (err) {
            res.render('view/home')

        }

    }

    delete(req, res, next) {
        Players.findByIdAndDelete(req.params.id)
            .then((movies => {
                res.redirect('back')
            }
            ))
            .catch(next)
    }

}
module.exports = new playersController;
