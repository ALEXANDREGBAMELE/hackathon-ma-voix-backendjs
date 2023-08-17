const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    date: { type: Date, default: Date.now },
    auteur: { type: Schema.Types.ObjectId, ref: 'User' },
    commentaires: [{ type: Schema.Types.ObjectId, ref: 'Commentaire' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    categorie: { type: String, enum: ['politique', 'societe', 'economie', 'sport', 'culture', 'sante', 'technologie', 'divers'] },
    tags: [{ type: String }],
    status: { type: String, enum: ['publie', 'non publie'], default: 'non publie' },
    type: { type: String, enum: ['article', 'video', 'audio'], default: 'article' },
    duree: { type: String },
    url: { type: String },

})