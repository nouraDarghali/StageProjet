// 'use client';
// import './style.css';
// import SideBar from './components/SideBar';
// import TopBar from './components/TopBar';
// import { useState, useEffect, Fragment } from 'react';
// import { Transition } from '@headlessui/react';
// import { ThemeProvider } from 'next-themes';
// import Accueil from './accueil/page';
// import Taches from './taches/page';
// import Statut from './statut-tache/page';
// import Calendriers from './calendrier/page';
// import Fichier from './fichiers/page';

// export default function RootLayout({ children }) {
//   const [showNav, setShowNav] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [selectedPage, setSelectedPage] = useState('Accueil');

//   function handleResize() {
//     if (innerWidth <= 640) {
//       setShowNav(false);
//       setIsMobile(true);
//     } else {
//       setShowNav(true);
//       setIsMobile(false);
//     }
//   }

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       window.addEventListener('resize', handleResize);
//       handleResize(); // Initialize state based on initial window size
//     }

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const savedPage = localStorage.getItem('selectedPage');
//     if (savedPage) {
//       setSelectedPage(savedPage);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('selectedPage', selectedPage);
//   }, [selectedPage]);

//   const handleSelectPage = (page) => {
//     setSelectedPage(page);
//   };

//   return (
//     <ThemeProvider attribute="class">
//       <html>
//         <body>
//           <>
//             <TopBar showNav={showNav} setShowNav={setShowNav} />
//             <Transition
//               as={Fragment}
//               show={showNav}
//               enter="transform transition duration-[400ms]"
//               enterFrom="-translate-x-full"
//               enterTo="translate-x-0"
//               leave="transform duration-[400ms] transition ease-in-out"
//               leaveFrom="translate-x-0"
//               leaveTo="-translate-x-full"
//             >
//               <SideBar showNav={showNav} onSelectPage={handleSelectPage} />
//             </Transition>
//             <main className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? 'pl-56' : ''}`}>
//               <div className="px-4 md:px-16">
//                 {selectedPage === 'Accueil' && <Accueil />}
//                 {selectedPage === 'Taches' && <Taches />}
//                 {selectedPage === 'Statut' && <Statut />}
//                 {selectedPage === 'Calendiers' && <Calendriers />}
//                 {selectedPage === 'Fichier' && <Fichier />}
//                 {children}
//               </div>
//             </main>
//           </>
//         </body>
//       </html>
//     </ThemeProvider>
//   );
// }

'use client';
import './style.css';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { useState, useEffect, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { ThemeProvider } from 'next-themes';
import Accueil from './accueil/page';
import Taches from './taches/page';
import Statut from './statut-tache/page';
import Calendriers from './calendrier/page'; // Assurez-vous que le chemin est correct
import Fichier from './fichiers/page';

export default function RootLayout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Accueil');

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Initialize state based on initial window size
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const savedPage = localStorage.getItem('selectedPage');
    if (savedPage) {
      setSelectedPage(savedPage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedPage', selectedPage);
  }, [selectedPage]);

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  return (
    <ThemeProvider attribute="class">
      <html>
        <body>
          <>
            <TopBar showNav={showNav} setShowNav={setShowNav} />
            <Transition
              as={Fragment}
              show={showNav}
              enter="transform transition duration-[400ms]"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform duration-[400ms] transition ease-in-out"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <SideBar showNav={showNav} onSelectPage={handleSelectPage} />
            </Transition>
            <main className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? 'pl-56' : ''}`}>
              <div className="px-4 md:px-16">
                {selectedPage === 'Accueil' && <Accueil />}
                {selectedPage === 'Taches' && <Taches />}
                {selectedPage === 'Statut' && <Statut />}
                {selectedPage === 'Calendiers' && <Calendriers />}
                {selectedPage === 'Fichier' && <Fichier />}
                {children}
              </div>
            </main>
          </>
        </body>
      </html>
    </ThemeProvider>
  );
}
