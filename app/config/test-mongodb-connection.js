const mongoose = require('mongoose');
// const { mongoURI } = require('../config/config');
const mongoURI="mongodb+srv://assyaasbabou:Hxj2FQ1ismuigA7J@cluster0.9sqdpz0.mongodb.net/app";
const testMongoDBConnection = async () => {
    try {
        await mongoose.connect(mongoURI, {
            // Vos options de connexion ici
        });

        console.log('Connexion à MongoDB réussie !');

        // Renvoyer l'instance de la base de données
        return mongoose.connection;
    } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB :', error);
        throw error; // Rejeter l'erreur pour le gestionnaire d'erreurs dans route.js
    }
};

  export default testMongoDBConnection;

