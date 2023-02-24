let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
require("dotenv").config();
const todoRoute = require('./routes/todo_route');
const userRoute = require('./routes/user_routes');
mongoose
    .connect('mongodb+srv://root:root@cluster0.oqqvpgu.mongodb.net/stud?retryWrites=true&w=majority')
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err.reason)
    })
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/todo', todoRoute)
app.use('/users', userRoute)
const server = app.listen(4000, () => {
    console.log('Connected to port ' + 4000)
})
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});