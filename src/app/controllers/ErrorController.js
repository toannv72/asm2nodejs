
const { mutipleMongooseToObject } = require('../../util/mongoose');

class errorController {
    index(req, res, next) {
        if (req.cookies.accessToken) {
            try {

                res.status(404).render('view/Error404',
                    {
                        login: true,
                    })
                // res.json(movies)



            } catch (err) {

                res.render('view/Error404')
            }
        } else {

            res.render('view/Error404')

        }

    }
}
module.exports = new errorController;
