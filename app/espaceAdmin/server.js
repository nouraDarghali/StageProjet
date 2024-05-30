
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuration de la base de données MongoDB
//const MONGODB_URI = 'mongodb://localhost:27017/app';
const MONGODB_URI ='mongodb+srv://assyaasbabou:Hxj2FQ1ismuigA7J@cluster0.9sqdpz0.mongodb.net/app'

// Connexion à MongoDB via Mongoose
mongoose.connect(MONGODB_URI, { 
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.log(err));



const objectiveSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId, // Utilisation de ObjectId pour l'ID du projet auquel l'objectif appartient
    ref: 'Projet' // Référence au modèle Projet
  },
  title: String,
  description: String
});

const Objective = mongoose.model('Objective', objectiveSchema);




// Routes existantes pour les projets
app.get('/api/projets', async (req, res) => {
  try {
    const projets = await Projet.find();
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const projetSchema = new mongoose.Schema({
  projet: { type: String, required: true },
  description: { type: String, required: true },
  responsable: { type: String, required: true },
  date_debut: { type: Date, required: true },
  date_delais: { type: Date, required: true },
  statut: { type: String, required: true },
  etape: { type: String, required: true },
  evenement: { type: String, required: true },
}, { collection: 'Projets' }); 

const Projet = mongoose.model('Projet', projetSchema);

app.post('/api/projets', async (req, res) => {
  console.log('Received request body:', req.body);
  const projet = new Projet(req.body);

  try {
    const newProjet = await projet.save();
    res.status(201).json(newProjet);
  } catch (err) {
    console.error('Error saving project:', err.message);
    res.status(400).json({ message: err.message });
  }
});




app.delete('/api/projets/:id', async (req, res) => {
  try {
    await Projet.findByIdAndDelete(req.params.id);
    res.status(200).send('projet supprimé avec succès');
  } catch (error) {
    console.error('Error:', error.message); // Log error
    res.status(500).send(error.message);
  }
});


app.put('/api/projets/:_id', async (req, res) => {
  const projetId = req.params._id;
  console.log('ID reçu pour mise à jour:', projetId); // Ajout du log pour l'ID

  try {
    const projetExists = await Projet.exists({ _id: projetId });
    if (!projetExists) {
      console.log('Projet non trouvé avec ID:', projetId); // Log si le projet n'est pas trouvé
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    const updatedProjet = await Projet.findByIdAndUpdate(projetId, req.body, { new: true });
    if (!updatedProjet) {
      console.log('Projet non trouvé après mise à jour:', projetId); // Log si le projet n'est pas trouvé après la mise à jour
      return res.status(404).json({ message: 'Projet non trouvé après mise à jour' });
    }

    res.json(updatedProjet);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du projet:', err.message); // Log de l'erreur
    res.status(500).json({ message: 'Erreur lors de la mise à jour du projet', error: err.message });
  }
});

// Définir le schéma et le modèle Utilisateur
const utilisateurSchema = new mongoose.Schema({
  nom: String,
  mot_passe: String,
  profile: String
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema, 'Utilisateurs');

// Route pour récupérer tous les utilisateurs
app.get('/api/utilisateurs', async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    console.log('Sending users:', utilisateurs); // Log utilisateurs
    res.json(utilisateurs);
  } catch (error) {
    console.error('Error:', error.message); // Log error
    res.status(500).send(error.message);
  }
});

// Route pour supprimer un utilisateur
app.delete('/api/utilisateurs/:id', async (req, res) => {
  try {
    await Utilisateur.findByIdAndDelete(req.params.id);
    res.status(200).send('Utilisateur supprimé avec succès');
  } catch (error) {
    console.error('Error:', error.message); // Log error
    res.status(500).send(error.message);
  }
});

const rapportSchema = new mongoose.Schema({
  _id: String,
  nom_rapport: String,
  contenu: String,
  date_creation: Date,

  auteur: String,
  projet: String
});

const Rapport = mongoose.model('Rapport', rapportSchema);



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





app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

/*
app.post('/api/projets', async (req, res) => {
  console.log('Received request body:', req.body); 
  const projet = new Projet({
    _id: req.body._id,
    projet: req.body.projet,
    description: req.body.description,
    responsable: req.body.responsable,
    
    date_debut: req.body.date_debut,
    date_delais: req.body.date_delais,
    statut: req.body.statut,
   
    evenement: req.body.evenement,
    

  });

  try {
    const newProjet = await projet.save();
    await saveToHistory('project', newProjet.projet);
    res.status(201).json(newProjet);
  } catch (err) {
    console.error('Error saving project:', err.message);
    res.status(400).json({ message: err.message });
  }
});*/

/*
const projetSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  projet: String,
  description: String,
  responsable: String,
  
  date_debut: Date,
  date_delais: Date,
  statut: String,
  etape: String,
  evenement: String,
  

});

const Projet = mongoose.model('Projet', projetSchema);*/

/*
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find().populate('projets').populate('projet_actuel');
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
*/


/*
// Routes existantes pour les membres
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/members', async (req, res) => {
  const member = new Member({
    _id: req.body._id,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    mot_de_passe: req.body.mot_de_passe,
    profile: req.body.profile,
    projets: req.body.projets,
    projet_actuel: req.body.projet_actuel
  });

  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.delete('/api/members/:id', async (req, res) => {
  const memberId = req.params.id;
  try {
    const deletedMember = await Member.findByIdAndDelete(memberId);
    if (!deletedMember) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }
    res.status(200).json({ message: 'Membre supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du membre', error: err.message });
  }
});

app.put('/api/members/:id', async (req, res) => {
  const memberId = req.params.id;
  const updatedMemberData = req.body;
  try {
    const updatedMember = await Member.findByIdAndUpdate(memberId, updatedMemberData, { new: true });
    await saveToHistory('member', `${updatedMember.nom} ${updatedMember.prenom}`);
    if (!updatedMember) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }
    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du membre', error: err.message });
  }
});

// Routes existantes pour les rapports
app.get('/api/rapports', async (req, res) => {
  try {
    const rapports = await Rapport.find();
    res.json(rapports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ajoutez les autres routes pour les rapports ici...

app.get('/api/projets/details/:_id', async (req, res) => {
  try {
    const projet = await Projet.findById(req.params._id);
    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    res.json(projet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/rapports/filter/:date', async (req, res) => {
  const date = new Date(req.params.date);
  try {
    const rapports = await Rapport.find({ date_creation: { $gte: date } });
    res.json(rapports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/api/projets/:_id/objectives', async (req, res) => {
  try {
    const objectives = await Objective.find({ projectId: req.params._id });
    res.json(objectives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/projets/:_id/objectives', async (req, res) => {
  const { _id } = req.params;
  const { title, description } = req.body;
  try {
    const objective = new Objective({ projectId: _id, title, description });
    await objective.save();
    res.status(201).json(objective);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/objectives', async (req, res) => {
  try {
    const objectives = await Objective.find();
    res.json(objectives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint pour récupérer les membres avec le nombre de projets associés à chaque membre
app.get('/api/members/projects', async (req, res) => {
  try {
    // Récupérer tous les membres de la base de données
    const members = await Member.find().populate('projets');

    // Structure de données pour stocker le nombre de projets par membre
    const projectsByMember = {};

    // Compter le nombre de projets par membre
    members.forEach(member => {
      projectsByMember[member._id] = member.projets.length;
    });

    // Envoyer la réponse avec les statistiques
    res.json(projectsByMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

*/
/*

const utilisateurSchema = new mongoose.Schema({
  nom: String,
  mot_passe: String,
  profile: String
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

// Route pour récupérer tous les utilisateurs
app.get('/api/utilisateurs', async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    console.log('Sending users:', utilisateurs); // Log utilisateurs
    res.json(utilisateurs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour supprimer un utilisateur
app.delete('/api/utilisateurs/:id', async (req, res) => {
  try {
    await Utilisateur.findByIdAndDelete(req.params.id);
    res.status(200).send('Utilisateur supprimé avec succès');
  } catch (error) {
    res.status(500).send(error.message);
  }
});
*/

/*
const memberSchema = new mongoose.Schema({
  _id:  mongoose.Schema.Types.ObjectId,
  nom: String,
  prenom: String,
  email: String,
  mot_de_passe: String,
  profile: String,
  projets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projet' }], // Référence aux projets
  projet_actuel: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet' } // Référence au projet actuel

});

const Member = mongoose.model('Member', memberSchema);*/
