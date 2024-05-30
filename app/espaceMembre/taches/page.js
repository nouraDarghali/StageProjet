'use client';
import React, { useState } from 'react';
import MesTaches from './MesTaches/page';
import NouvellesTaches from './NouvellesTaches/page';

const Taches = () => {
    // État pour suivre la page actuellement affichée
    const [currentPage, setCurrentPage] = useState('mesTaches');
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
                    onClick={() => handlePageChange('mesTaches')}
                    className={currentPage === 'mesTaches' ? 'selected-button' : ''}
                >
                    Mes Tâches
                </button>

                {/* Bouton Mes Nouvelles Tâches */}
                <button
                    id="titre1"
                    onClick={() => handlePageChange('nouvellesTaches')}
                    className={currentPage === 'nouvellesTaches' ? 'selected-button' : ''}
                >
                    Mes Nouvelles Tâches
                </button>
            </div>
            <br />
                
            
            
            {/* Affiche la page en fonction de la valeur de currentPage */}
            {currentPage === 'mesTaches' && <MesTaches />}
            {currentPage === 'nouvellesTaches' && <NouvellesTaches />}
        </div>
    );
};

export  default Taches;