
/*"use client";
import Layout from '../Layout';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiMenu, FiCheckCircle } from 'react-icons/fi';
import { FaTrashAlt, FaEdit } from "react-icons/fa"; 
import "../globals.css";

const ProjetTable = ({ projets, deleteProjet, showUpdateFormFor, updateProjet }) => {
  const ResultSection = ({ children }) => (
    <div className="bg-gray-200 flex justify-start items-center w-full h-auto ml-4">
      <div className="w-full">
        {children}
      </div>
    </div>
  );
  return (
    <ResultSection>
      <div className="rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold mb-4 text-blue-400 hover:text-green-500">Liste des Projets</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#b9bbbd] rounded-lg border-l-4 border-blue-400">
              <th className="px-4 py-2 text-black">Code</th>
              <th className="px-4 py-2 text-black">Projet</th>
              <th className="px-4 py-2 text-black">Description</th>
              <th className="px-4 py-2 text-black">Responsable</th>
              <th className="px-4 py-2 text-black">Chef de Projet</th>
              <th className="px-4 py-2 text-black">Équipe</th>
              <th className="px-4 py-2 text-black">Date de Début</th>
              <th className="px-4 py-2 text-black">Statut</th>
              <th className="px-4 py-2 text-black">Étape</th>
              <th className="px-4 py-2 text-black">Événement</th>
              <th className="px-4 py-2 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projets.map((projet) => (
              <tr key={projet.id} className="hover:bg-[#b9bbbd] transition-colors duration-300 ease-in-out border-l-4 border-blue-400 hover:border-green-400 text-black">
                <td className="px-4 py-2">{projet.id}</td>
                <td className="px-4 py-2">{projet.projet}</td>
                <td className="px-4 py-2">{projet.description}</td>
                <td className="px-4 py-2">{projet.responsable}</td>
                <td className="px-4 py-2">{projet.chef_projet}</td>
                <td className="px-4 py-2">{projet.equipe}</td>
                <td className="px-4 py-2">{projet.date_debut}</td>
                <td className="px-4 py-2">
                  {projet.statut === 'termine' ? (
                    <FiCheckCircle className="text-green-500" style={{ fontSize: "1.5rem" }} />
                  ) : (
                    <div className="bg-gradient-to-tr from-green-500 to-blue-500 text-white shadow-lg p-1 rounded-full" style={{ fontSize: "0.9rem" }}>
                      <span className="ml-2">{projet.statut}</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">{projet.etape}</td>
                <td className="px-4 py-2">{projet.evenement}</td>
                <td className="px-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <FaTrashAlt
                      className="text-red-500 cursor-pointer mr-2 bg-gray-200 p-1 rounded-md"
                      style={{ fontSize: "1.8rem" }}
                      onClick={() => deleteProjet(projet.id)}
                    />
                    <FaEdit
                      className="text-blue-500 cursor-pointer bg-gray-200 p-1 rounded-md"
                      style={{ fontSize: "1.8rem" }}
                      onClick={() => showUpdateFormFor(projet)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResultSection>
  );
};

const Boite_Reception = () => {
  const [projets, setProjets] = useState([]);
  const [projetToUpdate, setProjetToUpdate] = useState(null);

  useEffect(() => {
    fetchProjets();
  }, []);

  const fetchProjets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projets");
      setProjets(response.data);
    } catch (error) {
      console.error("Error fetching projets:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="my-8">
        <h1 className="text-2xl font-bold text-white mb-4">Gestion des Projets</h1>
        <AddProjetForm addProjet={addProjet} />
        <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold text-white mb-4">Liste des Projets</h2>
          {projets.length === 0 ? (
            <p className="text-gray-400">Aucun projet disponible.</p>
          ) : (
            <ul>
              {projets.map((projet) => (
                <li key={projet.id} className="border-b border-gray-700 py-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-bold">{projet.projet}</p>
                      <p className="text-gray-400">{projet.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(projet)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProjet(projet.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {projetToUpdate && <UpdateProjetForm projetToUpdate={projetToUpdate} updateProjet={updateProjet} />}
    </div>
  );
};

export default Boite_Reception;*/

/*
import React from 'react';
import "../globals.css";
function NotificationsPage() {
  return (
    <div>
      <h1>Hello Next/JS</h1>
      
    </div>
  );
}

export default NotificationsPage;



// NotificationsPage.js

"use client"
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';
import Layout from '../Layout';
import '../globals.css'; // Assurez-vous d'inclure Tailwind CSS dans votre projet

const TableauDeBordPage = () => {
  const [projectData, setProjectData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [historique, setHistorique] = useState([]); // Ajouter un état pour l'historique
  const projectByMonthChartRef = useRef(null);
  const projectStatusChartRef = useRef(null);
  const teamProjectChartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets');
        setProjectData(response.data);
        updateHistorique('Chargement des projets');
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (projectData.length) {
      renderProjectByMonthChart();
      renderProjectStatusChart();
      renderTeamProjectChart();
    }
  }, [projectData]);

  const renderProjectByMonthChart = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const projectsByMonth = Array(12).fill(0);

    projectData.forEach(project => {
      const monthIndex = new Date(project.date_debut).getMonth();
      projectsByMonth[monthIndex]++;
    });

    const ctx = document.getElementById('projectByMonthChart');

    if (projectByMonthChartRef.current) {
      projectByMonthChartRef.current.destroy();
    }

    projectByMonthChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Nombre de projets',
          data: projectsByMonth,
          backgroundColor: '#4F46E5',
          borderColor: '#4F46E5',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });

    updateHistorique('Affichage du graphique des projets par mois');
  };

  const renderProjectStatusChart = () => {
    const projectStatusCounts = {};

    projectData.forEach(project => {
      if (projectStatusCounts[project.statut]) {
        projectStatusCounts[project.statut]++;
      } else {
        projectStatusCounts[project.statut] = 1;
      }
    });

    const ctx = document.getElementById('projectStatusChart');

    if (projectStatusChartRef.current) {
      projectStatusChartRef.current.destroy();
    }

    projectStatusChartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(projectStatusCounts),
        datasets: [{
          label: 'Statut des projets',
          data: Object.values(projectStatusCounts),
          backgroundColor: ['#4F46E5', '#22D3EE', '#34D399', '#F59E0B'],
          borderColor: ['#4F46E5', '#22D3EE', '#34D399', '#F59E0B'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });

    updateHistorique('Affichage du graphique de statut des projets');
  };

  const renderTeamProjectChart = () => {
    const teamProjectCounts = {};

    projectData.forEach(project => {
      const teamMembers = project.equipe.split(',').map(member => member.trim());
      teamMembers.forEach(member => {
        if (teamProjectCounts[member]) {
          teamProjectCounts[member]++;
        } else {
          teamProjectCounts[member] = 1;
        }
      });
    });

    const ctx = document.getElementById('teamProjectChart');

    if (teamProjectChartRef.current) {
      teamProjectChartRef.current.destroy();
    }

    teamProjectChartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(teamProjectCounts),
        datasets: [{
          label: 'Nombre de projets par membre',
          data: Object.values(teamProjectCounts),
          backgroundColor: 'rgba(79, 70, 229, 0.2)',
          borderColor: '#4F46E5',
          borderWidth: 2,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: '#4F46E5',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(tooltipItem) {
                return ` ${tooltipItem.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    });

    updateHistorique('Affichage du graphique des projets par équipe');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const updateHistorique = (action) => {
    const now = new Date();
    const newHistorique = {
      action,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };
    setHistorique(prevHistorique => [...prevHistorique, newHistorique]);
  };

  const ResultSection = ({ children }) => (
    <div className="my-8 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105">
      {children}
    </div>
  );

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de Bord</h1>
          <button onClick={toggleDarkMode} className="text-gray-500 dark:text-gray-300">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ResultSection>
            <canvas id="projectByMonthChart" width="400" height="400"></canvas>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Répartition des projets par mois</p>
          </ResultSection>

          <ResultSection>
            <canvas id="projectStatusChart" width="400" height="400"></canvas>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Statut des projets</p>
          </ResultSection>

          <ResultSection>
            <canvas id="teamProjectChart" width="400" height="400"></canvas>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Répartition de l'équipe par nombre de projets</p>
          </ResultSection>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Historique des Actions</h2>
          <div className="mt-4 space-y-4">
            {historique.map((item, index) => (
              <div key={index} className="p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700">
                <p className="text-gray-900 dark:text-white">{item.action}</p>
                <p className="text-gray-600 dark:text-gray-300">{item.date} à {item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TableauDeBordPage;
*/
/*
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import "../globals.css";

const Objectifs = ({ projectId }) => {
  const [projectData, setProjectData] = useState({ projectsTermines: [], projectsEnCours: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets');
        const projetData = response.data;
        // Filtrer les projets terminés et en cours
        const projectsTermines = projetData.filter(projet => projet.statut === 'termine'); // Utilisez 'statut' au lieu de 'status'
        const projectsEnCours = projetData.filter(projet => projet.statut === 'En cours'); // Utilisez 'statut' au lieu de 'status'
        setProjectData({ projectsTermines, projectsEnCours });
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);
  const ProjetTable = ({ projets, deleteProjet, showUpdateFormFor ,updateProjet }) => {
    const ResultSection = ({ children }) => (
      <div className="bg-gray-200 flex justify-start items-center w-5/5 h-auto position-fixed ml-4">
        <div className="w-full">
          {children}
        </div>
      </div>)
      };
  // Dans votre rendu JSX
  return (
    <Layout>
    <div className="grid grid-cols-3 gap-4">
    <div className="grid grid-cols-3 gap-4" >
      {/* Section Projets Terminés 
      <div>
        <h2>Projets Terminés</h2>
        
        {projectData.projectsTermines.map(projet => (
          <div key={projet._id}>
            {/* Afficher les détails du projet terminé 
            <div>
              <h3>{projet.projet}</h3>
              <p>Description: {projet.description}</p>
              <p>Responsable: {projet.responsable}</p>
              <p>Chef de projet: {projet.chef_projet}</p>
              <p>Équipe: {projet.equipe}</p>
              <p>Équipe: {projet.statut}</p>
              <p>Date de délai: {projet.date_delais}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Ligne verticale 
      <div style={{ borderLeft: '1px solid black', height: '100px', margin: '0 20px' }}></div>
      {/* Section Projets en Cours 
      <div>
        <h2>Projets en Cours</h2>
        {projectData.projectsEnCours.map(projet => (
          <div key={projet._id}>
            {/* Afficher les détails du projet en cours 
            <div>
              <h3>{projet.projet}</h3>
              <p>Description: {projet.description}</p>
              <p>Responsable: {projet.responsable}</p>
              <p>Chef de projet: {projet.chef_projet}</p>
              <p>Équipe: {projet.equipe}</p>
              <p>Équipe: {projet.statut}</p>
              <p>Date de délai: {projet.date_delais}</p>
            </div>
          </div>
        ))}
      </div>
    </div></div></Layout>
  );
}

export default Objectifs;*/
/*
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import "../globals.css";



const Objectifs = ({ projectId }) => {
  const [projectData, setProjectData] = useState({ projectsTermines: [], projectsEnCours: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets');
        const projetData = response.data;
        // Filtrer les projets terminés et en cours
        const projectsTermines = projetData.filter(projet => projet.statut === 'termine');
        const projectsEnCours = projetData.filter(projet => projet.statut === 'En cours');
        setProjectData({ projectsTermines, projectsEnCours });
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  const renderProjectCard = (projet) => (
    <div className="gap-2 grid-cols-4">
    <div className="card max-w-sm border rounded-lg shadow-md p-4 mb-4" key={projet._id}>
      <div className="card-header flex justify-between items-center mb-2">
        <div className="flex grid-cols-2 gap-3">
          <div className="avatar bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
            <img className="rounded-full" src="https://nextui.org/avatars/avatar-1.png" alt="avatar" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{projet.projet}</h3>
            <p className="text-sm text-gray-500">Chef de projet: {projet.chef_projet}</p>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p><strong>Description:</strong> {projet.description}</p>
        <p><strong>Responsable:</strong> {projet.responsable}</p>
        <p><strong>Équipe:</strong> {projet.equipe}</p>
      
        <p><strong>Date de délai:</strong> {new Date(projet.date_delais).toLocaleDateString()}</p>
      </div>
    </div></div>
  );

  return (

    <Layout>
<h1 className='text-white'>-</h1>
<h1 className='text-white'>-</h1>
<h1 className='text-white'>-</h1>
<h1 className='text-white'>-</h1>
<h1 className='text-white'>-</h1>
<h1 className='text-white'>-</h1>


      <div>
      <h1 className="text-5xl font-bold mb-4 text-blue-500">Page des données Globales</h1>
      <img src="/objectif.png" alt="Page des données Globales" width="auto" height={900} />

    </div>
      
      
     <div className="gap-2 grid-cols-2">
      <div className="">
        {/* Section Projets Terminés
        <div>
          <h2 className="text-2xl font-bold mb-4">Projets Terminés</h2>
          {projectData.projectsTermines.map(renderProjectCard)}
        </div>
        {/* Ligne verticale 
        <div className="border-l border-gray-300"></div>
        {/* Section Projets en Cours
        <div>
          <h2 className="text-2xl font-bold mb-4">Projets en Cours</h2>
          {projectData.projectsEnCours.map(renderProjectCard)}
        </div>
        
      </div></div>
    </Layout>
  );
};

export default Objectifs;*/

/*
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import "../globals.css";

const Objectifs = ({ projectId }) => {
  const [projectData, setProjectData] = useState({ projectsTermines: [], projectsEnCours: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets');
        const projetData = response.data;
        // Filtrer les projets terminés et en cours
        const projectsTermines = projetData.filter(projet => projet.statut === 'termine');
        const projectsEnCours = projetData.filter(projet => projet.statut === 'En cours');
        setProjectData({ projectsTermines, projectsEnCours });
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  const renderProjectCard = (projet) => (
    <div className="card max-w-sm border rounded-lg shadow-md p-4 mb-4" key={projet._id}>
      <div className="card-header flex justify-between items-center mb-2">
        <div className="flex grid-cols-2 gap-3">
          <div className="avatar bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
            <img className="rounded-full" src="https://nextui.org/avatars/avatar-1.png" alt="avatar" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{projet.projet}</h3>
            <p className="text-sm text-gray-500">Chef de projet: {projet.chef_projet}</p>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p><strong>Description:</strong> {projet.description}</p>
        <p><strong>Responsable:</strong> {projet.responsable}</p>
        <p><strong>Équipe:</strong> {projet.equipe}</p>
        <p><strong>Date de délai:</strong> {new Date(projet.date_delais).toLocaleDateString()}</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1>

      <div>
        <h1 className="text-5xl font-bold mb-4 text-blue-500">Page des données Globales</h1>
        <img src="/objectif.png" alt="Page des données Globales" width="auto" height={900} />
      </div>
      <h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1>
      <div className="gap-2 grid-cols-3 justify-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Projets en Cours</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {projectData.projectsEnCours.map(renderProjectCard)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Objectifs;*/
/*
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import "../globals.css";

const Objectifs = ({ projectId }) => {
  const [projectData, setProjectData] = useState({ projectsTermines: [], projectsEnCours: [] });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projetResponse, memberResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/projets'),
          
        ]);

        const projetData = projetResponse.data;
        const projectsTermines = projetData.filter(projet => projet.statut === 'termine');
        const projectsEnCours = projetData.filter(projet => projet.statut === 'En cours');

        setProjectData({ projectsTermines, projectsEnCours });
        setMembers(memberResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderProjectCard = (projet) => (
    <div className="card max-w-sm border rounded-lg shadow-md p-4 mb-4" key={projet._id}>
      <div className="card-header flex justify-between items-center mb-2">
        <div className="flex grid-cols-2 gap-3">
          <div className="avatar bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
            <img className="rounded-full" src="https://nextui.org/avatars/avatar-1.png" alt="avatar" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{projet.projet}</h3>
            <p className="text-sm text-gray-500">Chef de projet: {projet.chef_projet}</p>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p><strong>Description:</strong> {projet.description}</p>
        <p><strong>Responsable:</strong> {projet.responsable}</p>
        <p><strong>Équipe:</strong> {projet.equipe}</p>
        <p><strong>Date de délai:</strong> {new Date(projet.date_delais).toLocaleDateString()}</p>
      </div>
    </div>
  );

 

  return (
    <Layout>
      <h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1>
      
     
      <div>
        
        <img src="/obj_f6-removebg-preview.png" alt="Page des données Globales" width="auto" height={900} />
      </div>
      <h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1>
      <div className="gap-2 grid-cols-3 justify-center">
        <div>
          <h2 className="text-2xl font-bold mb-4 ml-7">Projets en Cours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center ml-7">
            {projectData.projectsEnCours.map(renderProjectCard)}
          </div>
        </div>
      </div>
     
    </Layout>
  );
};

export default Objectifs;
*/
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import "../globals.css";

const Objectifs = ({ projectId }) => {
  const [projectsEnCours, setProjectsEnCours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projetResponse = await axios.get('http://localhost:5000/api/projets');
        const projetData = projetResponse.data;
        const projectsEnCours = projetData.filter(projet => projet.statut === 'En cours');
        setProjectsEnCours(projectsEnCours);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderProjectCard = (projet) => (
    <div className="card max-w-sm border rounded-lg shadow-md p-4 mb-4" key={projet._id}>
      <div className="card-header flex justify-between items-center mb-2">
        <div className="flex grid-cols-2 gap-3">
          <div className="avatar bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
            <img className="rounded-full" src="https://nextui.org/avatars/avatar-1.png" alt="avatar" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{projet.projet}</h3>
            <p className="text-sm text-gray-500">Chef de projet: {projet.chef_projet}</p>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p><strong>Description:</strong> {projet.description}</p>
        <p><strong>Responsable:</strong> {projet.responsable}</p>
        <p><strong>Équipe:</strong> {projet.equipe}</p>
        <p><strong>Date de délai:</strong> {new Date(projet.date_delais).toLocaleDateString()}</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1>
      <div>
        <img src="/obj_f6-removebg-preview.png" alt="Page des données Globales" width="auto" height={900} />
      </div>
      <h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1>
      <div className="gap-2 grid-cols-3 justify-center">
        <div>
          <h2 className="text-2xl font-bold mb-4 ml-7">Projets en Cours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center ml-7">
            {projectsEnCours.map(renderProjectCard)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Objectifs;

