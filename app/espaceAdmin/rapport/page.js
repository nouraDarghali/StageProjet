// projet.js
/*
const RapportPage = () => {
    return (
        <div id="resultat">
            <h1 className="titre">RAPPORT</h1>
            <p>Contenu de la page Projet ici...</p>
        </div>
    );
};

export default RapportPage;*/


// RapportPage.jsx

"use client"
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import Layout from '../Layout';
import "../globals.css";

const ResultSection = ({ children }) => (
  <div className="my-8 flex justify-center items-center ml-9">
    <div className="rounded-lg bg-gray-200 dark-bg-gray-200 p-8">
      {children}
    </div>
  </div>
);

const RapportTable = ({ rapports }) => (
  <ResultSection>
    <div className="my-8 flex justify-center items-center">
      <h2 className="hover:text-green-500 text-xl font-bold mb-5 text-blue-500">Liste des Rapports</h2>
      <h1 className="text-gray-700">-</h1> 
    </div>
    <table className="w-full border-collapse rounded-lg overflow-hidden rounded-lg">
      <thead>
        <tr className="bg-[#b9bbbd] rounded-lg border-l-4 border-blue-400 h-30" style={{ fontSize: "1.5rem" ,
          font:"unset"}}>
          
          <th className="px-4 py-2 text-black">Nom Rapport</th>
          <th className="px-4 py-2 text-black">Contenu</th>
          <th className="px-4 py-2 text-black">Date de Création</th>
          <th className="px-4 py-2 text-black">Auteur</th>
          <th className="px-4 py-2 text-black">Projet</th>
        </tr>
      </thead>
      <tbody>
        {rapports.map((rapport, index) => (
          <tr key={index} className="hover:bg-[#b9bbbd] transition-colors duration-300 ease-in-out border-l-4 border-blue-400 hover:border-green-400 text-black " style={{ fontSize: "1.5rem" ,
          font:"unset"}}>
            
            <td className="px-4 py-2">{rapport.nom_rapport}</td>
            <td className="px-4 py-2">{rapport.contenu}</td>
            <td className="px-4 py-2">{rapport.date_creation}</td>
            <td className="px-4 py-2">{rapport.auteur}</td>
            <td className="px-4 py-2">{rapport.projet}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </ResultSection>
);

const COLORS = ['#006FEE', '#00C49F', '#FFBB28', '#FF8042', '#AA44AA'];

const RapportPage = () => {
  const [rapports, setRapports] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
  const [dataByProject, setDataByProject] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  

useEffect(() => {
  const fetchRapports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rapports');
      setRapports(response.data);
    } catch (error) {
      console.error('Error fetching rapports:', error);
    }
  };
  fetchRapports();
}, []);

useEffect(() => {
  const countUnread = () => {
    const unread = rapports.filter(rapport => !rapport.lu).length;
    setUnreadCount(unread);
    if (unread > 0) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(true);
      }, 3000); // Hide notification after 3 seconds
    }
  };

  const aggregateDataByProject = () => {
    const projectData = rapports.reduce((acc, rapport) => {
      const project = rapport.projet;
      if (!acc[project]) {
        acc[project] = 0;
      }
      acc[project]++;
      return acc;
    }, {});

    const data = Object.keys(projectData).map(project => ({
      name: project,
      value: projectData[project],
    }));

    setDataByProject(data);
  };

  countUnread();
  aggregateDataByProject();
}, [rapports]);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projets');
      setProjectCount(response.data.length);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  fetchProjects();
}, []);


const ResultSection = ({ children }) => (
  

  <div className="my-8 flex justify-center items-center">
     <div className= "rounded-lg bg-gray-200 dark-bg-gray-200 p-8 hover:bg-gray-300 text-black transition-transform duration-300 hover:scale-105" style={{ fontSize: "1.5rem" ,
          font:"unset"}}>
      {children}
    </div></div>
  
);
  return (
   <div className='menu-container flex justify-center items-center'>
    
     <Layout className='items-center'>
     <h1 className="text-white">-</h1>
     <h1 className="text-white">-</h1>
    
     <div className="flex justify-center flex items-center">
  <div className="grid grid-cols-2 gap-1 justify-center flex items-center"> {/* Réduire l'espacement global avec gap-1 */}
    <ResultSection>
      <h6 className="text-xl font-bold mb-5 text-blue-500" style={{ fontSize: "1.5rem", fontWeight: "bold", font: "unset" }}
>Distribution des Rapports par Projet</h6>
      <PieChart width={400} height={200}>
        <Pie
          data={dataByProject}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={30}
          fill="#3F3F46"
          dataKey="value"
        >
          {dataByProject.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResultSection>
    <div className="grid grid-cols-1 gap-5 ml-auto">
    <ResultSection className="ml-9">
      <div className="flex items-center">
        <div className='rounded-full bg-green-500 text-white px-4 py-2'>
          {showNotification && (
            <div>
              {unreadCount}
            </div>
          )}
        </div>
        <div className="text-black hover: text-black ml-2">` rapports ajoutés `</div>
      </div>
    </ResultSection>
    <ResultSection className="ml-9">
      <div className="flex items-center">
        <div className="rounded-full bg-blue-500 text-white px-4 py-2">
          {projectCount}
        </div>
        <a className="menu-button" href="/espaceAdmin/projet">
        <p className="text-black hover: text-black">` projets disponibles `</p></a>
      </div>
    </ResultSection></div>
  </div></div>
  <RapportTable 
    rapports={rapports} 
  />
  <br />
</Layout></div>

    
  );
};

export default RapportPage;
