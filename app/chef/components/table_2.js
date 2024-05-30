import React from 'react';

export default function Table({ projets = [] }) {
    return (
        <div>
            <table className="w-full max-w-full table-auto">
                <thead>
                    <tr className="bg-indigo-500">
                        <th className="px-6 py-3">
                            <span className="text-gray-200">Projet</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="text-gray-200">Description</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="text-gray-200">Responsable du projet</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="text-gray-200">Chef du projet</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="text-gray-200">Statut</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="text-gray-200">Date de Départ</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="text-gray-200">Date de Fin</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-200">
                    {Array.isArray(projets) && projets.length > 0 ? (
                        projets.map((projet, index) => (
                            <tr key={index} className="bg-gray-50 text-center">
                                <td className="px-6 py-4 flex flex-row items-center">
                                    <span className="text-center ml-2 font-semibold">{projet.projet}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span>{projet.description}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span>{projet.responsableProjet}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span>{projet.chefProjet}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-5 py-1 rounded-full ${projet.statut === 'A faire' ? 'bg-yellow-500' : projet.statut === 'En Cours' ? 'bg-blue-500' : 'bg-green-500'} text-white`}>
                                        {projet.statut}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span>{projet.dateDepart}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span>{projet.dateFin}</span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                Aucun projet disponible
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
