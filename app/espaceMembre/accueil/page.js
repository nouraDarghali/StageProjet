'use client';
import '../style.css';
import React, { useState, useEffect } from 'react';
const fetchTaches = async (username) => {
    try {
        const response = await fetch(`http://localhost:3000/espaceMembre/api/taches/accueil?username=${username}`);
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

const fetchProjet = async (username) => {
    try {
        const response = await fetch(`http://localhost:3000/espaceMembre/api/taches/accueil/projet?username=${username}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des projets');
        }
        const data = await response.json();
        return data.projets;
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

const fetchNewTaches = async (username) => {
    try {
        const response = await fetch(`http://localhost:3000/espaceMembre/api/taches/accueil/NewTask?username=${username}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des tâches');
        }
        const data = await response.json();
        return data.task;
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

const fetchMoreTache = async (username) => {
    try {
        const response = await fetch(`http://localhost:3000/espaceMembre/api/taches/accueil/moreTask?username=${username}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des tâches');
        }
        const data = await response.json();
        return data.tasks;
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

const countTasksByStatus = (tasks, status) => {
    return tasks.filter(task => task.statut === status).length;
};

const Accueil = () => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const username = urlParams.get('username');
    const [taches, setTaches] = useState([]);
    const [task, setTask] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [projets, setProjets] = useState([]);
    const [showProjects, setShowProjects] = useState(false);
    const [showTaskStatus, setShowTaskStatus] = useState(false);
    const [error, setError] = useState(null);
    const [showAllTasks, setShowAllTasks] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedTaches, fetchedProjets] = await Promise.all([fetchTaches(username), fetchProjet(username)]);
                setTaches(fetchedTaches);
                setProjets(fetchedProjets);
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, [username]);

    useEffect(() => {
        const fetchAndSetNewTaches = async () => {
            try {
                const fetchedNewTaches = await fetchNewTaches(username);
                setTask(fetchedNewTaches);
            } catch (err) {
                setError(err);
            }
        };
        fetchAndSetNewTaches();
    }, [username]);

    useEffect(() => {
        const fetchAndSetMoreTaches = async () => {
            try {
                const fetchedMoreTaches = await fetchMoreTache(username);
                setTasks(fetchedMoreTaches);
            } catch (err) {
                setError(err);
            }
        };
        fetchAndSetMoreTaches();
    }, [username]);

    const numTasksAssignedToMe = taches.length;
    const numProjetsAssignedToMe = projets.length;
    const numTasksInProgress = countTasksByStatus(taches, 'en cours');
    const numTasksCompleted = countTasksByStatus(taches, 'terminée');

    const toggleProjects = () => {
        setShowProjects(!showProjects);
    };

    const toggleTaskStatus = () => {
        setShowTaskStatus(!showTaskStatus);
    };

    const handleVoirPlusClick = () => {
        setShowAllTasks(!showAllTasks); // Toggle showAllTasks state
    };

    return (
        <div id="resultat" className="grid justify-items-auto dark:bg-gray-800 grid-cols-2">
            <div id="main" className="grid justify-items-auto grid-cols-2">
                <div
                    style={{ marginLeft: "30px", marginRight: "auto", marginTop: "100px" }}
                    className="bg-blue-400   text-white font-bold py-12 px-12 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    onClick={toggleTaskStatus}
                >
                    <p className="text-2xl">Nombre de tâches assignées : {numTasksAssignedToMe}</p>
                </div>
                <div
                    style={{ marginLeft: "30px", marginRight: "auto", marginTop: "100px" }}
                    className="bg-blue-400   text-white font-bold py-12 px-12 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    onClick={toggleProjects}
                >
                    <p className="text-2xl">Nombre de projets assignés : {numProjetsAssignedToMe}</p>
                </div>
            </div>
            {showProjects && (
                <div className="mt-4 bg-green-100 p-4 rounded-lg shadow-md dark:bg-gray-700">
                    <h2 className="text-xl mb-4 ">Projets :</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {projets.map((projet, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-400">
                                {projet.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {showTaskStatus && (
                <div className="mt-4 bg-green-100 p-4 rounded-lg shadow-md dark:bg-gray-700">
                    <h2 className="text-xl mb-4">Statut des tâches :</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-400">
                            <p className="text-lg">En cours : {numTasksInProgress}</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-400">
                            <p className="text-lg">Terminée : {numTasksCompleted}</p>
                        </div>
                    </div>
                </div>
            )}
            <br></br>
            <h2 className="text-xl mb-4">Nouvelles tâches pour vous :</h2>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-purple-500 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th scope="col" class="px-6 py-3">Tâche</th>
                    <th scope="col" class="px-6 py-3">Description</th>
                    <th scope="col" class="px-6 py-3">Projet</th>
                    </tr>
                </thead>
                <tbody>
                    {showAllTasks ? tasks.map((data) => (
                        <tr key={data._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.tache}</th>
                            <td class="px-6 py-4">{data.description}</td>
                            <td class="px-6 py-4">{data.projet}</td>
                        </tr>
                    )) : task.map((data) => (
                        <tr key={data._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.tache}</th>
                            <td class="px-6 py-4">{data.description}</td>
                            <td class="px-6 py-4">{data.projet}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <button
                onClick={handleVoirPlusClick}
                className=" "
            >
                {showAllTasks ? 'Voir moins' : 'Voir plus'}
            </button>
        </div>
    );
};

export default Accueil;
