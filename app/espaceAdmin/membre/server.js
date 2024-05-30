/*
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Connecter à MongoDB via Mongoose
const MONGODB_URI = 'mongodb+srv://assyaasbabou:Hxj2FQ1ismuigA7J@cluster0.9sqdpz0.mongodb.net/app';
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.log(err));

// Définir le schéma MongoDB pour les members
const memberschema = new mongoose.Schema({
    id: String,
    nom: String,
    prenom: String,
    email: String,
    mot_de_passe: String,
    profile: String,
    projets: String,
    projet_actuel: String
});

const members = mongoose.model('members', memberschema);

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

// Route pour récupérer tous les members
app.get('/api/members', async (req, res) => {
    try {
        // Sélectionner la base de données et la collection
        const database = client.db('app');
        const collection = database.collection('members');

        // Récupérer tous les documents de la collection des members
        const members = await collection.find().toArray();

        // Afficher les members récupérés
        console.log('members récupérés depuis la base de données :', members);

        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.delete('/api/members/id', async (req, res) => {
    try {
        const memberId = req.params.id; // Récupérer l'ID du membre à supprimer à partir des paramètres de la requête
        const database = client.db('app');
        const collection = database.collection('members');

        // Supprimer le membre de la collection
        const result = await collection.deleteOne({ id: memberId });

        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Membre non trouvé" });
        } else {
            // Mettre à jour la liste des membres après la suppression réussie
            const response = await axios.get('http://localhost:8080/api/members');

            res.status(200).json({ message: "Membre supprimé avec succès", members: response.data });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/members', async (req, res) => {
    try {
        const newMember = req.body; // Les données du nouveau membre à partir du corps de la requête
        const database = client.db('app');
        const collection = database.collection('members');

        // Ajouter le nouveau membre à la collection
        const result = await collection.insertOne(newMember);

        // Envoyer la réponse avec le nouveau membre ajouté
        res.status(201).json(result.ops[0]); // 201 Created
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
*/

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

// Connecter à MongoDB via Mongoose
const MONGODB_URI = 'mongodb+srv://assyaasbabou:Hxj2FQ1ismuigA7J@cluster0.9sqdpz0.mongodb.net/app';
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.log(err));

// Définir le schéma MongoDB pour les membres
const memberSchema = new mongoose.Schema({
    id: String,
    nom: String,
    prenom: String,
    email: String,
    mot_de_passe: String,
    profile: String,
    projets: String,
    projet_actuel: String
});

const Member = mongoose.model('Member', memberSchema);

// Route pour récupérer tous les membres
app.get('/api/members', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour ajouter un nouveau membre
// Route pour ajouter un nouveau membre
app.post('/api/members', async (req, res) => {
    const member = new Member(req.body);
    try {
        const newMember = await member.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer un membre
app.delete('/api/members/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Member.findByIdAndRemove(id);
        res.json({ message: 'Membre supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour mettre à jour un membre
app.put('/api/members/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Member.findByIdAndUpdate(id, req.body);
        res.json({ message: 'Membre mis à jour' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Route pour supprimer un membre
/*
app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
*/


app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));


/*import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuration de la base de données MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/app';

// Connexion à MongoDB via Mongoose
mongoose.connect(MONGODB_URI, { 
  useUnifiedTopology: true,
  useNewUrlParser: true, // Ajout de cette option pour éviter les avertissements de dépréciation
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.log(err));

// Définition des schémas MongoDB
const rapportSchema = new mongoose.Schema({
  _id: String,
    nom_rapport: String,
    contenu: String,
    date_creation: Date,
    auteur: String,
    projet: String
});

const Rapport = mongoose.model('Rapport', rapportSchema);

const projetSchema = new mongoose.Schema({
  _id: String,
  projet: String,
  description: String,
  responsable: String,
  chef_projet: String,
  equipe: String,
  date_debut: Date,
  date_delais: Date,
  statut: String,
  etape: String,
  evenement: String
});

const Projet = mongoose.model('Projet', projetSchema);

const memberSchema = new mongoose.Schema({
  _id: String,
  nom: String,
  prenom: String,
  email: String,
  mot_de_passe: String,
  profile: String,
  projets: String,
  projet_actuel: String
});

const Member = mongoose.model('Member', memberSchema);


// Définition des routes



// Route pour récupérer tous les rapports
app.get('/api/rapports', async (req, res) => {
  try {
      // Récupérer tous les documents de la collection des rapports
      const rapports = await Rapport.find();
      res.json(rapports);
  } catch (err) {
      res.status(500).json(res.json(rapports));
  }
});

////////////////Projets//////////////////////
// Route pour récupérer tous les projets

app.get('/api/projets', async (req, res) => {
  try {
    const projets = await Projet.find();
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add projet
app.post('/api/projets', async (req, res) => {
  const projet = new Projet(req.body);
  try {
    const newProjet = await projet.save();
    res.status(201).json(newProjet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Supprimer Projet

app.delete('/api/projets/:id', async (req, res) => {
  try {
    const deletedProjet = await Projet.findByIdAndDelete(req.params.id);
    if (!deletedProjet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    return res.json({ message: 'Projet supprimé', projet: deletedProjet });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de la suppression du projet', error: err.message });
  }
});

//modifier projet
app.put('/api/projets/:id', async (req, res) => {
  const projetId = req.params.id;
  try {
    const updatedProjet = await Projet.findByIdAndUpdate(projetId, req.body, { new: true });
    res.json(updatedProjet);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du projet', error: err.message });
  }
});



///////////////////Memer///////////////////////

// Route pour récupérer tous les membres
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour ajouter un nouveau membre
app.post('/api/members', async (req, res) => {
  const member = new Member(req.body);
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Modifier la route de suppression des membres
app.delete('/api/members/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    console.log("Début de la suppression du membre...");
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      console.log("Membre non trouvé !");
      return res.status(404).json({ message: 'Membre non trouvé' });
    }
    console.log("Membre supprimé avec succès :", deletedMember);
    return res.json({ message: 'Membre supprimé', member: deletedMember });
  } catch (err) {
    console.error("Erreur lors de la suppression du membre :", err);
    return res.status(500).json({ message: 'Erreur lors de la suppression du membre', error: err.message });
  }
});



// Route pour mettre à jour un membre
// Route for updating a member
// Route for getting a single member by ID
app.get('/api/members/:id', async (req, res) => {
  const memberId = req.params.id;
  try {
    // Find the member in the database by ID
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching member', error: err.message });
  }
});

app.put('/api/members/:id', async (req, res) => {
  const memberId = req.params.id;
  const updatedMemberData = req.body;
  try {
    // Update the member in the database
    const updatedMember = await Member.findByIdAndUpdate(memberId, updatedMemberData, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ message: 'Error updating member', error: err.message });
  }
});
//////////////////////////////////history

const historySchema = new mongoose.Schema({
  type: String,
  name: String,
  timestamp: { type: Date, default: Date.now },
});

const History = mongoose.model('History', historySchema);

// Schémas et modèles existants pour les projets, membres et rapports


// Route pour récupérer l'historique
app.get('/api/history', async (req, res) => {
  try {
    const history = await History.find().sort({ timestamp: -1 }); // Trier par date décroissante
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fonction pour enregistrer les actions d'historique
const saveToHistory = async (type, name) => {
  const historyEntry = new History({ type, name });
  await historyEntry.save();
};

// Routes existantes pour les projets, membres et rapports
// Ajoutez saveToHistory après chaque opération de création, modification ou suppression
app.post('/api/projets', async (req, res) => {
  const projet = new Projet(req.body);
  try {
    const newProjet = await projet.save();
    await saveToHistory('project', newProjet.projet);
    res.status(201).json(newProjet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Exemple pour une route de modification
app.put('/api/projets/:id', async (req, res) => {
  const projetId = req.params.id;
  try {
    const updatedProjet = await Projet.findByIdAndUpdate(projetId, req.body, { new: true });
    await saveToHistory('project', updatedProjet.projet);
    res.json(updatedProjet);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du projet', error: err.message });
  }
});


app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));*/

