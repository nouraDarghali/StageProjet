// app/components/SideBar.js
"use client";
import React, { useState, useEffect, forwardRef } from 'react';
import { HomeIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTasks, faCalendarAlt, faFileAlt, faFlag, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const SideBar = forwardRef(({ showNav, onSelectPage }, ref) => {
  const storedPage = localStorage.getItem('selectedPage') || '';
  const [selectedPage, setSelectedPage] = useState(storedPage);

  useEffect(() => {
    localStorage.setItem('selectedPage', selectedPage);
  }, [selectedPage]);

  const handleMenuClick = (page) => {
    setSelectedPage(page);
    onSelectPage(page);
  };
  return (
    <div ref={ref} className="fixed w-64 h-full bg-white shadow-md dark:bg-gray-900">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto"
            src="/logo02.png"
            alt="company logo"
          />
        </picture>
      </div>
      <div className="flex flex-col">
        <div
          className={`pl-6 py-3 mx-5 rounded-lg text-center dark:text-white cursor-pointer mb-3 flex items-center transition-all duration-300 
            ${selectedPage === 'Accueil' ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-purple-500 hover:text-white'}`}
          onClick={() => handleMenuClick('Accueil')}
        >
          <div className="mr-2">
            <HomeIcon className="h-5 w-5" />
          </div>
          <div>Accueil</div>
        </div>
        <div
          className={`pl-6 py-3 mx-5 rounded-lg text-center dark:text-white cursor-pointer mb-3 flex items-center transition-all duration-300 
            ${selectedPage === 'Taches' ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-purple-500 hover:text-white'}`}
          onClick={() => handleMenuClick('Taches')}
        >
          <div className="mr-2">
          <FontAwesomeIcon icon={faTasks} className="h-5 w-5" />
          </div>
          <div>Tâches</div>
        </div>
        <div
          className={`pl-6 py-3 mx-5 rounded-lg text-center dark:text-white cursor-pointer mb-3 flex items-center transition-all duration-300 
            ${selectedPage === 'Statut' ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-purple-500 hover:text-white'}`}
          onClick={() => handleMenuClick('Statut')}
        >
          <div className="mr-2">
          <FontAwesomeIcon icon={faFlag} className="h-5 w-5" />
          </div>
          <div>Statut des tâches</div>
        </div>
        <div
          className={`pl-6 py-3 mx-5 rounded-lg text-center dark:text-white cursor-pointer mb-3 flex items-center transition-all duration-300 
            ${selectedPage === 'Calendiers' ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-purple-500 hover:text-white'}`}
          onClick={() => handleMenuClick('Calendiers')}
        >
          <div className="mr-2">
          <FontAwesomeIcon icon={faCalendarAlt} className="h-5 w-5" />
          </div>
          <div>Calendrier</div>
        </div>
        <div
          className={`pl-6 py-3 mx-5 rounded-lg text-center  dark:text-white cursor-pointer mb-3 flex items-center transition-all duration-300 
            ${selectedPage === 'Fichier' ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-purple-500 hover:text-white'}`}
          onClick={() => handleMenuClick('Fichier')}
        >
          <div className="mr-2">
          <FontAwesomeIcon icon={faFileAlt} className="h-5 w-5" />
          </div>
          <div>Fichiers</div>
        </div>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;


