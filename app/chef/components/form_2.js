import React, { useState } from 'react';

export default function FormTache({ onSubmit, projets, utilisateurs }) {
    const [projet, setProjet] = useState('');
    const [description, setDescription] = useState('');
    const [membre, setMembre] = useState('');
    const [statut, setStatut] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [tache, setTache] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nouvelleTache = {
            tache,
            projet,
            description,
            membre,
            statut,
            dateDebut,
            dateFin
        };

        const response = await fetch('/api/tache', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nouvelleTache),
        });
        if (response.ok) {
            onSubmit();
        } else {
            console.error('Erreur lors de la soumission du formulaire');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 w-4/6 gap-4">
            <div className="input-type">
                <input
                    type="text"
                    value={tache}
                    onChange={(e) => setTache(e.target.value)}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                    placeholder="Tâche"
                />
            </div>
            <div className="input-type">
                <select
                    value={projet}
                    onChange={(e) => setProjet(e.target.value)}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                >
                    <option value="">Sélectionner le projet</option>
                    {projets && projets.map((projet, index) => (
                        <option key={index} value={projet._id}>{projet.projet}</option>
                    ))}
                </select>
            </div>
            <div className="input-type">
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                    placeholder="Description"
                />
            </div>
            <div className="input-type">
                <select
                    value={membre}
                    onChange={(e) => setMembre(e.target.value)}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                >
                    <option value="">Sélectionner le membre</option>
                    {utilisateurs && utilisateurs.membres && utilisateurs.membres.map((membre, index) => (
                        <option key={index} value={membre._id}>{membre.nom}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center">
                <div className="form-check">
                    <input
                        type="radio"
                        value="A faire"
                        id="radioAfaire"
                        name="statut"
                        checked={statut === 'A faire'}
                        onChange={(e) => setStatut(e.target.value)}
                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    />
                    <label htmlFor="radioAfaire" className="inline-block text-gray-800">
                        A faire
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        value="En cours"
                        id="radioEncours"
                        name="statut"
                        checked={statut === 'En cours'}
                        onChange={(e) => setStatut(e.target.value)}
                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    />
                    <label htmlFor="radioEncours" className="inline-block text-gray-800">
                        En cours
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        value="Terminé"
                        id="radioTermine"
                        name="statut"
                        checked={statut === 'Terminé'}
                        onChange={(e) => setStatut(e.target.value)}
                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    />
                    <label htmlFor="radioTermine" className="inline-block text-gray-800">
                        Terminé
                    </label>
                </div>
            </div>
            <div className="input-type">
                <input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
            </div>
            <div className="input-type">
                <input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
            </div>
            <button
                type="submit"
                className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
            >
                Ajouter Tâche
            </button>
        </form>
    );
}
