import { BiEdit, BiTrashAlt } from "react-icons/bi";

export default function Table({ projets, onEdit, onDelete }) {
    const handleEditClick = (projet) => {
        onEdit(projet);
    };

    const handleDeleteClick = (projet) => {
        onDelete(projet._id);
    };

    return (
        <div className="flex justify-center items-center h-full">
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
                            <span className="text-gray-200">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-200">
                    {projets.map((projet, index) => (
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
                                <button className="cursor">
                                    <span className={`px-5 py-1 rounded-full ${projet.statut === 'A faire' ? 'bg-yellow-500' : projet.statut === 'En Cours' ? 'bg-blue-500' : 'bg-green-500'} text-white`}>{projet.statut}</span>
                                </button>
                            </td>
                            <td className="px-6 py-4 flex justify-around gap-5">
                                <button className="cursor" onClick={() => handleEditClick(projet)}>
                                    <BiEdit size={25} color={"rgb(34,197,94)"} />
                                </button>
                                <button className="cursor" onClick={() => handleDeleteClick(projet)}>
                                    <BiTrashAlt size={25} color={"rgb(244,63,94)"} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}