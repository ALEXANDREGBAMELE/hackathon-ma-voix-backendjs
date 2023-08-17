const monngoose = require('mongoose')
const { Schema, model } = monngoose
const userSchema = new Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    numCni: { type: String, unique: true },
    numcarteElec: { type: String, unique: true },
    roles: [{ type: String, enum: ['candidat', 'electeur', 'admin'] }],
})

const User = model("User", userSchema);
module.exports = User