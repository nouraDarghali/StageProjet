import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, BriefcaseIcon, FolderIcon, ChartBarIcon } from "@heroicons/react/24/solid"; // Importez les icônes nécessaires depuis Heroicons
import { useRouter } from "next/navigation";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-64 h-full bg-white shadow-md">
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
        <Link href="/espaceResponsable/">
          <div
            className={`pl-6 py-3 mx-5 rounded-lg text-center cursor-pointer mb-3 flex items-center transition-all duration-300 ${router.pathname === "/"
              ? "bg-indigo-500 text-white"
              : "text-gray-700 hover:bg-indigo-500 hover:text-white"
              }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Accueil</p>
            </div>
          </div>
        </Link>
        <Link href="/espaceResponsable/projet">
          <div
            className={`pl-6 py-3 mx-5 rounded-lg text-center cursor-pointer mb-3 flex items-center transition-all duration-300 ${router.pathname === "/projet"
              ? "bg-indigo-500 text-white"
              : "text-gray-700 hover:bg-indigo-500 hover:text-white"
              }`}
          >
            <div className="mr-2">
              <BriefcaseIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Projet</p>
            </div>
          </div>
        </Link>
        <Link href="/espaceResponsable/ressources">
          <div
            className={`pl-6 py-3 mx-5 rounded-lg text-center cursor-pointer mb-3 flex items-center transition-all duration-300 ${router.pathname === "/ressources"
              ? "bg-indigo-500 text-white"
              : "text-gray-700 hover:bg-indigo-500 hover:text-white"
              }`}
          >
            <div className="mr-2">
              <FolderIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Ressources</p>
            </div>
          </div>
        </Link>
        <Link href="/espaceResponsable/rapport">
          <div
            className={`pl-6 py-3 mx-5 rounded-lg text-center cursor-pointer mb-3 flex items-center transition-all duration-300 ${router.pathname === "/rapport"
              ? "bg-indigo-500 text-white"
              : "text-gray-700 hover:bg-indigo-500 hover:text-white"
              }`}
          >
            <div className="mr-2">
              <ChartBarIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Rapport et analyse</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
