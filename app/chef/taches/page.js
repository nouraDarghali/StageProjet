"use client";
import React, { useState, useEffect } from "react";
import FormTache from '../components/form_2';
import Table from '../components/table_2';
import Layout from '../components/layout';

export default function TachesPage() {
    const [showForm, setShowForm] = useState(false);
    const [projets, setProjets] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [taches, setTaches] = useState([]);

    const fetchTaches = async () => {
        try {
            const response = await fetch('/api/tache');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des tâches');
            }
            const data = await response.json();
            setTaches(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchProjets = async () => {
        try {
            const response = await fetch('/api/projets');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des projets');
            }
            const data = await response.json();
            setProjets(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchUtilisateurs = async () => {
        try {
            const response = await fetch('/api/utilisateurs');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des utilisateurs');
            }
            const data = await response.json();
            setUtilisateurs(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchProjets();
        fetchUtilisateurs();
        fetchTaches();
    }, []);

    const handleFormSubmit = () => {
        fetchTaches();
        setShowForm(false);
    };

    return (
        <>
            <Layout>
                <p className="text-gray-700 text-3xl mb-16 font-bold"></p>
                <div className="grid col-1 bg-white h-auto shadow-sm">
                    <div className="p-4">
                        <button
                            className='bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800'
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? 'Annuler' : 'Ajouter Tâche'}
                        </button>
                    </div>
                    <div className="container mx-auto">
                        <div className={`${showForm ? 'p-4' : 'hidden'}`}>
                            <FormTache onSubmit={handleFormSubmit} projets={projets} utilisateurs={utilisateurs} />
                        </div>
                        <div className="py-4">
                            {!showForm && <Table taches={taches} onEdit={() => { }} onDelete={() => { }} />}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}