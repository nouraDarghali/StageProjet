
/*import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartLine, faProjectDiagram, faUserFriends, faClipboardList, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div id="menu">
        <Link href="/">
          <button  style={{ color: '#66AAF9' }}>
            <FontAwesomeIcon icon={faHome} className="menu-icon" />
            Accueil
          </button>
        </Link>
        <Link href="/espaceAdmin/tableau-de-bord">
          <button   style={{ color: '#45D483' }}>
            <FontAwesomeIcon icon={faChartLine} className="menu-icon" />
            Tableau de bord
          </button>
        </Link>
        <Link href="/espaceAdmin/projet">
          <button style={{ color: '#66AAF9' }}>
            <FontAwesomeIcon icon={faProjectDiagram} className="menu-icon" />
            Projet
          </button>
        </Link>
        <Link href="/espaceAdmin/membre">
          <button  style={{ color: '#45D483' }}>
            <FontAwesomeIcon icon={faUserFriends} className="menu-icon" />
            Membre
          </button>
        </Link>
        <Link href="/espaceAdmin/rapport">
          <button style={{ color: '#66AAF9' }}>
            <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />
            Rapport et analyse
          </button>
        </Link>
        <div>
          <Link href="/">
            <button  style={{ color: '#45D483' }}>
              <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
              Déconnexion
            </button>
          </Link>
        </div>
      </div>
      


      <div id="resultat">
        {children}
      </div>
    </div>
  );
}
 */
/*
"use client"
import dynamic from 'next/dynamic'; 
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartLine, faProjectDiagram, faUserFriends, faClipboardList, faSignOutAlt, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import React, { useState, ReactNode } from 'react'; // Importez ReactNode
import ProjetPage from "./page";
import TableauDeBordPage from "./tableau-de-bord/page";
import MembrePage from "./membre/page";
import RapportPage from "./rapport/page";

const inter = Inter({ subsets: ["latin"] });


interface RootLayoutProps {
  children: ReactNode; // Utilisez ReactNode pour typage children
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <html lang="en" className={isDarkMode ? 'dark' : 'light'}>
      <body className={`${inter.className} ${isDarkMode ? 'dark' : 'light'}`}>
        <div>
          <div id="menu">
           
            <button>
              <a className="menu-button" href="/espaceAdmin/tableau-de-bord">
                <FontAwesomeIcon icon={faChartLine} className="menu-icon" />
                <span className="">Tableau de bord</span>
              </a>
            </button>
            <button>
              <a className="menu-button" href="/espaceAdmin/projet">
                <FontAwesomeIcon icon={faProjectDiagram} className="menu-icon" />
                <span className="">Projet</span>
              </a>
            </button>
            <button>
              <a className="menu-button" href="/espaceAdmin/membre">
                <FontAwesomeIcon icon={faUserFriends} className="menu-icon" />
                <span className="sr-only">Membre</span>
              </a>
            </button>
            <button>
              <a className="menu-button" href="/espaceAdmin/rapport">
                <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />
                <span className="sr-only">Rapport et analyse</span>
              </a>
            </button>
           

            <div>
              <a href="/">
                <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
                <span className="sr-only">Déconnexion</span>
              </a>
            </div>
          </div>

<div id="menuM">

<button>
  <a onClick={toggleDarkMode} className="toggle-theme-button" title="Toggle theme">
    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="menu-icon" />
    <span className="sr-only text-green-500">Toggle theme</span>
  </a>
</button>
</div>
          <div id="resultat">
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}*/

"use client";
import dynamic from 'next/dynamic'; 
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox,faUser,faBell,faHome, faChartLine, faProjectDiagram, faUserFriends, faClipboardList, faSignOutAlt, faSun, faMoon, faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState, ReactNode } from 'react'; // Importez ReactNode
import ProjetPage from "./page";
import TableauDeBordPage from "./tableau-de-bord/page";
import MembrePage from "./membre/page";
import RapportPage from "./rapport/page";
//import NotificationsPage from "./objectifs/page";
import picture from '../public/Gestion_des_projets__1_-removebg-preview.png';




const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode; // Utilisez ReactNode pour typage children
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true); // État pour l'affichage du menu

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible); // Change l'état de l'affichage du menu
  };

  return (
    <html lang="en" className={isDarkMode ? 'dark' : 'light'}>
      <body className={`${inter.className} ${isDarkMode ? 'dark' : 'light'}`}>
        <div>

          <div id="menu" className={isMenuVisible ? 'visible' : 'hidden'}>
          <h1 className='text-white'>----------</h1>
            <button className='border-l-4 border-transparent hover:border-blue-400'>
              <a className="menu-button" href="/espaceAdmin/tableau-de-bord">
                <FontAwesomeIcon icon={faChartLine} className="menu-icon " />
                <span className="text-black ">Tableau de bord</span>
              </a>
            </button>
            <button className='border-l-4 border-transparent hover:border-blue-400'>
              <a className="menu-button" href="/espaceAdmin/projet">
                <FontAwesomeIcon icon={faProjectDiagram} className="menu-icon" />
                <span className="text-black ">Projet</span>
              </a>
            </button>
            <button className='border-l-4 border-transparent hover:border-blue-400'>
              <a className="menu-button" href="/espaceAdmin/users">
                <FontAwesomeIcon icon={faUserFriends} className="menu-icon" />
                <span className="text-black">Membre</span>
              </a>
            </button>
            <button className='border-l-4 border-transparent hover:border-blue-400'>
              <a className="menu-button" href="/espaceAdmin/rapport">
                <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />
                <span className="text-black">Rapport et analyse</span>
              </a>
            </button>
            <div>
            <button>
              <a className="menu-button" href="">
                <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
                <span className="text-black">connexion</span>
              </a></button>
            </div>
          </div>
          <div id="menuM">
  <div className="left-section">
  
    <button onClick={toggleMenu} className="menuM-button" title="Toggle menu">
      <FontAwesomeIcon icon={faBars} className="menuM-icon" />
      <span className="sr-only text-black font-bold">Toggle menu</span>
    </button>
    <div>
      <img src="logo02.png" alt="Description de l'image" width={60} height={60} />
    </div>
    
   
  </div>
  <div className="right-section">
  
    <button className="menuM-button" title="Notifications  ">
      <a className="menu-button" href="/espaceAdmin/objectifs">
      <FontAwesomeIcon icon={faBell} className="menuM-icon"/>
      <span className="sr-only">Notifications</span>
      </a>
    </button>
    <button onClick={toggleDarkMode} className="menuM-button" title="Toggle theme">
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="menuM-icon" />
      <span className="sr-only">Toggle theme</span>
    </button>
    <button className="menuM-button" title="Profile">
      <FontAwesomeIcon icon={faUser} className="menuM-icon" />
      <span className="sr-only">Profile</span>
    </button>
    
  </div>
</div>

          <div id="resultat" className={isMenuVisible ? 'menu-visible' : 'menu-hidden'}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

