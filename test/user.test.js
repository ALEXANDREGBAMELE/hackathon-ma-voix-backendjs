const request = require('supertest');
const User = require('../models/User');

let server
const valideUser = { nom: 'John Doe', email: 'johnn@example.com', motDePasse: "0545540514", numCni: "admisn" };

describe("User test", () => {
    beforeAll(() => {
        server = require('../index')
    })

    afterAll(async() => {
        await User.deleteMany()
        await server.close()
    })
    describe('create user', () => {
        it('devrait créer un nouvel utilisateur avec succès', async() => {
            const response = await request(server).post('/api/v1/register').send(valideUser);

            expect(response.status).toBe(200); // Vérifie que le statut de la réponse est 201 (Créé)
            expect(response.body).toHaveProperty('token'); // Vérifie que la réponse contient une propriété 'id'
            expect(response.body).toHaveProperty('data'); // Vérifie que la réponse contient une propriété 'id'
            expect(response.body.data.nom).toBe(valideUser.nom); // Vérifie que le nom de l'utilisateur est correct
            expect(response.body.data.email).toBe(valideUser.email); // Vérifie que l'e-mail de l'utilisateur est correct
        }, 20000);

        it('devrait renvoyer une erreur si les informations sont incomplètes', async() => {
            const incompleteUser = { nom: 'Jane Doe' };

            const response = await request(server).post('/api/v1/register').send(incompleteUser);

            expect(response.status).toBe(400); // Vérifie que le statut de la réponse est 400 (Mauvaise requête)
            expect(response.body).toHaveProperty('messageDerreur'); // Vérifie que la réponse contient une propriété 'error'
        }, 20000);
    })

    describe('login user', () => {
        it('devrait se connecter avec succès', async() => {
            const user = { email: valideUser.email, motDePasse: valideUser.motDePasse }
            const response = await request(server).post('/api/v1/login').send(user)
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('token')
            expect(response.body).toHaveProperty('data')
            expect(response.body.data.email).toBe(user.email)

        }, 20000)
        it('devrait renvoyer une erreur si les informations sont incomplètes', async() => {
            const incompleteUser = {}
            const response = await request(server).post('/api/v1/login').send(incompleteUser)
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('messageDerreur')
            expect(response.body.messageDerreur).toBe("veuillez rempli les champs correctement")
        }, 20000)
        it('devrait renvoyer une erreur si l\'utilisateur n\'existe pas', async() => {
            const user = { email: "seege@dhej", motDePasse: "0545540514" }
            const response = await request(server).post('/api/v1/login').send(user)
            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('messageDerreur')
            expect(response.body.messageDerreur).toBe("l'utilisateur n'existe pas")
        }, 20000)
        it('devrait renvoyer une erreur si le mot de passe est incorrect', async() => {
            const user = { email: valideUser.email, motDePasse: "0545540513" }
            const response = await request(server).post('/api/v1/login').send(user)
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('messageDerreur')
            expect(response.body.messageDerreur).toBe("mot de passe incorrect")
        }, 20000)

    })
})