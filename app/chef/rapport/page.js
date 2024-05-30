"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';

export default function Rapport() {
    const [nomRapport, setNomRapport] = useState('');
    const [contenu, setContenu] = useState('');
    const [auteur, setAuteur] = useState('');
    const [projet, setProjet] = useState('');
    const [file, setFile] = useState(null);
    const [rapports, setRapports] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAjouterRapport = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('nomRapport', nomRapport);
        formData.append('contenu', contenu);
        formData.append('auteur', auteur);
        formData.append('projet', projet);

        try {
            const response = await axios.post('/api/rapport', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Rapport ajouté avec succès:', response.data);
            // Actualiser la liste des rapports après l'ajout
            // Vous devrez implémenter une méthode pour récupérer les rapports depuis l'API
        } catch (error) {
            console.error('Erreur lors de l\'ajout du rapport:', error);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto mt-10">
                <h1 className="text-3xl font-bold mb-6 text-center">Ajouter un rapport</h1>
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Nom du rapport"
                        value={nomRapport}
                        onChange={(e) => setNomRapport(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <textarea
                        placeholder="Contenu"
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Auteur"
                        value={auteur}
                        onChange={(e) => setAuteur(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Projet"
                        value={projet}
                        onChange={(e) => setProjet(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="mb-4"
                    />
                    <button
                        onClick={handleAjouterRapport}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Ajouter Rapport
                    </button>
                </div>

                <h1 className="text-3xl font-bold mt-10 mb-6 text-center">Liste des rapports</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-indigo-500">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nom du rapport</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Contenu</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Auteur</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Projet</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-200">
                            {rapports.length > 0 ? (
                                rapports.map((projet, index) => (
                                    <tr key={index} className="bg-white text-center border-b">
                                        <td className="px-6 py-4 whitespace-nowrap">{projet.nomRapport}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{projet.contenu}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{projet.auteur}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{projet.projet}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">Aucun rapport disponible</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
