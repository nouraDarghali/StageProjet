
'use client'
import React, { useState, useEffect } from 'react';
const fetchTaches = async (username) => {
    try {
        const response = await fetch(`http://localhost:3000/espaceMembre/api/taches/nouvelleTaches?username=${username}`);
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
  
const TacheList = () => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const username = urlParams.get('username');
    console.log("username:", username);
    const [taches, setTaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
    // Afficher un message de chargement ou d'erreur si nécessaire
    if (loading) {
        return <div>Chargement...</div>;
    }
    if (error) {
        return <div>Erreur : {error.message}</div>;
    }
    // Fonction pour gérer la tâche commencée
    const handleCommenceTask = async (tache) => {
        const cleanedId = tache._id.trim();
        try {
            const response = await fetch(`http://localhost:3000/espaceMembre/api/taches/mesTaches?username=${username}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                id: cleanedId, 
                tache: tache.tache, 
                description: tache.description,
                projet: tache.projet,
                membre: username
              })
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Tâche commencée avec succès:', responseData);
    
                const deleteResponse = await fetch(`http://localhost:3000/espaceMembre/api/taches/nouvelleTaches?id=${cleanedId}`, {
                    method: 'DELETE',
                });
                if (deleteResponse.ok) {
                    console.log('Tâche supprimée avec succès');
    
                    // Met à jour l'état `taches` pour supprimer la tâche commencée
                    setTaches((prevTaches) => prevTaches.filter((prevTache) => prevTache._id !== cleanedId));
                } else {
                    console.error('Erreur lors de la suppression de la tâche:', deleteResponse.statusText);
                }
            } else {
                console.error('Erreur lors de la création de la tâche:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la création de la tâche:', error);
        }
    };
    // Afficher le champ de recherche, l'option de filtrage, et la liste filtrée des tâches
    return (
        <div className='table_boton'>
            <div className='container_t'>
            {/* Champ de recherche */}
            </div>
            {/* Afficher la liste des tâches filtrées */}
            <table className="min-w-full text-left text-sm font-light">
            <thead
                    className="border-b bg-yellow-400 dark:border-neutral-500 dark:bg-neutral-700">
                    <tr>
                        <th scope="col" className="px-6 py-4">Tâche</th>
                        <th scope="col" className="px-6 py-4">Description</th>
                        <th scope="col" className="px-6 py-4">Projet</th>
                        <th scope="col" className="px-6 py-4">Action</th>
                    </tr>
                </thead>
                <tbody>
    {taches.map((data) => (
        <tr key={data._id} className="border-b bg-white  dark:border-neutral-500 dark:bg-neutral-600">
            <td className="whitespace-nowrap px-6 py-4">{data.tache}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.description}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.projet}</td>
            <td >
                <button
                    className="button-commencer"
                    onClick={() => handleCommenceTask(data)}
                >
                    Commencer la Tâche
                </button>
            </td>
        </tr>
    ))}
</tbody>
            </table>
        </div>
    );
};
export default TacheList;




