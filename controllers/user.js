const dotenv = require('dotenv').config();
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const { hashData, verifyHashedData } = require('../utils/util')
const { SECRET_KEY } = process.env


function generateAuthToken(data) {
    const token = jwt.sign({...data }, SECRET_KEY, { expiresIn: '10h' })
    return token
}
const createUser = async(req, res) => {
    try {
        const { nom, email, motDePasse, numCni } = req.body
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "un utilisateur existe deja avec ce mail" })
        }
        if (!nom || !email || !motDePasse || !numCni) {
            console.log("veuillez rempli les champs correctement");

            return res.status(400).json({ messageDerreur: "veuillez rempli les champs correctement" })
        }
        req.body.motDePasse = await hashData(motDePasse)
        const newUser = new User(req.body)
        await newUser.save()
        const token = generateAuthToken(newUser);
        const option = { expires: new Date(Date.now() + 60 * 60 * 10), httpOnly: true }
        return res.cookie("token", token, option).json({
            success: true,
            status: 200,
            message: "utilisateur crée avec succes",
            data: newUser,
            token
        })
    } catch (error) {
        console.log("erreur lors de la creation de l'utilisateur", error.message);

        res.status(500).json({ message: error.message })
    }

}

const login = async(req, res) => {
    try {
        const { email, motDePasse } = req.body
        if (!email || !motDePasse) {
            return res.status(400).json({ messageDerreur: "veuillez rempli les champs correctement" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ messageDerreur: "l'utilisateur n'existe pas" })
        }
        const matchPassword = await verifyHashedData(motDePasse, user.motDePasse)
        if (!matchPassword) {
            return res.status(401).json({ messageDerreur: "mot de passe incorrect" })
        }
        const token = generateAuthToken(user)
        const option = { expires: new Date(Date.now() + 60 * 60 * 10), httpOnly: true }
        return res.cookie("token", token, option).json({
            success: true,
            status: 200,
            message: "user logged in successfully",
            data: user,
            token
        })
    } catch (error) {
        console.log("erreur lors de la connexion de l'utilisateur", error.message);

        res.status(500).json({ messageDerreur: error.message })

    }
}

module.exports = {
    createUser,
    login
}