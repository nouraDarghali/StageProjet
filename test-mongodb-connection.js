// Importer les modules nécessaires

const express = require('express');


const mongoose = require('mongoose');
const { mongoURI } = require('../config/config'); 


const testMongoDBConnection = async () => {
  try {
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    
    console.log('Connexion à MongoDB réussie !');

    // Déconnexion de MongoDB après le test
    await mongoose.disconnect();
  } catch (error) {
    // Affichage de l'erreur en cas d'échec de la connexion
    console.error('Erreur lors de la connexion à MongoDB :', error);
  }
};

// Appel de la fonction pour tester la connexion à MongoDB
testMongoDBConnection();
