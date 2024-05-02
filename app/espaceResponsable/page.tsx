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
import ProjetPage from "./projet/page";
import MembrePage from "./ressources/page";
import RapportPage from "./rapport/page";


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
              <a className="menu-button" href="/espaceResponsable//projet">
                <FontAwesomeIcon icon={faProjectDiagram} className="menu-icon" />
                Projet
              </a>
            </button>
            <button className="menu-button">
              <a className="menu-button" href="/espaceResponsable/ressources">
                <FontAwesomeIcon icon={faUserFriends} className="menu-icon" />
                Ressources
              </a>
              
            </button>
            <li>
              <a href="/humaines">Humaines</a>
              </li>
             <br />
             <li>
             <a href="/materiels">Matériels</a>
             </li>
            <button className="menu-button">
              <a className="menu-button" href="/espaceResponsable/rapport">
                <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />
                Rapport et analyse
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