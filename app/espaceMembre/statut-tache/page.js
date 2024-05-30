'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import automatique des composants de Chart.js

// Fonction pour obtenir les tâches de l'API
const fetchTaches = async (username) => {
    try {
        const response = await fetch(`http://localhost:3000/espaceMembre/api/taches/StatutTaches?username=${username}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des tâches');
        }
        const data = await response.json();
        return data.taches;
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

const Statut = () => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const username = urlParams.get('username');
    console.log("username:", username);
    const [taches, setTaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState(''); // État pour suivre l'option de filtrage

    useEffect(() => {
        const fetchAndSetTaches = async () => {
            try {
                const fetchedTaches = await fetchTaches(username);
                setTaches(fetchedTaches);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSetTaches();
    }, [username]);

    // Fonction pour gérer les changements dans le champ de recherche
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Fonction pour gérer les changements dans l'option de filtrage
    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    // Filtrer les tâches en fonction du terme de recherche et de l'option de filtrage
    const filteredTaches = taches.filter((tache) => {
        // Filtrage basé sur le terme de recherche
        const matchesSearchTerm =
            tache.tache?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tache.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tache.date_debut?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tache.date_fin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tache.duree?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tache.statut?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tache.projet?.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtrage basé sur l'option de filtrage
        const matchesFilterOption =
            filterOption === '' ||
            (tache.statut && tache.statut.toLowerCase() === filterOption.toLowerCase());

        return matchesSearchTerm && matchesFilterOption;
    });

    // Calcul des statistiques pour le diagramme circulaire
    const tachesTerminees = taches.filter(tache => tache.statut.toLowerCase() === 'terminée').length;
    const tachesEnCours = taches.filter(tache => tache.statut.toLowerCase() === 'en cours').length;

    const data = {
        labels: ['Terminée', 'En cours'],
        datasets: [
            {
                data: [tachesTerminees, tachesEnCours],
                backgroundColor: ['#34D399', '#facc15'],
                hoverBackgroundColor: ['#34D399', '#facc15'],
            },
        ],
    };

    // Afficher un message de chargement ou d'erreur si nécessaire
    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }
// Dans le retour de la fonction Statut :

return (
    // Statut.js
// Ajoutez une classe "container" autour de votre contenu pour pouvoir appliquer une marge
<div className="container">
    {/* Conteneur du diagramme circulaire */}
    <div className="chart-container border p-4 mr-4" style={{ width: '300px', height: '300px', marginTop: '6rem' }}>
        <Pie data={data} />
    </div>

    {/* Conteneur du tableau */}
    <div className='table_boton flex-grow'>
        <div className='container_t' style={{ marginRight: '6rem' }}>
            {/* Champ de recherche */}
            <div className="recherche">
                <input
                    type="text"
                    placeholder="Recherche..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-64 p-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            {/* Sélecteur pour filtrer les tâches */}
            <div className="filtrage">
                <select value={filterOption} onChange={handleFilterChange} className="w-64 p-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-300">
                    <option value="">Tous</option>
                    <option value="terminée">Terminée</option>
                    <option value="en cours">En cours</option>
                </select>
            </div>
        </div>

        {/* Afficher la liste des tâches filtrées */}
        <table className="min-w-full text-left text-sm font-light mb-8"> {/* Ajoutez une marge en bas */}
            <thead className="border-b bg-blue-400 dark:border-neutral-500 dark:bg-neutral-700">
                <tr>
                    <th scope="col" className="px-6 py-4">Tâche</th>
                    <th scope="col" className="px-6 py-4">Description</th>
                    <th scope="col" className="px-6 py-4">Date de début</th>
                    <th scope="col" className="px-6 py-4">Date de fin</th>
                    <th scope="col" className="px-6 py-4">Durée</th>
                    <th scope="col" className="px-6 py-4">Statut</th>
                    <th scope="col" className="px-6 py-4">Projet</th>
                </tr>
            </thead>
            <tbody>
                {filteredTaches.map((tache) => (
                    <tr
                        key={tache.id}
                        className={`border-b bg-white dark:border-neutral-500 dark:bg-neutral-600`}
                    >
                        <td className="whitespace-nowrap px-6 py-4">{tache.tache}</td>
                        <td className="whitespace-nowrap px-6 py-4">{tache.description}</td>
                        <td className="whitespace-nowrap px-6 py-4">{tache.date_debut}</td>
                        <td className="whitespace-nowrap px-6 py-4">{tache.date_fin}</td>
                        <td className="whitespace-nowrap px-6 py-4">{tache.duree}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                            {tache.statut}
                            <Link href={`/espaceMembre/statut-tache/editTache/${tache._id}`}>
                                <HiPencilAlt size={24} className='text-green-400' />
                            </Link>
                        </td>
                        <td>{tache.projet}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

);

};

export default Statut;

