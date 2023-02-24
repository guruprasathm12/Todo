let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    jwt = require("jsonwebtoken");
let userSchema = require('../model/Users');
router.route('/add-user').post((req, res, next) => {
    userSchema.exists({ usr: req.body.usr }, function(err, doc) {
        if (err) {
            // console.log(err)
        } else {
            console.log(doc);
            if (doc != null) {
                console.log("here");
                res.status(500).json({ "msg": "failed" })

            } else {
                userSchema.create(req.body, (error, data) => {
                    if (error) {
                        throw error;
                    } else {
                        console.log(data)
                        res.json(data)
                    }
                })

            }
        }
    });

});


// router.route('/').get((req, res) => {
//         todoSchema.find((error, data) => {
//             if (error) {
//                 return next(error)
//             } else {
//                 res.json(data)
//             }
//         })
//     })



router.route('/login').post((req, res, next) => {
    userSchema.findOne({ "usr": req.body.usr, "pwd": req.body.pwd }, (error, data) => {
        if (error) {
            console.log(error);
            throw error;
            // console.log();
            // console.log(error);
            // return next(error)
        } else {
            console.log("inside " + data);
            // if (data) {
            if (data) {
                let id = data._id.toString();
                console.log(process.env.ACCESS_TOKEN);
                let token = jwt.sign({ "id": id }, process.env.ACCESS_TOKEN)
                console.log(token)
                res.json({ "token": token })
            } else {
                res.json({ "token": "null" });
            }
            // } else {
            //     res.send.statusCode(200)
            // }
        }
    })
})

module.exports = router;