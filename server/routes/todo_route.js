let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
var jwt = require("jsonwebtoken")
let todoSchema = require('../model/Todo');
router.route('/add-todo').post(jwt_add, (req, res, next) => {
    todoSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            // console.log(data)
            res.json(data)
        }
    })
});

function jwt_add(req, res, next) {
    let verify = jwt.verify(req.body.usr_id, process.env.ACCESS_TOKEN);
    if (verify) {
        req.body.usr_id = verify.id;
        console.log(req.body.usr);
    } else {
        res.send();
    }
    next();
}


// router.route('/').get((req, res) => {
//         todoSchema.find((error, data) => {
//             if (error) {
//                 return next(error)
//             } else {
//                 res.json(data)
//             }
//         })
//     })
// Get Single Student
router.route('/get-todo/:id').get(jwt_get, (req, res) => {
    todoSchema.find({ usr_id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

function jwt_get(req, res, next) {
    let verify = jwt.verify(req.params.id, process.env.ACCESS_TOKEN);
    if (verify) {
        req.params.id = verify.id;
        console.log(req.params.id);
    } else {
        res.send();
    }
    next();
}

router.route('/update-todo/:id').put((req, res, next) => {
    todoSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('todo updated successfully !')
        }
    })
})
router.route('/delete-todo/:id').delete((req, res, next) => {
    todoSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
module.exports = router;