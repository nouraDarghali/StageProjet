"use client";
import React, { useState, useEffect } from "react";
import Form from './components/form';
import Table from './components/table';
import Layout from './components/Layout';

export default function Home() {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    fetchProjets();
  }, []);

  const fetchProjets = async () => {
    const response = await fetch('/api/projets');
    const data = await response.json();
    setProjets(data);
  };

  const ajouterProjet = async (newProjet) => {
    const response = await fetch('/api/projets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProjet),
    });
    if (response.ok) {
      fetchProjets();
    } else {
      // Gérer les erreurs
    }
  };

  return (
    <>
      <Layout>
        <div>
          <p className="text-gray-700 text-3xl mb-16 font-bold"></p>
          {/* Sections des états des projets */}
          <div className="grid grid-cols-4 gap-5 mb-16">

            <div className="flex items-center justify-between rounded-lg bg-blue-400 h-24 shadow-lg transform hover:scale-105 p-4" style={{ height: "250%", width: "100%" }}>
              <span className="text-white text-3xl font-bold">12</span>
              <span className="text-white font-bold text-2xl"> Terminé</span>
            </div>

            {/* En cours */}
            <div className="flex items-center justify-between rounded-lg bg-green-400 h-24 shadow-lg transform hover:scale-105 p-4" style={{ height: "250%", width: "100%" }}>
              <span className="text-white text-3xl font-bold">7</span>
              <span className="text-white font-bold text-2xl"> En cours</span>
            </div>


            <div className="flex items-center justify-between rounded-lg bg-yellow-400 h-24 shadow-lg transform hover:scale-105 p-4" style={{ height: "250%", width: "100%" }}>
              <span className="text-white text-3xl font-bold">5</span>
              <span className="text-white font-bold text-2xl">Annulé</span>
            </div>

          </div>
        </div>

        <p className="text-gray-700 text-3xl mb-16 font-bold"></p>
        <br /><br /><br />

        {/* Intégrer la table des projets ici */}
        <div className="grid col-1 bg-white h-96 shadow-sm">
          <Table projets={projets} />
        </div>
      </Layout>
    </>
  );
}
