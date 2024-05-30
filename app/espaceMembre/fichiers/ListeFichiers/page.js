
// import React, { useEffect, useState } from 'react';

// const ListeFichiers = () => {
//     // Déclarez un état local pour stocker les fichiers
//     const [fichiers, setFichiers] = useState([]);

//     // Effectuez une requête API pour récupérer les fichiers lors du montage du composant
//     useEffect(() => {
//         async function fetchFichiers() {
//             try {
//                 const response = await fetch('http://localhost:3000/espaceMembre/api/taches/fichiers');
//                 if (response.ok) {
//                     const data = await response.json();
//                     // Mettez à jour l'état local avec les données récupérées
//                     setFichiers(data.taches);
//                 }
//             } catch (error) {
//                 console.error('Erreur lors de la récupération des fichiers:', error);
//             }
//         }

//         fetchFichiers();
//     }, []);

//     // Afficher les fichiers sous forme de galerie
//     return (
//         <div className="gallery grid grid-cols-3 gap-4 p-4">
//             {fichiers.map((fichier) => (
//                 <div key={fichier._id} className="file-item bg-white rounded-md shadow-md p-2">
//                     {/* Afficher les fichiers en fonction de leur type */}
                    
//                         <img
//                             src={fichier.filename} // Assurez-vous d'avoir une propriété 'filepath' ou 'url' pour l'image
//                             alt={fichier.file}
//                             className="w-full h-auto rounded-md cursor-pointer"
//                             onClick={() => window.open(fichier.file, '_blank')} // Ouvrir l'image dans un nouvel onglet
//                         />
                     
//                         <div className="w-full h-auto rounded-md cursor-pointer" onClick={() => window.open(fichier.file, '_blank')}>
//                              {/* Afficher le nom du fichier */}
//                         </div>
                    
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ListeFichiers;

import React, { useEffect, useState } from 'react';

const ListeFichiers = () => {
    // Déclarez un état local pour stocker les fichiers
    const [fichiers, setFichiers] = useState([]);

    // Effectuez une requête API pour récupérer les fichiers lors du montage du composant
    useEffect(() => {
        async function fetchFichiers() {
            try {
                const response = await fetch('http://localhost:3000/espaceMembre/api/taches/fichiers');
                if (response.ok) {
                    const data = await response.json();
                    // Mettez à jour l'état local avec les données récupérées
                    setFichiers(data.taches);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des fichiers:', error);
            }
        }

        fetchFichiers();
    }, []);

    // Ouvrir le fichier dans un nouvel onglet lorsqu'il est cliqué
    const openFile = (file) => {
        window.open(file.file, '_blank');
    };

    // Afficher les fichiers sous forme de galerie
    return (
        <div className="gallery grid grid-cols-3 gap-4 p-4">
            {fichiers.map((fichier) => (
                <div key={fichier._id} className="file-item bg-white rounded-md shadow-md p-2">
                    {/* Afficher les fichiers en fonction de leur type */}
                    
                        <img
                            src={fichier.file} // Assurez-vous d'avoir une propriété 'filepath' ou 'url' pour l'image
                            alt={fichier.filename}
                            className="w-full h-auto rounded-md cursor-pointer"
                            onClick={() => openFile(fichier)} // Ouvrir l'image dans un nouvel onglet lors du clic
                        />
                     (
                        <div className="file-download">
                            <button onClick={() => openFile(fichier)}>{fichier.filename}</button>
                        </div>
                    )
                </div>
            ))}
        </div>
    );
};

export default ListeFichiers;
