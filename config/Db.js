//conexion a la base de donnee mongoDB
const mongoose = require('mongoose')
const url = "mongodb://localhost:27017";
const { MONGO_URL } = process.env;


try {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("connecter a la BD"))
} catch (error) {
    console.log("erreur lors de la conection a la BD", error);

}