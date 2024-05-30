'use client';
import React, { useState } from 'react';
import ListeFichiers from './ListeFichiers/page';
import Upload from './NouveauFichier/page';
const Fichier = () => {
    // État pour suivre la page actuellement affichée
    const [currentPage, setCurrentPage] = useState('ListeFichiers');
    // Fonction pour gérer les clics sur les boutons
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div id="resultat">
            <div id="button-container">
                {/* Bouton Mes Tâches */}
                <button
                    id="titre"
                    onClick={() => handlePageChange('ListeFichiers')}
                    className={currentPage === 'ListeFichiers' ? 'selected-button' : ''}
                >
                    Listes des fichiers
                </button>

                {/* Bouton Mes Nouvelles Tâches */}
                <button
                    id="titre1"
                    onClick={() => handlePageChange('Upload')}
                    className={currentPage === 'Upload' ? 'selected-button' : ''}
                >
                   Nouveau Fichier
                </button>
            </div>
            <br />
                
            
            
            {/* Affiche la page en fonction de la valeur de currentPage */}
            {currentPage === 'ListeFichiers' && <ListeFichiers />}
            {currentPage === 'Upload' && <Upload />}
        </div>
    );
};

export default Fichier;
