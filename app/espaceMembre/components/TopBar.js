
// 'use client';
// import { Fragment, useState, useEffect } from "react";
// import { Bars3CenterLeftIcon, ChevronDownIcon, SunIcon, MoonIcon, GlobeAltIcon, UserIcon, ArrowRightOnRectangleIcon, XCircleIcon } from "@heroicons/react/24/solid";
// import { Menu, Transition } from "@headlessui/react";
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';

// export default function TopBar({ showNav, setShowNav }) {
//   const { theme, setTheme } = useTheme();
//   const [language, setLanguage] = useState("fr");
//   const [showProfileInfo, setShowProfileInfo] = useState(false);
//   const [username, setUsername] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     // Récupérer le nom d'utilisateur depuis l'URL
//     const query = new URLSearchParams(window.location.search);
//     const user = query.get("username");
//     if (user) {
//       setUsername(user);
//     }
//   }, [router]);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const changeLanguage = (lang) => {
//     setLanguage(lang);
//   };

//   return (
//     <div className={`fixed w-full h-20 flex justify-between items-center transition-all duration-[400ms] bg-white shadow-md dark:bg-gray-900`}>
//       <div className="flex items-center pl-4 md:pl-16">
//         <Bars3CenterLeftIcon
//           className="h-8 w-8 text-indigo-500 cursor-pointer"
//           onClick={() => setShowNav(!showNav)}
//         />
//       </div>
//       <div className="flex items-center pr-4 md:pr-16 space-x-5">
//         <div className="relative inline-block cursor-pointer text-purple-500">
//           {theme === "light" ? (
//             <SunIcon className="h-6 w-6" onClick={toggleTheme} />
//           ) : (
//             <MoonIcon className="h-6 w-6" onClick={toggleTheme} />
//           )}
//         </div>
//         <Menu as="div" className="relative inline-block text-left">
//           <Menu.Button className="inline-flex justify-center items-center space-x-2 cursor-pointer">
//             <GlobeAltIcon className="h-6 w-6 text-purple-500" />
            
//           </Menu.Button>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform scale-95 opacity-0"
//             enterTo="transform scale-100 opacity-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform scale-100 opacity-100"
//             leaveTo="transform scale-95 opacity-0"
//           >
//             <Menu.Items className="absolute right-0 mt-2 w-28 z-50 origin-top-right bg-white dark:bg-gray-800 rounded shadow-lg">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={() => changeLanguage("fr")}
//                     className={`${
//                       active ? 'bg-purple-500 text-white' : 'text-gray-700 dark:text-gray-300'
//                     } group flex rounded p-2 text-sm w-full`}
//                   >
//                     Français
//                   </button>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={() => changeLanguage("ar")}
//                     className={`${
//                       active ? 'bg-purple-500 text-white' : 'text-gray-700 dark:text-gray-300'
//                     } group flex rounded p-2 text-sm w-full`}
//                   >
//                     Arabe
//                   </button>
//                 )}
//               </Menu.Item>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//         <Menu as="div" className="relative inline-block text-left">
//           <div>
//             <Menu.Button className="inline-flex justify-center items-center space-x-2">
//               <picture>
//                 <img
//                   src="/OIP (2).jpeg"
//                   className="rounded-full h-8 md:mr-2 border-2 border-white shadow-sm"
//                   alt="photo de profil"
//                 />
//               </picture>
//             </Menu.Button>
//           </div>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform scale-95"
//             enterTo="transform scale-100"
//             leave="transition ease-in duration=75"
//             leaveFrom="transform scale-100"
//             leaveTo="transform scale-95"
//           >
//             <Menu.Items className="absolute right-0 dark:bg-gray-800 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
//               <div className="p-1">
//                 <Menu.Item>
//                   <button
//                     onClick={() => setShowProfileInfo(!showProfileInfo)}
//                     className="group flex dark:text-white hover:bg-purple-500 hover:text-white text-gray-700 rounded p-2 text-sm transition-colors items-center w-full text-left"
//                   >
//                     <UserIcon className="h-4 w-4 mr-2 text-purple-500 group-hover:text-white" />
//                     Profile
//                   </button>
//                 </Menu.Item>
//                 <Menu.Item>
//                   <Link
//                     href="/"
//                     className="group flex hover:bg-purple-500 dark:text-white hover:text-white text-gray-700 rounded p-2 text-sm transition-colors items-center"
//                   >
//                     <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2 text-purple-500 group-hover:text-white" />
//                     Deconnexion
//                   </Link>
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>
//       {showProfileInfo && (
//         <div className="absolute top-20 right-0 mt-2 w-64 z-50 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border-2 border-purple-500">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-gray-700 dark:text-gray-300 font-medium">Informations du Profil</h3>
//             <XCircleIcon
//               className="h-6 w-6 text-red-500 cursor-pointer"
//               onClick={() => setShowProfileInfo(false)}
//             />
//           </div>
//           <hr className="border-t-2 border-[#F7B750] mb-4" />
//           <div className="space-y-2">
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Nom:</span>
//               <span className="text-gray-700 dark:text-gray-300 font-medium ml-2">{username}</span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Fonction:</span>
//               <span className="text-gray-700 dark:text-gray-300 font-medium ml-2">Membre</span>
//             </div>
//             {/* Ajoutez d'autres informations ici */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';
import { Fragment, useState, useEffect } from "react";
import { Bars3CenterLeftIcon, ChevronDownIcon, SunIcon, MoonIcon, GlobeAltIcon, UserIcon, ArrowRightOnRectangleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function TopBar({ showNav, setShowNav }) {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("fr");
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Récupérer le nom d'utilisateur depuis l'URL
    const query = new URLSearchParams(window.location.search);
    const user = query.get("username");
    if (user) {
      setUsername(user);
    }
  }, [router]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className={`fixed w-full h-20 flex justify-between items-center transition-all duration-[400ms] bg-white shadow-md dark:bg-gray-900`}>
      <div className={`flex items-center pl-4 ${showNav ? 'md:pl-64' : 'md:pl-16'}`}>
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-indigo-500 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16 space-x-5">
        <div className="relative inline-block cursor-pointer text-purple-500">
          {theme === "light" ? (
            <SunIcon className="h-6 w-6" onClick={toggleTheme} />
          ) : (
            <MoonIcon className="h-6 w-6" onClick={toggleTheme} />
          )}
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex justify-center items-center space-x-2 cursor-pointer">
            <GlobeAltIcon className="h-6 w-6 text-purple-500" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute right-0 mt-2 w-28 z-50 origin-top-right bg-white dark:bg-gray-800 rounded shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => changeLanguage("fr")}
                    className={`${
                      active ? 'bg-purple-500 text-white' : 'text-gray-700 dark:text-gray-300'
                    } group flex rounded p-2 text-sm w-full`}
                  >
                    Français
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => changeLanguage("ar")}
                    className={`${
                      active ? 'bg-purple-500 text-white' : 'text-gray-700 dark:text-gray-300'
                    } group flex rounded p-2 text-sm w-full`}
                  >
                    Arabe
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center items-center space-x-2">
              <picture>
                <img
                  src="/OIP (2).jpeg"
                  className="rounded-full h-8 md:mr-2 border-2 border-white shadow-sm"
                  alt="photo de profil"
                />
              </picture>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 dark:bg-gray-800 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <button
                    onClick={() => setShowProfileInfo(!showProfileInfo)}
                    className="group flex dark:text-white hover:bg-purple-500 hover:text-white text-gray-700 rounded p-2 text-sm transition-colors items-center w-full text-left"
                  >
                    <UserIcon className="h-4 w-4 mr-2 text-purple-500 group-hover:text-white" />
                    Profile
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/"
                    className="group flex hover:bg-purple-500 dark:text-white hover:text-white text-gray-700 rounded p-2 text-sm transition-colors items-center"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2 text-purple-500 group-hover:text-white" />
                    Deconnexion
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {showProfileInfo && (
        <div className="absolute top-20 right-0 mt-2 w-64 z-50 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border-2 border-purple-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-700 dark:text-gray-300 font-medium">Informations du Profil</h3>
            <XCircleIcon
              className="h-6 w-6 text-red-500 cursor-pointer"
              onClick={() => setShowProfileInfo(false)}
            />
          </div>
          <hr className="border-t-2 border-[#F7B750] mb-4" />
          <div className="space-y-2">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Nom:</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium ml-2">{username}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Fonction:</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium ml-2">Membre</span>
            </div>
            {/* Ajoutez d'autres informations ici */}
          </div>
        </div>
      )}
    </div>
  );
}
