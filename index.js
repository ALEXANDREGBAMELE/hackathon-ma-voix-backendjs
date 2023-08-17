const cookieParser = require('cookie-parser')
const Express = require('express');
const dotenv = require('dotenv').config();
require('./config/Db');
const app = new Express();
const cors = require('cors');
const authRout = require('./routes/user');

//creer un serveur
const bodyParser = Express.json;
const port = process.env.PORT || 3000;

app.use(bodyParser());
app.use(cookieParser());
app.use(cors())

app.use('/api/v1', authRout)

app.get('/', function(req, res) {
    console.log(req.body);
    res.send('Hello World');
});
const server = app.listen(port, () => {
    console.log("Server is running on port " + port);
});
module.exports = server