import EditTacheForm from "../../EditTacheForm/page";
const getTacheById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/espaceMembre/api/taches/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTache({ params }) {
  const { id } = params;
  const { task } = await getTacheById(id);
  const { statut,tache,description,date_debut,date_fin,duree,projet } = task;
  return <EditTacheForm id={id} 
  statut={statut} 
  tache={tache}
  description={description}
  date_debut={date_debut}
  date_fin={date_fin}
  duree={duree}
  projet={projet}
  
  
  
  />;
}