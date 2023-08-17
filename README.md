# Backend de l'Application de Participation Électorale

Bienvenue dans le backend de l'Application de Participation Électorale ! Notre backend fournit les fonctionnalités essentielles pour gérer la connexion et la création de comptes utilisateurs dans le contexte de notre projet de participation électorale.

## Aperçu

Notre backend est développé en utilisant Node.js et offre les services nécessaires pour la gestion des comptes utilisateurs. Les principales fonctionnalités incluent :

- **Inscription Utilisateur** : Permet aux utilisateurs de créer de nouveaux comptes en fournissant les informations nécessaires.

- **Connexion Utilisateur** : Offre la possibilité aux utilisateurs de se connecter à leurs comptes existants en utilisant leurs identifiants.

## Configuration

Avant de démarrer le backend, assurez-vous d'effectuer les étapes de configuration nécessaires :

1. **Installation des Dépendances** : Exécutez la commande suivante pour installer les dépendances nécessaires :

   ```sh
   npm install
    ```
2. **Configuration de la Base de Données** : Créez un fichier `.env` à la racine du projet et ajoutez les informations de connexion à votre base de données. Un exemple de fichier `.env` est fourni ci-dessous :
   ```sh	
   MONGO_URI=mongodb://localhost:27017/mavoix ou MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
    SECRET_KEY= <votre clé secret pour le hashage des données confidentiel>
    PORT=votre port d'écoute
    ```
3. **Démarrage du Backend** : Exécutez la commande suivante pour démarrer le backend :
    ```sh
    npm run dev
    ```
## Utilisation
le backend est accessible via l'adresse http://localhost:<PORT>/api/v1/{nom de la route}. Les routes disponibles sont les suivantes :
 ```sh
    /register
    /login
    /logout
```
les autres routes seront ajoutées au fur et à mesure de l'avancement du projet.


