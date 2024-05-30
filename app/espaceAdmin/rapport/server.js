/*import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connecter à MongoDB
const MONGODB_URI = 'mongodb+srv://assyaasbabou:Hxj2FQ1ismuigA7J@cluster0.9sqdpz0.mongodb.net/app';
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.log(err));


// Définir le schéma MongoDB pour les rapports
const rapportSchema = new mongoose.Schema({
    _id: String,
    nom_rapport: String,
    contenu: String,
    date_creation: Date,
    auteur: String,
    projet: String
});

const Rapport = mongoose.model('Rapport', rapportSchema);

// Route pour récupérer tous les rapports
app.get('/api/rapports', async (req, res) => {
    try {
        const rapports = await Rapport.find();
        res.json(rapports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));


async function connectToDatabase() {
    try {
      // Créer un nouveau client MongoDB
      const client = new MongoClient(MONGODB_URI);
  
      // Se connecter au serveur MongoDB
      await client.connect();
      console.log('Connecté à la base de données MongoDB');
    } catch (error) {
      console.error('Erreur lors de la connexion à la base de données :', error);
      throw error; // Vous pouvez gérer cette erreur en conséquence dans votre application
    }
  }

  connectToDatabase();

// Fonction pour récupérer les rapports depuis la base de données
async function getRapports() {
  try {
    // Sélectionner la base de données et la collection
    const database = client.db('app');
    const collection = database.collection('Rapport');

    // Récupérer tous les documents de la collection des rapports
    const rapports = await collection.find().toArray();

    // Afficher les rapports récupérés
    console.log('Rapports récupérés depuis la base de données :', rapports);

    return rapports;
  } catch (error) {
    console.error('Erreur lors de la récupération des rapports depuis la base de données :', error);
    throw error; // Vous pouvez gérer cette erreur en conséquence dans votre application
  }
}

// Appel de la fonction pour récupérer les rapports
getRapports();*/

/*
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connecter à MongoDB via Mongoose
const MONGODB_URI = 'mongodb+srv://assyaasbabou:Hxj2FQ1ismuigA7J@cluster0.9sqdpz0.mongodb.net/app';
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.log(err));

// Définir le schéma MongoDB pour les rapports
const rapportSchema = new mongoose.Schema({
    _id: String,
    nom_rapport: String,
    contenu: String,
    date_creation: Date,

    auteur: String,
    projet: String
});

const Rapport = mongoose.model('Rapport', rapportSchema);

// Créer un nouveau client MongoDB
const client = new MongoClient(MONGODB_URI);

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
    try {
        // Se connecter au serveur MongoDB
        await client.connect();
        console.log('Connecté à la base de données MongoDB');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
        throw error;
    }
}

// Appel de la fonction pour se connecter à la base de données
connectToDatabase();
/*
// Route pour récupérer tous les rapports
app.get('/api/rapports', async (req, res) => {
    try {
        // Sélectionner la base de données et la collection
        const database = client.db('app');
        const collection = database.collection('Rapport');

        // Récupérer tous les documents de la collection des rapports
        const rapports = await collection.find().toArray(); // Utiliser toArray()

        // Afficher les rapports récupérés
        console.log('Rapports récupérés depuis la base de données :', rapports);

        res.json(rapports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
*/
/*

app.get('/api/rapports', async (req, res) => {
    try { 
        const rapports = await Rapport.find();
        console.log('Rapports récupérés depuis la base de données :', rapports);
        res.json(rapports);
    } catch (error) {
        console.error('Erreur lors de la récupération des rapports :', error.message);
        res.status(500).send(error.message);
    }
});
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));*/

