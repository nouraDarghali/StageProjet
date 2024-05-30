import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://assyaasbabou:Hxj2FQ1ismuigA7J@cluster0.9sqdpz0.mongodb.net/app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

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

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

