import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, BriefcaseIcon, FolderIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const SideBarChef = forwardRef(({ showNav }, ref) => {
    const router = useRouter();

    return (
        <div ref={ref} className="fixed w-64 h-full bg-white shadow-md">
            <div className="flex justify-center mt-6 mb-14">
                <picture>
                    <img className="w-32 h-auto" src="/logo02.png" alt="company logo" />
                </picture>
            </div>
            <div className="flex flex-col">
                <Link href="/chef">
                    <div className={`pl-6 py-3 mx-5 rounded-lg text-center cursor-pointer mb-3 flex items-center transition-all duration-300 ease-in-out ${router.pathname == "/" ? "bg-indigo-100 text-indigo-500" : "text-gray-400 hover:bg-indigo-100 hover:text-indigo-500"}`}>
                        <HomeIcon className="h-5 w-5 mr-2" />
                        <span>Accueil</span>
                    </div>
                </Link>
                <Link href="/chef/taches">
                    <div className={`pl-6 py-3 mx-5 rounded-lg text-center cursor-pointer mb-3 flex items-center transition-all duration-300 ease-in-out ${router.pathname == "/tachesChef" ? "bg-indigo-100 text-indigo-500" : "text-gray-400 hover:bg-indigo-100 hover:text-indigo-500"}`}>
                        <BriefcaseIcon className="h-5 w-5 mr-2" />
                        <span>Tâches</span>
                    </div>
                </Link>
                <Link href="/chef/calendrier">
                    <div className={`pl-6 py-3 mx-5 rounded-lg text-center cursor-pointer mb-3 flex items-center transition-all duration-300 ease-in-out ${router.pathname == "/projetsChef" ? "bg-indigo-100 text-indigo-500" : "text-gray-400 hover:bg-indigo-100 hover:text-indigo-500"}`}>
                        <FolderIcon className="h-5 w-5 mr-2" />
                        <span>Calendrier</span>
                    </div>
                </Link>
                <Link href="/chef/rapport">
                    <div className={`pl-6 py-3 mx-5 rounded-lg text-center cursor-pointer mb-3 flex items-center transition-all duration-300 ease-in-out ${router.pathname == "/rapportChef" ? "bg-indigo-100 text-indigo-500" : "text-gray-400 hover:bg-indigo-100 hover:text-indigo-500"}`}>
                        <ChartBarIcon className="h-5 w-5 mr-2" />
                        <span>Rapports</span>
                    </div>
                </Link>
            </div>
        </div>
    );
});

SideBarChef.displayName = "SideBarChef";

export default SideBarChef;

