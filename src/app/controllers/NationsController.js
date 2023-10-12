
const { mutipleMongooseToObject } = require('../../util/mongoose');
const Token = require('../../config/db/config');
var jwt = require('jsonwebtoken');
const Nations = require('../models/nations');
class nationsController {
    index(req, res, next) {
        try {
            Nations.find({})
                .then((nations => {
                    res.render('view/nation',
                        {
                            movie: mutipleMongooseToObject(nations),

                        })
                }
                ))
                .catch(next)
        } catch (err) {
            res.render('view/home',
                {
                })

        }
    }
    post(req, res, next) {
        try {
            const { name, description } = req.body
         
            if (!description) {
                Nations.find({})
                    .then((nations => {
                        res.render('view/nation',
                            {
                                movie: mutipleMongooseToObject(nations),

                                errorDescription: `Description cannot be empty `
                            })
                    }
                    ))

            } else {

                Nations.findOne({ name: name })
                    .then((nations => {

                        if (nations) {

                            Nations.find({})
                                .then((nations => {
                                    res.render('view/nation',
                                        {
                                            movie: mutipleMongooseToObject(nations),
                                            input:req.body,
                                            errorMessage: `${name} name is already on the board`
                                        })
                                }
                                ))
                                .catch(next)
                            // res.redirect("back");
                        } else {
                            const nation = new Nations(req.body);
                            nation.save()
                                .then(() => {
                                    res.redirect("/nations");
                                })
                                .catch(next);
                        }

                    }
                    ))
                    .catch(next)
            }

        } catch (err) {
            res.render('view/home')

        }
    }

    put(req, res, next) {
        try {
            const { name, description } = req.body
            if (!description) {
                Nations.find({})
                    .then((nations => {
                        res.render('view/nation',
                            {
                                movie: mutipleMongooseToObject(nations),
                                errorPutDescription: `Description cannot be empty `,
                                input:req.body
                            })
                    }
                    ))

            } else {

                Nations.findOne({ name: name })
                    .then((nations => {
                        if (nations) {
                            if (nations._id != req.params.id) {

                                Nations.find({})
                                    .then((nations => {
                                        res.render('view/nation',
                                            {
                                                movie: mutipleMongooseToObject(nations),
                                               
                                                errorPutName: `${name} name is already on the board`
                                            })
                                    }
                                    ))

                            } else {
                                Nations.findByIdAndUpdate(req.params.id,
                                    req.body)
                                    .then((movies => {
                                        res.redirect('/nations')
                                    }
                                    ))
                                    .catch(next)
                            }

                        } else {
                            Nations.findByIdAndUpdate(req.params.id,
                                req.body)
                                .then((movies => {
                                    res.redirect('/nations')
                                }
                                ))
                                .catch(next)
                        }

                    }
                    ))
                    .catch(next)
            }

        } catch (err) {
            res.render('view/home')

        }

    }

    delete(req, res, next) {
        Nations.findByIdAndDelete(req.params.id)
            .then((movies => {
                res.redirect('back')
            }
            ))
            .catch(next)
    }

}
module.exports = new nationsController;
