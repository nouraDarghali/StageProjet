import React from 'react';
import { BiEdit, BiTrashAlt } from "react-icons/bi";

export default function Table({ taches, onEdit, onDelete }) {
    const handleEditClick = (tache) => {
        onEdit(tache);
    };

    const handleDeleteClick = (tache) => {
        onDelete(tache._id); // Assurez-vous que vous utilisez le bon identifiant pour la suppression
    };

    return (
        <div>
            <table className="w-full max-w-full table-auto">
                <thead>
                    <tr className="bg-indigo-500">
                        <th className="px-4 py-2">
                            <span className="text-gray-200">Tâche</span>
                        </th>
                        <th className="px-4 py-2">
                            <span className="text-gray-200">Projet</span>
                        </th>
                        <th className="px-4 py-2">
                            <span className="text-gray-200">Membre</span>
                        </th>
                        <th className="px-4 py-2">
                            <span className="text-gray-200">Statut</span>
                        </th>
                        <th className="px-4 py-2">
                            <span className="text-gray-200">Date de Début</span>
                        </th>
                        <th className="px-4 py-2">
                            <span className="text-gray-200">Date de Fin</span>
                        </th>
                        <th className="px-4 py-2">
                            <span className="text-gray-200">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-200">
                    {taches.map((tache, index) => (
                        <tr key={index} className="bg-gray-50 text-center">
                            <td className="px-4 py-3 flex flex-row items-center">
                                <span className="text-center ml-2 font-semibold">{tache.tache}</span>
                            </td>
                            <td className="px-4 py-3">
                                <span>{tache.projet}</span>
                            </td>
                            <td className="px-4 py-3">
                                <span>{tache.membre}</span>
                            </td>
                            <td className="px-4 py-3">
                                <span className={`px-3 py-1 rounded-full ${tache.statut === 'A faire' ? 'bg-yellow-500' : tache.statut === 'En cours' ? 'bg-blue-500' : 'bg-green-500'} text-white`}>
                                    {tache.statut}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <span>{tache.dateDebut}</span>
                            </td>
                            <td className="px-4 py-3">
                                <span>{tache.dateFin}</span>
                            </td>
                            <td className="px-4 py-3 flex justify-around gap-2">
                                <button className="cursor" onClick={() => handleEditClick(tache)}>
                                    <BiEdit size={20} color={"rgb(34,197,94)"} />
                                </button>
                                <button className="cursor" onClick={() => handleDeleteClick(tache)}>
                                    <BiTrashAlt size={20} color={"rgb(244,63,94)"} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
