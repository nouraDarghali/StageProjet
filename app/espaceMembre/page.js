
// "use client";
// import React, { useState,useEffect  } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faTasks, faCalendarAlt, faFileAlt, faFlag, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// import Accueil from './accueil/page';
// import Taches from './taches/page';
// import Calendiers from './calendrier/page';
// import Fichier from './fichiers/page';
// import Statut from './statut-tache/page';
// export default function RootLayout({ children }) {
    
//     const storedPage = localStorage.getItem('selectedPage') || 'Accueil';
//     const [selectedPage, setSelectedPage] = useState(storedPage);
//     useEffect(() => {
//         localStorage.setItem('selectedPage', selectedPage);
//     }, [selectedPage]);

//     const handleMenuClick = (page) => {
//         setSelectedPage(page);
//     };
//     return (
//         <html lang="en">
//             <body>
            
                // <div className="container">
                //     <div id="menu">
                        // <button className={`menu-button ${selectedPage === 'Accueil' ? 'menu-button-selected' : ''}`} onClick={() => handleMenuClick('Accueil')}>
                        //     <FontAwesomeIcon icon={faHome} className="menu-icon" />
                        //     Accueil
                        // </button>
                //         <br />
                //         <button className={`menu-button ${selectedPage === 'Taches' ? 'menu-button-selected' : ''}`} onClick={() => handleMenuClick('Taches')}>
                //             <FontAwesomeIcon icon={faTasks} className="menu-icon" />
                //             Tâches
                //         </button>
                //         <br />
                //         <button className={`menu-button ${selectedPage === 'Calendiers' ? 'menu-button-selected' : ''}`} onClick={() => handleMenuClick('Calendiers')}>
                //             <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
                //             Calendrier
                //         </button>
                //         <br />
                //         <button className={`menu-button ${selectedPage === 'Fichier' ? 'menu-button-selected' : ''}`} onClick={() => handleMenuClick('Fichier')}>
                //             <FontAwesomeIcon icon={faFileAlt} className="menu-icon" />
                //             Fichiers
                //         </button>
                //         <br />
                //         <button className={`menu-button ${selectedPage === 'Statut' ? 'menu-button-selected' : ''}`} onClick={() => handleMenuClick('Statut')}>
                //             <FontAwesomeIcon icon={faFlag} className="menu-icon" />
                //             Statut des tâches
                //         </button>
                //         <br />
                //         <div className="menu-button">
                //             <a href="/">
                //                 <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
                //                 Déconnexion
                //             </a>
                //         </div>
                //     </div>

                //     {/* Render the selected page */}
                //     {selectedPage === 'Accueil' && <Accueil />}
                //     {selectedPage === 'Taches' && <Taches />}
                //     {selectedPage === 'Calendiers' && <Calendiers />}
                //     {selectedPage === 'Fichier' && <Fichier />}
                //     {selectedPage === 'Statut' && <Statut />}
                // </div>
//                 {children}
//             </body>
//         </html>
//     );
// }
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Vous pouvez utiliser l'état du thème ici si nécessaire
  }, [theme]);

  return (
    <div >
    </div>
  );
}
