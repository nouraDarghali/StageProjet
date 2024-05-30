import React, { useState, useEffect } from 'react';

export default function Form({ onSubmit, projet }) {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [responsable, setResponsable] = useState('');
    const [chefProjet, setChefProjet] = useState('');
    const [status, setStatus] = useState('');
    const [responsables, setResponsables] = useState([]);
    const [chefsProjet, setChefsProjet] = useState([]);

    useEffect(() => {
        fetch('/api/utilisateurs')
            .then(response => response.json())
            .then(data => {
                setResponsables(data.responsables);
                setChefsProjet(data.chefsProjet);
            });

        if (projet) {
            setProjectName(projet.projet);
            setDescription(projet.description);
            setResponsable(projet.responsableProjet);
            setChefProjet(projet.chefProjet);
            setStatus(projet.statut);
        } else {
            // Réinitialiser le formulaire si aucun projet n'est sélectionné
            setProjectName('');
            setDescription('');
            setResponsable('');
            setChefProjet('');
            setStatus('');
        }
    }, [projet]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newProjet = {
            projet: projectName,
            description,
            responsableProjet: responsable,
            chefProjet,
            statut: status
        };

        const method = projet ? 'PUT' : 'POST';
        const url = projet ? `/api/projets/${projet._id}` : '/api/projets';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProjet),
        });
        if (response.ok) {
            onSubmit();
        } else {
            // Handle error
            console.error('Erreur lors de la soumission du formulaire');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 w-4/6 gap-4">
            <div className="input-type">
                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} name="projectName" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Projet" />
            </div>
            <div className="input-type">
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="description" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Description" />
            </div>
            <div className="input-type">
                <select value={responsable} onChange={(e) => setResponsable(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md">
                    <option value="">Sélectionner le responsable du projet</option>
                    {responsables.map((user, index) => (
                        <option key={index} value={user.nom}>{user.nom}</option>
                    ))}
                </select>
            </div>
            <div className="input-type">
                <select value={chefProjet} onChange={(e) => setChefProjet(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md">
                    <option value="">Sélectionner le chef du projet</option>
                    {chefsProjet.map((user, index) => (
                        <option key={index} value={user.nom}>{user.nom}</option>
                    ))}
                </select>
            </div>
            <div className="input-type">
                <input type="date" name="date" className="border px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input type="radio" value="A faire" id="radioDefault1" name="status" checked={status === 'A faire'} onChange={(e) => setStatus(e.target.value)} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                        A faire
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" value="En Cours" id="radioDefault2" name="status" checked={status === 'En Cours'} onChange={(e) => setStatus(e.target.value)} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800">
                        En Cours
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" value="Terminé" id="radioDefault3" name="status" checked={status === 'Terminé'} onChange={(e) => setStatus(e.target.value)} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault3" className="inline-block text-gray-800">
                        Terminé
                    </label>
                </div>
            </div>

            <button type="submit" className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">{projet ? 'Mettre à jour' : 'Ajouter'}</button>
        </form>
    );
}
