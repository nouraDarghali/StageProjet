// import { useState, useEffect, Fragment } from "react";
// import { useRouter } from "next/navigation";
// import SideBar from "./SideBar";
// import TopBar from "./TopBar";
// import { Transition } from "@headlessui/react";

// export default function Layout({ children }) {
//   const [showNav, setShowNav] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     function handleResize() {
//       if (window.innerWidth <= 640) {
//         setShowNav(false);
//         setIsMobile(true);
//       } else {
//         setShowNav(true);
//         setIsMobile(false);
//       }
//     }

//     window.addEventListener("resize", handleResize);
//     handleResize(); // Initial check

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

  
//   const isResponsable = router.pathname.startsWith('/responsable');
  

//   const CurrentTopBar = isChef ? TopBarChef : isResponsable ? TopBar : isMembre ? TopBar_membre : null;
//   const CurrentSideBar = isChef ? SideBarChef : isResponsable ? SideBar : isMembre ? SideBar_membre : null;

//   return (
//     <>
//       {CurrentTopBar && <CurrentTopBar showNav={showNav} setShowNav={setShowNav} />}
//       <Transition
//         as={Fragment}
//         show={showNav}
//         enter="transform transition duration-[400ms]"
//         enterFrom="-translate-x-full"
//         enterTo="translate-x-0"
//         leave="transform duration-[400ms] transition ease-in-out"
//         leaveFrom="translate-x-0"
//         leaveTo="-translate-x-full"
//       >
//         {CurrentSideBar && <CurrentSideBar showNav={showNav} />}
//       </Transition>
//       <main
//         className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "pl-56" : ""}`}
//       >
//         <div className="px-4 md:px-16">{children}</div>
//       </main>
//     </>
//   );
// }
'use client';
import { useState, useEffect, Fragment } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
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
        <SideBar showNav={showNav} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms] ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16">{children}</div>
      </main>
    </>
  );
}