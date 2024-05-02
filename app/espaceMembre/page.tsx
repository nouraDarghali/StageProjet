/*import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><div id="menu">
        </div>{children}</body>
    </html>
  );
}
*/
// Ajoutez cette ligne pour marquer le composant comme un composant côté client
// use client

// use client
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faChartLine, faProjectDiagram, faUserFriends, faClipboardList, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { useRouter } from 'next/router';
// Importer useNavigation depuis next/navigation
import React, { useState, useEffect } from 'react';
import ProjetPage from "./statut-tache/page";
import TableauDeBordPage from "./calendrier/page";
import MembrePage from "./taches/page";
import RapportPage from "./fichiers/page";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <div id="menu">
            <button className="menu-button">
              <a className="menu-button" href="/">
                <FontAwesomeIcon icon={faHome} className="menu-icon" />
                Accueil
              </a>
            </button>
            <button className="menu-button">
  <a className="menu-button" href="/espaceMembre/taches">
    <FontAwesomeIcon icon={faTasks} className="menu-icon" />
    Tâches
  </a>
</button>
<button className="menu-button">
    <a className="menu-button" href="/espaceMembre/calendrier">
        <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
        Calendrier
    </a>
</button>
            <button className="menu-button">
              <a className="menu-button" href="/espaceMembre/fichiers">
              <FontAwesomeIcon icon={faFileAlt} className="menu-icon" />
                 Fichiers
              </a>
            </button>
            <button className="menu-button">
    <a className="menu-button" href="/espaceMembre/statut-tache">
        <FontAwesomeIcon icon={faFlag} className="menu-icon" />
        Statut des tâches
    </a>
</button>

            <div className="menu-button" >
              <a className="menu-button" href="/">
                <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
                Déconnexion
              </a>
            </div>
          </div>

          <div id="resultat">
          </div>

        </div>
        {children}
      </body>
    </html>
  );
}