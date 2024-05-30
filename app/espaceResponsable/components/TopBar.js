import { Fragment, useState } from "react";
import { Bars3CenterLeftIcon, PencilIcon, ChevronDownIcon, Cog8ToothIcon, MoonIcon, SunIcon, GlobeAltIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

export default function TopBar({ showNav, setShowNav }) {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("fr");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // Ajoutez le code pour basculer entre les thèmes ici
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    // Ajoutez le code pour changer la langue ici
  };

  return (
    <div
      className={`fixed w-full h-20 flex justify-between items-center transition-all duration-[400ms] bg-white shadow-md border-b-2 ${showNav ? "pl-56" : ""}`}
    >
      <div className="flex items-center pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-indigo-500 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16 space-x-5">
        <div className="relative inline-block cursor-pointer text-indigo-500">
          {theme === "light" ? (
            <SunIcon className="h-6 w-6" onClick={toggleTheme} />
          ) : (
            <MoonIcon className="h-6 w-6" onClick={toggleTheme} />
          )}
        </div>
        <div className="relative inline-block cursor-pointer text-indigo-500">
          <GlobeAltIcon className="h-6 w-6" onClick={() => toggleLanguage(language === "fr" ? "en" : "fr")} />
        </div>
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
              <span className="hidden md:block font-medium text-gray-700">
                Responsable
              </span>
              <ChevronDownIcon className="h-4 w-4 text-indigo-500" />
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
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <Link
                    href="#"
                    className="flex hover:bg-indigo-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-2 text-indigo-500" />
                    Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/"
                    className="flex hover:bg-indigo-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <Cog8ToothIcon className="h-4 w-4 mr-2 text-indigo-500" />
                    Deconnexion
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
