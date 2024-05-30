
// 'use client';
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function EditTacheForm({ id,tache,statut }) {
  
//   const [newStatut, setNewStatut] = useState(statut);
//   const router = useRouter();
//   const [newTache, setNewTache] = useState(tache);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`http://localhost:3000/espaceMembre/api/taches/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ newStatut }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update topic");
//       }

//       router.refresh();
//       router.push("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <div className="forme">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <span className="mr-2">Statut:</span>
//         <select
//           onChange={(e) => setNewStatut(e.target.value)}
//           value={newStatut}
//           className="border border-slate-500 px-4 py-2"
//         >
//           <option>en cours</option>
//           <option>terminée</option>
//         </select>
//         <span className="mr-2">Tâche:</span>
//         <input
//           onChange={(e) => setNewTache(e.target.value)}
//           value={newTache}
//           className="border border-slate-500 px-4 py-2"
//           type="text"
//           placeholder="Tâche"
//           readOnly={true}
//         />
//         <button className="bg-blue-400 font-bold text-white py-2 px-4">
//           Mettre à jour le statut
//         </button>
//       </form>
//     </div>
//     </div>
//   );
// }
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiX } from "react-icons/hi";
import { Refresh } from "@mui/icons-material";

export default function EditTacheForm({ id, tache, statut }) {
  const [newStatut, setNewStatut] = useState(statut);
  const [newTache, setNewTache] = useState(tache);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/espaceMembre/api/taches/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newStatut }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }
      router.back().Refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    
      router.back(); 
    
  };

  return (
    <div className="">
      <div className="w-10/11 shadow-xl rounded-2xl p-10 border">
        <div>
          <div className="relative">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                Statut
              </label>
              <select
                onChange={(e) => setNewStatut(e.target.value)}
                value={newStatut}
                className="block appearance-none dark:bg-gray-400 dark:text-white w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>en cours</option>
                <option>terminée</option>
              </select>
              <label className="block uppercase dark:text-white tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Tâche
              </label>
              <input
                onChange={(e) => setNewTache(e.target.value)}
                value={newTache}
                className="block appearance-none w-full bg-gray-200 dark:bg-gray-400 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Tâche"
                readOnly={true}
              />
              <div className="flex gap-3 max-w-sm">
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  type="submit"
                >
                  Mettre à jour le statut
                </button>
                <button
              onClick={handleClose}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Annuler
            </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

