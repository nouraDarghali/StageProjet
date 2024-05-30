import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

// Connecter à MongoDB via Mongoose
const MONGODB_URI = 'mongodb+srv://assyaasbabou:Hxj2FQ1ismuigA7J@cluster0.9sqdpz0.mongodb.net/app';
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.log(err));

// Définir le schéma MongoDB pour les projets
const projetSchema = new mongoose.Schema({
    id: String,
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

// Route pour récupérer tous les projets
app.get('/api/projets', async (req, res) => {
    try {
        // Sélectionner la base de données et la collection
        const database = client.db('app');
        const collection = database.collection('Projets');

        // Récupérer tous les documents de la collection des projets
        const projets = await collection.find().toArray();

        // Afficher les projets récupérés
        console.log('Projets récupérés depuis la base de données :', projets);

        res.json(projets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour ajouter un nouveau projet
app.post('/api/projets', async (req, res) => {
    try {
        const projet = new Projet(req.body);
        const savedProjet = await projet.save();
        res.status(201).json(savedProjet);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout du projet', error: err.message });
    }
});

// Route pour supprimer un projet par son ID
app.delete('/api/projets/:id', async (req, res) => {
    try {
        const deletedProjet = await Projet.findByIdAndDelete(req.params.id);
        if (!deletedProjet) {
            res.status(404).json({ message: 'Projet non trouvé' });
            return;
        }
        res.json({ message: 'Projet supprimé', projet: deletedProjet });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression du projet', error: err.message });
    }
});

// Route pour mettre à jour un projet par son ID
app.put('/api/projets/:id', async (req, res) => {
    try {
        const updatedProjet = await Projet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProjet) {
            res.status(404).json({ message: 'Projet non trouvé' });
            return;
        }
        res.json({ message: 'Projet mis à jour', projet: updatedProjet });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du projet', error: err.message });
    }
});


// Route pour ajouter un nouveau projet
/*app.post('/api/projets', async (req, res) => {
  try {
      const projet = new Projet(req.body);
      const savedProjet = await projet.save();
      res.status(201).json(savedProjet);
  } catch (err) {
      res.status(400).json({ message: 'Erreur lors de l\'ajout du projet', error: err.message });
  }
});*/

/*

  const addProjet = async (newProjetData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/projets", newProjetData);
      console.log("Nouveau projet ajouté :", response.data);
      // Mettre à jour l'état ou effectuer d'autres actions nécessaires après l'ajout du projet
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
      // Gérer l'erreur, afficher un message à l'utilisateur, etc.
    }
  };
  
  const deleteProjet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projets/${id}`);
      setProjets(projets.filter((projet) => projet.id !== id));
      console.log('Projet supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du projet :', error);
    }
  };
  
  useEffect(() => {
    setUpdatedProjet({ ...projetToUpdate });
  }, [projetToUpdate]);

  const updateProjet = async (id, updatedProjetData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/projets/${id}`, updatedProjetData);
      console.log("Projet updated:", response.data);
      const updatedProjets = projets.map((projet) =>
        projet.id === id ? { ...projet, ...updatedProjetData } : projet
      );
      setProjets(updatedProjets);
      setShowUpdateForm(true);
      setProjetToUpdate(null);
    } catch (error) {
      console.error("Error updating projet:", error);
    }
  };
*/

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));



  /*  return (
  
<div className="container mx-auto px-4 dark-background w-5/5 ">
    <form  onSubmit={handleSubmit} 
    className="my-8 w-full max-w-md mx-auto bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 justify-center items-center w-5/5 " autoFocus>
    <div className="grid grid-cols-2 gap-4">
   
    <label className="block text-gray-400 text-sm font-bold mb-2">
      nom:
        <input type="text" name="projet" value={updateProjet.projet} onChange={handleChange}
         className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoFocus />
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
      description:
        <input type="text" name="description" value={updateProjet.description} onChange={handleChange}
         className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoFocus/>
      </label>
      
      <label className="block text-gray-400 text-sm font-bold mb-2">
      responsable:
        <input type="text" name="responsable" value={updateProjet.responsable} onChange={handleChange} 
        className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        autoFocus />
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
      chefProjet:
        <input type="text" name="chefProjet" value={updateProjet.chefProjet} onChange={handleChange}
         className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoFocus />
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
      equipe:
        <input type="text" name="equipe" value={updateProjet.equipe} onChange={handleChange} className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoFocus />
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
      dateDebut:
        <input type="text" name="dateDebut" value={updateProjet.dateDebut} onChange={handleChange} className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  autoFocus/>
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
      dateDelais:
        <input type="text" name="dateDelais" value={updateProjet.dateDelais} onChange={handleChange} className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoFocus />
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
      statut:
        <input type="text" name="statut" value={updateProjet.statut} onChange={handleChange} className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  autoFocus/>
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
      etape:
        <input type="text" name="etape" value={updateProjet.etape} onChange={handleChange} className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoFocus />
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
      evenement:
        <input type="text" name="evenement" value={updateProjet.evenement} onChange={handleChange} className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoFocus />
      </label>
      <button type="submit" onSubmit={handleSubmit}  className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Modifier Projet
      </button>
      </div></form></div>*/


      
 /*<Layout>
  <div className="container mx-auto px-4 rounded-lg">
  <div className="flex justify-between items-center my-4 rounded-lg">
  
  <div className="grid grid-cols-3 gap-4">
  <div className="flex flex-col items-center">
      {/* Bouton de menu avec une icône 
      <button
          className="absolute top-11 left-1 text-white focus:outline-none"
          onClick={toggleMenu} // Inverse l'état du menu lors du clic
        >
          <FiMenu className="mr-2" />
        </button>
</div>
<ResultSection>
  {/* Contenu du menu conditionnellement affiché 
  {showMenu && (
    <>
      <button
      className="bg-blue-400 text-white px-4 py-2 rounded w-56 mb-2" // Ajout de mb-2 pour un espace entre les boutons
      onClick={() => { 
        setShowProjetsTable(true);
                  setShowAddProjetForm(false);
    }}
    > Afficher les Projets
    </button>
          <h3 className="text-gray-500">-----------</h3>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-56"
            onClick={() => {
              setShowAddProjetForm(true);
              setShowProjetsTable(false);
            }}
          >
            Ajouter Projet
          </button>
          <h3 className="text-gray-500">-----------</h3>
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <h3 className="text-gray-500">-----------</h3>
          <select
            className="bg-gray-900 border border-blue-900 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 mb-2"
            value={filtreStatut}
            onChange={handleFiltreStatutChange}
          >
            <option value="">Tous les statuts</option>
            <option value="termine">Terminé</option>
            <option value="en cours">En cours</option>
          </select>
          <select
            className="bg-gray-900 border border-blue-900 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 mb-2"
            value={filtreEquipe}
            onChange={(e) => filterByEquipe(e.target.value)}
          >
            <option value="">Toutes les équipes</option>
            {filteredProjets.map((projet, index) => (
              <option key={index} value={projet.equipe}>
                {projet.equipe}
              </option>
            ))}
          </select>
          </>
  )}
</ResultSection>
     </div>


     <h3 className="text-blue-900">-----------</h3>
   {/* Ligne verticale 




   
  </div>
   <h3 className="text-blue-900">-----------</h3><h3 className="text-gray-700">-----------</h3>
   <div className={`ml-auto ${menuVisible ? 'pl-64' : 'pl-16'}`} style={{ width: `calc(100% - ${menuVisible ? '4rem' : '1rem'})` }}>
   <div className="flex flex-col items-center">
   <div className='grid grid-cols-2 gap-4'>
      <ResultSection tyle={{ marginLeft: menuVisible ? 'calc(4rem + 40px)' : 0 }}>
          <div className="flex items-center">
          <div className='rounded-full bg-green-500 text-white px-4 py-2 mr-4'>
            {showNotification && (
              <div>
                {unreadCount}
              </div>
            )}</div>
            <div className="text-gray-200">Projets ajoutés</div>
            </div>
            </ResultSection>
   <ResultSection tyle={{ marginLeft: menuVisible ? 'calc(4rem + 40px)' : 0 }}>
   <div className="flex items-center">
            <div className="rounded-full bg-blue-500 text-white px-4 py-2 mr-4">
              {projectCount}
            </div>
            <div className="text-gray-200">projets disponibles</div>
          </div>
    </ResultSection>
</div>

    <ResultSection >
    {showUpdateForm ? (
      <UpdateProjetForm projectToUpdate={projetToUpdate} updateProjet={updateProjet} />
  ) : showAddProjetForm ? (
    <AddProjetForm addProjet={addProjet} />
  ) : (
    <ProjetTable
      projets={filteredProjets}
      deleteProjet={deleteProjet}
      showUpdateFormFor={showUpdateFormFor}
      updateProjet={updateProjet}
    />
  )}
</ResultSection>
  </div>
</div>
</div>
  </Layout>*/
//export { AddProjetForm, UpdateProjetForm, showUpdateFormFor };






/*
"use client"
import ProjectTable from './components/ProjectTable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ProjetPage = () => {
  const [formData, setFormData] = useState({
    projet: '',
    description: '',
    responsable: '',
    Chef_projet: '',
    equipe: '',
    date_debut: '',
    date_delais: '',
    statut: '',
    Etape: '',
    evenement: '',
    // Ajoutez d'autres champs selon vos besoins
  });

  const [projets, setProjects] = useState([]);
  const [dbStatus, setDbStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/projets',formData)
      .then(response => {
        console.log('Project added successfully:', response.data);
        setDbStatus('Connexion à la base de données réussie.'); // Mettre à jour le statut de la connexion à la base de données
        setFormData({ // Réinitialiser le formulaire après l'ajout avec succès
          projet: '',
          description: '',
          responsable: '',
          Chef_projet: '',
          equipe: '',
          date_debut: '',
          date_delais: '',
          statut: '',
          Etape: '',
          evenement: '',
        });
        // Récupérer la liste mise à jour des projets après l'ajout
        setProjects();
      })
      .catch(error => {
        console.error('Error adding project:', error);
        setDbStatus('Erreur lors de la connexion à la base de données.'); // Mettre à jour le statut de la connexion à la base de données en cas d'erreur
      });
  };

  useEffect(() => {
    alert("ProjetPage.js finished rendering")
    console.log("ProjetPage.js finished rendering")
    axios.get('/api/projets')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const simplifiedProjects = [...projets].sort((a, b) => b.id - a.id).map(({ id, projet }) => ({ id, projet }));

  return (
    <div>
      <div>
      <ProjectTable projects={simplifiedProjects} />
        <p>{dbStatus}</p>
        <h2>Liste des Projets</h2>
        <table>
          <thead>
            <tr>
              <th>Id Projet</th>
              <th>Projet</th>
              <th>Description</th>
              <th>Responsable</th>
              <th>Chef_projet</th>
              <th>equipe</th>
              <th>date_debut</th>
              <th>date_delais</th>
              <th>statut</th>
              <th>Etape</th>
              <th>evenement</th>
            </tr>
          </thead>
          <tbody>
            {projets.map(project => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.projet}</td>
                <td>{project.description}</td>
                <td>{project.responsable}</td>
                <td>{project.Chef_projet}</td>
                <td>{project.equipe}</td>
                <td>{project.date_debut}</td>
                <td>{project.date_delais}</td>
                <td>{project.statut}</td>
                <td>{project.Etape}</td>
                <td>{project.evenement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Ajouter un Projet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projet">Projet:</label>
          <input type="text" id="projet" name="projet" value={formData.projet} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="responsable">Responsable:</label>
          <input type="text" id="responsable" name="responsable" value={formData.responsable} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Chef_projet">Chef Projet:</label>
          <input type="text" id="Chef_projet" name="Chef_projet" value={formData.Chef_projet} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="equipe">Equipe:</label>
          <input type="text" id="equipe" name="equipe" value={formData.equipe} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="date_debut">Date Début:</label>
          <input type="text" id="date_debut" name="date_debut" value={formData.date_debut} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="date_delais">Date Limite:</label>
          <input type="text" id="date_delais" name="date_delais" value={formData.date_delais} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="statut">Statut:</label>
          <input type="text" id="statut" name="statut" value={formData.statut} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Etape">Etape:</label>
          <input type="text" id="Etape" name="Etape" value={formData.Etape} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="evenement">Evènement:</label>
          <input type="text" id="evenement" name="evenement" value={formData.evenement} onChange={handleChange} />
        </div>
        <button type="submit">Ajouter Projet</button>
      </form>
    </div>
  );
};

export default ProjetPage;
*/




/*<form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projet">Projet:</label>
          <input type="text" id="projet" name="projet" value={formData.projet} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="responsable">Responsable:</label>
          <input type="text" id="responsable" name="responsable" value={formData.responsable} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Chef_projet">Chef Projet:</label>
          <input type="text" id="Chef_projet" name="Chef_projet" value={formData.Chef_projet} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="equipe">Equipe:</label>
          <input type="text" id="equipe" name="equipe" value={formData.equipe} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="date_debut">Date Début:</label>
          <input type="text" id="date_debut" name="date_debut" value={formData.date_debut} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="date_delais">Date Limite:</label>
          <input type="text" id="date_delais" name="date_delais" value={formData.date_delais} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="statut">Statut:</label>
          <input type="text" id="statut" name="statut" value={formData.statut} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Etape">Etape:</label>
          <input type="text" id="Etape" name="Etape" value={formData.Etape} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="evenement">Evènement:</label>
          <input type="text" id="evenement" name="evenement" value={formData.evenement} onChange={handleChange} />
        </div>
        <button type="submit">Ajouter Projet</button>
      </form>
      
      import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjetPage = () => {
  const [formData, setFormData] = useState({
    projet: '',
    description: '',
    responsable: '',
    Chef_projet: '',
    equipe: '',
    date_debut: '',
    date_delais: '',
    statut: '',
    Etape: '',
    evenement: '',
    // Ajoutez d'autres champs selon vos besoins
  });

  const [projets, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projets');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('/api/projets', formData);
      console.log('Project added successfully:', response.data);
      setFormData({
        projet: '',
        description: '',
        responsable: '',
       Chef_projet: '',
        equipe: '',
        date_debut: '',
        date_delais: '',
         statut: '',
         Etape: '',
         evenemet: '',
      });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Liste des Projets</h2>
        <table>
          <thead>
            <tr>
              <th>Id Projet</th>
              <th>Projet</th>
              <th>Description</th>
              <th>Responsable</th>
              <th>Chef_projet</th>
              <th>equipe</th>
              <th>date_debut</th>
              <th>date_delais</th>
              <th>statut</th>
              <th>Etape</th>
              <th>evenemet</th>
            </tr>
          </thead>
          <tbody>
          {projets.map(project => (
  <tr key={project.id}>
    <td>{project.id}</td>
    <td>{project.projet}</td>
    <td>{project.description}</td>
    <td>{project.responsable}</td>
    <td>{project.responsable}</td>
    <td>{project.Chef_projet}</td>
    <td>{project.equipe}</td>
    <td>{project.date_debut}</td>
    <td>{project.date_delais}</td>
    <td>{project.statut}</td>
    <td>{project.Etape}</td>
    <td>{project.evenement}</td>
  </tr>
))}

          </tbody>
        </table>
      </div>
      <h2>Ajouter un Projet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projet">Projet:</label>
          <input type="text" id="projet" name="projet" value={formData.projet} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="responsable">Responsable:</label>
          <input type="text" id="responsable" name="responsable" value={formData.responsable} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Chef_projet">Chef Projet:</label>
          <input type="text" id="Chef_projet" name="Chef_projet" value={formData.Chef_projet} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="equipe">Equipe:</label>
          <input type="text" id="equipe" name="equipe" value={formData.equipe} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="date_debut">Date Début:</label>
          <input type="text" id="date_debut" name="date_debut" value={formData.date_debut} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="date_delais">Date Limite:</label>
          <input type="text" id="date_delais" name="date_delais" value={formData.date_delais} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="statut">Statut:</label>
          <input type="text" id="statut" name="statut" value={formData.statut} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Etape">Etape:</label>
          <input type="text" id="Etape" name="Etape" value={formData.Etape} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="evenement">Evènement:</label>
          <input type="text" id="evenement" name="evenement" value={formData.evenement} onChange={handleChange} />
        </div>
        <button type="submit">Ajouter Projet</button>
      </form>
    </div>
  );
};

export default ProjetPage;



/*
import React, { useState } from 'react';
import ProjectTable from '../components/ProjectTable';

import axios from 'axios';

const ProjetPage = () => {
  const [formData, setFormData] = useState({
    projet: '',
    description: '',
    responsable: '',
    // Ajoutez d'autres champs selon vos besoins
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/projects', formData)
      .then(response => {
        console.log('Project added successfully:', response.data);
        // Réinitialiser le formulaire après l'ajout avec succès
        setFormData({
          projet: '',
          description: '',
          responsable: '',
          // Réinitialisez d'autres champs selon vos besoins
        });
      })
      .catch(error => {
        console.error('Error adding project:', error);
      });
  };

  return (
    
    <div>
    <div>
      <ProjectTable />
    </div>
      <h2>Ajouter un Projet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projet">Projet:</label>
          <input type="text" id="projet" name="projet" value={formData.projet} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="responsable">Responsable:</label>
          <input type="text" id="responsable" name="responsable" value={formData.responsable} onChange={handleChange} />
        </div>
       
        <button type="submit">Ajouter Projet</button>
      </form>
    </div>
  );
};

export default ProjetPage;*/



/*

  const addProjet = async (newProjetData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/projets", newProjetData);
      console.log("Nouveau projet ajouté :", response.data);
      // Mettre à jour l'état ou effectuer d'autres actions nécessaires après l'ajout du projet
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
      // Gérer l'erreur, afficher un message à l'utilisateur, etc.
    }
  };
  
  const deleteProjet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projets/${id}`);
      setProjets(projets.filter((projet) => projet.id !== id));
      console.log('Projet supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du projet :', error);
    }
  };
  
  useEffect(() => {
    setUpdatedProjet({ ...projetToUpdate });
  }, [projetToUpdate]);

  const updateProjet = async (id, updatedProjetData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/projets/${id}`, updatedProjetData);
      console.log("Projet updated:", response.data);
      const updatedProjets = projets.map((projet) =>
        projet.id === id ? { ...projet, ...updatedProjetData } : projet
      );
      setProjets(updatedProjets);
      setShowUpdateForm(true);
      setProjetToUpdate(null);
    } catch (error) {
      console.error("Error updating projet:", error);
    }
  };
*/
