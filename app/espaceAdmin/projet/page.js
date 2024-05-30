
"use client"
import Layout from '../Layout';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiMenu } from 'react-icons/fi'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FiCheckCircle } from 'react-icons/fi';
import { faEnvelope, faLock, faBriefcase, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Import des icônes pour les actions
import "../globals.css";
import { useParams } from 'react-router-dom';


const ProjetTable = ({ projets, deleteProjet, showUpdateFormFor ,updateProjet }) => {
  const ResultSection = ({ children }) => (
    <div className="bg-gray-200 flex justify-start items-center w-5/5 h-auto position-fixed ml-4">
      <div className="w-full">
        {children}
      </div>
    </div>
  );
  return (
    <ResultSection>
          <div className="rounded-lg overflow-hidden rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-blue-400 hover:text-green-500">Liste des Projets</h2>
          <table className="w-full border-collapse rounded-lg overflow-hidden rounded-lg">
            <thead>
              <tr className="bg-[#b9bbbd] rounded-lg border-l-4 border-blue-400">
             {/*<th className="px-4 py-2 text-black">Code</th>*/} 
                <th className="px-4 py-2 text-black">Projet</th>
                {/*<th className="px-4 py-2 text-black">Description</th>*/}
                <th className="px-4 py-2 text-black">Responsable</th>
                <th className="px-4 py-2 text-black">date_debut</th>
                <th className="px-4 py-2 text-black">Date de Début</th>
                <th className="px-4 py-2 text-black">Statut</th>
                {/*<th className="px-4 py-2 text-black">Étape</th>*/}
                
                <th className="px-4 py-2 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
            {projets.map((projet) => (
                <tr key={projet.id} className="hover:bg-[#b9bbbd] text-unset transition-colors duration-300 ease-in-out border-l-4 border-blue-400 hover:border-green-400 text-black"
                style={{ fontSize: "1.1rem", fontFamily: "'Sofia', sans-serif" }}>
                 {/* <td className="px-4 py-2 ">{projet._id}</td>*/}
                  <td className="px-4 py-2 font-bold">{projet.projet}</td>
                  {/*<td className="px-4 py-2">{projet.description}</td>*/}
                  <td className="px-4 py-2 font-bold">{projet.responsable}</td>
                  <td className="px-4 py-2">{projet.date_debut}</td>
                  <td className="px-4 py-2">{projet.date_delais}</td>
    <td className="px-4 py-2">
      {projet.statut === 'termine' ? (
        <FiCheckCircle className="text-green-500" style={{ fontSize: "1.9rem" }} />
      ) :(
        <div  className="bg-gradient-to-tr from-green-500 to-blue-500 text-white shadow-lg p-1 rounded-full" style={{ borderRadius: "0.7rem" ,fontSize: "0.9rem"}}>
          
          <span className="ml-2 font-bold"style={{ fontSize: "1.1rem", fontFamily: "'Sofia', sans-serif" }}>{projet.statut}</span>
        </div>
      )}
    </td>
      {/*<td className="px-4 py-2">{projet.etape}</td>*/}
                
                  <td className="px-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <FaTrashAlt
                      className="text-red-500 cursor-pointer mr-2 bg-zing-200 p-1 rounded-md"
                      style={{ fontSize: "1.8rem" }}
                      onClick={() => deleteProjet(projet._id)}
                    />
                    <FaEdit
                      className="text-blue-500 cursor-pointer bg-zing-200 p-1 rounded-md"
                      style={{ fontSize: "1.8rem" }}
                      value={updateProjet}
                      onClick={() => showUpdateFormFor(projet)}
                    /></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
      
    </ResultSection>
  );
};

//Ajoute projets
const AddProjetForm = () => {
  const [formData, setFormData] = useState({
    projet: '',
    description: '',
    responsable: '',
    date_debut: '',
    date_delais: '',
    statut: '',
    etape: '',
    evenement: ''
  });

  const [users, setUsers] = useState([]);
  const [projets, setProjets] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/utilisateurs');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error.message);
    }
  };
 useEffect(() => {
    const fetchStatuts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets');
        setProjets(response.data);
      
      } catch (error) {
        console.error('Error fetching statuts:', error);
      }
    };

    fetchStatuts();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before submission:', formData);
    try {
      const response = await axios.post('http://localhost:5000/api/projets', formData);
      console.log('Projet ajouté avec succès:', response.data);
      // Réinitialiser le formulaire après l'ajout réussi
      setFormData({
        projet: '',
        description: '',
        responsable: '',
        date_debut: '',
        date_delais: '',
        statut: '',
        etape: '',
        evenement: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du projet:', error.response?.data || error.message);
    }
  };

  const responsables = users.filter(user => user.profile === 'Responsable de projet');
  const status = projets.filter(projet => projet.statut === 'En cours' || projet.statut === 'Terminé');
  const ResultSection = ({ children }) => (
    <div className="my-8 flex justify-center items-center w-10/5 h-auto">
      <div className="rounded-lg bg-white p-8">
        {children}
      </div>
    </div>
  );

  return (
    <ResultSection>
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-black text-sm font-bold mb-2" style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}>Projet:</label>
              <input type="text" name="projet" className="bg-gray-200 block appearance-none rounded-lg hover:border-blue-400 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" value={formData.projet} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-black text-sm font-bold mb-2" style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}>Description:</label>
              <input type="text" name="description" className="bg-gray-200 block appearance-none rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-black text-sm font-bold mb-2" style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}>Responsable:</label>
              <select name="responsable" className="bg-gray-200 block appearance-none rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" value={formData.responsable} onChange={handleChange} required>
                <option value="">Sélectionner un responsable</option>
                {responsables.map(responsable => (
                  <option key={responsable._id} value={responsable.nom}>{responsable.nom}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-black text-sm font-bold mb-2" style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}>Date de début:</label>
              <input type="date" name="date_debut" className="bg-gray-200 block appearance-none rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" value={formData.date_debut} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-black text-sm font-bold mb-2" style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}>Date de délais:</label>
              <input type="date" name="date_delais" className="bg-gray-200 block appearance-none rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" value={formData.date_delais} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-black text-sm font-bold mb-2" style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}>Statut:</label>
              <select name="statut" className="bg-gray-200 block appearance-none rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" value={formData.statut} onChange={handleChange} required>
          
              <option value="termine" style={{ fontSize: "1.1rem", fontFamily: "'Sofia', sans-serif" }}>Terminé</option>
              <option value="en cours" style={{ fontSize: "1.1rem", fontFamily: "'Sofia', sans-serif" }}>En cours</option>
               
              </select>
            </div>
            <div>
              <label className="block text-black text-sm font-bold mb-2" style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}>Étape:</label>
              <input type="text" name="etape" className="bg-gray-200 block appearance-none rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" value={formData.etape} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-black text-sm font-bold mb-2" style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}>Événement:</label>
              <input type="text" name="evenement" className="bg-gray-200 block appearance-none rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" value={formData.evenement} onChange={handleChange} required />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg" style={{ fontSize: "1.2rem", fontFamily: "'Sofia', sans-serif" }}>Ajouter le projet</button>
          </div>
        </form>
      </div>
    </ResultSection>
  );
};



const UpdateProjetForm = ({ projetToUpdate, updateProjet }) => {
  const [updatedProjet, setUpdatedProjet] = useState(projetToUpdate);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/utilisateurs');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProjet({ ...updatedProjet, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/projets/${projetToUpdate._id}`, updatedProjet, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Projet updated:", response.data);
      updateProjet(projetToUpdate._id, response.data);
    } catch (error) {
      console.error("Error updating projet:", error.response ? error.response.data : error.message);
    }
  };



    return (
      
        
      <form onSubmit={handleSubmit}>
      <div>
        <label>Projet:</label>
        <input type="text" name="projet" value={updatedProjet.projet} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={updatedProjet.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Responsable:</label>
        <input type="text" name="responsable" value={updatedProjet.responsable} onChange={handleChange} required />
      </div>
      <div>
        <label>Chef de projet:</label>
        <input type="text" name="chef_projet" value={updatedProjet.chef_projet} onChange={handleChange} required />
      </div>
      <div>
        <label>Équipe:</label>
        <select name="equipe" value={updatedProjet.equipe} onChange={handleChange} required>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>{team.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Date de début:</label>
        <input type="date" name="date_debut" value={updatedProjet.date_debut} onChange={handleChange} required />
      </div>
      <div>
        <label>Date de délais:</label>
        <input type="date" name="date_delais" value={updatedProjet.date_delais} onChange={handleChange} required />
      </div>
      <div>
        <label>Statut:</label>
        <input type="text" name="statut" value={updatedProjet.statut} onChange={handleChange} required />
      </div>
      <div>
        <label>Étape:</label>
        <input type="text" name="etape" value={updatedProjet.etape} onChange={handleChange} required />
      </div>
      <div>
        <label>Événement:</label>
        <input type="text" name="evenement" value={updatedProjet.evenement} onChange={handleChange} required />
      </div>
      <button type="submit">Modifier le projet</button>
    </form>
          )
       
        };
    


const ProjetPage = () => {
 
  //const [projects, setProjects] = useState([]);
  const [projets, setProjets] = useState([]);
  const [showAddProjetForm, setShowAddProjetForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [projetToUpdate, setProjetToUpdate] = useState(null);
  const [projectCount, setProjectCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
 
  const [showProjetsTable, setShowProjetsTable] = useState(true);
  const [updatedProjet, setUpdatedProjet] = useState({ ...projetToUpdate });
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [filtreStatut, setFiltreStatut] = useState("");
  const [rapports, setRapports] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);


  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projets");
        setProjets(response.data);
      } catch (error) {
        console.error("Error fetching projets:", error);
      }
    };

    fetchProjets();
  }, []);

   
   
  
  const deleteProjet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projets/${id}`);
      setProjets(projets.filter(projet => projet._id !== id));
    } catch (error) {
      console.error('Error deleting projet:', error.message);
    }
  };


const filteredProjets = projets.filter((projet) => {
  const projetName = (projet.projet || '').toLowerCase();
  const description = (projet.description || '').toLowerCase();
  const responsable = (projet.responsable || '').toLowerCase();
  const equipe = (projet.equipe || '').toLowerCase();
  const statut = (projet.statut || '').toLowerCase();
  const etape = (projet.etape || '').toLowerCase();
  const evenement = (projet.evenement || '').toLowerCase();
  const searchValue = (searchTerm || '').toLowerCase();

  console.log('Projet:', projet);
  console.log('Projet Name:', projetName);
  console.log('description:',description);
  console.log('responsable:',responsable);
  console.log('equipe:',equipe);
  console.log('statut:',statut);
  console.log('etape:',etape);
  console.log('evenement:',evenement); 
  console.log('Search Term:', searchValue);
  
 
  

  return (
    projetName.includes(searchValue) &&
    (filtreStatut === "" || 
     projet.statut === filtreStatut || 
     (filtreStatut === "en cours" && projet.statut !== "termine"))
  );
});



const handleFiltreStatutChange = (e) => {
  setFiltreStatut(e.target.value);
};

const filterByStatut = (statut) => {
  setFiltreStatut(statut);
 
};

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };



  useEffect(() => {
    const countUnread = () => {
      const unread = projets.filter(projet => !projet.lu).length;
      setUnreadCount(unread);
      if (unread > 0) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(true);
        }, 3000); // Hide notification after 3 seconds
      }
    };


  countUnread(); 
}, [projets]);

  useEffect(() => {
    // Fetch data for project chart
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets');
        setProjectCount(response.data.length);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

const addProjet = async (newProjetData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/projets", newProjetData);
    setProjets([...projets, response.data]);
  } catch (error) {
    console.error("Erreur lors de l'ajout du projet :", error);
  }
};



const updateProjet = async (_id, updatedProjetData) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/projets/${_id}`, updatedProjetData);
    const updatedProjets = projets.map((projet) =>
      projet._id === _id ? { ...projet, ...updatedProjetData } : projet
    );
    setProjets(updatedProjets);
    setShowUpdateForm(true);
    //setProjetToUpdate(null);
  } catch (error) {
    console.error("Error updating projet:", error);
  }
};

  const showUpdateFormFor = (projet) => {
    setShowUpdateForm(true);
    setProjetToUpdate(projet);
  };


  
useEffect(() => {
  const fetchRapports = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/rapports');
      setRapports(response.data);
    } catch (error) {
      console.error('Error fetching rapports:', error);
    }
  };
  fetchRapports();
}, []);
  
  useEffect(() => {
    const countUnread = () => {
      const unread = rapports.filter(rapport => !rapport.lu).length;
      setUnreadCount(unread);
      if (unread > 0) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(true);
        }, 3000); // Hide notification after 3 seconds
      }
    };
  
    
  
    countUnread();
    
  }, [rapports]);
 
  

  const ResultSection = ({ children }) => (
    <div className="my-8 flex justify-center items-center">
      <div className="rounded-lg bg-gray-200 dark-bg-gray-200 p-8">
        {children}
      </div>
    </div>
  );
  

  return (
   
  <Layout>
<h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
      <div className="container mx-auto px-7 flex grid grid-cols-1 gap-5">
          
          <div className="">
            <div className="flex flex-col items-center">
              <div className='grid grid-cols-2 gap-4'>
              <ResultSection className="">
      <div className="flex items-center">
        <div className='rounded-full bg-green-500 text-white px-4 py-2' style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}>
          {showNotification && (
            <div>
              {unreadCount}
            </div>
          )}
        </div>
        <div className="text-black  font-bold" 
        style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}><a className="menu-button" href="/espaceAdmin/rapport">
          <p>  rapports ajoutés </p></a></div>
      </div>
    </ResultSection>
                <ResultSection>
                  <div className="flex items-center">
                    <div className="rounded-full bg-blue-500 text-white px-4 py-2 mr-4" style={{ fontSize: "1.0rem"}}>
                      {projectCount}
                    </div>
                    <div className="text-black font-bold" style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}> projets disponibles </div>
                  </div>
                </ResultSection>
              </div>
              
              
              <ResultSection>
              <div className="flex justify-between items-center my-4 ">
          
          <div className="flex flex-col mt-10  items-center flex grid grid-cols-5 gap-5">
            <button
              className="bg-blue-400 text-white px-4 py-2 rounded mb-2"
              onClick={() => { 
                setShowProjetsTable(true);
                setShowAddProjetForm(false);
              }}
            >
              Afficher les Projets
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => {
                setShowAddProjetForm(true);
                setShowProjetsTable(false);
              }}
            >
              Ajouter Projet
            </button>
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={handleSearchTermChange}
              className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 border-blue-500"
              style={{ fontSize: "1.0rem", fontFamily: "'Sofia', sans-serif" }}/>
           
            <select
              className="bg-gray-200 border border-blue-500 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 mb-2 text-black "
              style={{ fontSize: "1.2rem", fontFamily: "'Sofia', sans-serif" }}
              value={filtreStatut}
              onChange={handleFiltreStatutChange}
            >
              <option value="" style={{ fontSize: "1.2rem", fontFamily: "'Sofia', sans-serif" }}>Tous les statuts</option>
              <option value="termine" style={{ fontSize: "1.2rem", fontFamily: "'Sofia', sans-serif" }}>Terminé</option>
              <option value="en cours" style={{ fontSize: "1.2rem", fontFamily: "'Sofia', sans-serif" }}>En cours</option>
            </select></div>
            
            
          </div>
     
                {showUpdateForm ? (
                  <UpdateProjetForm projectToUpdate={projetToUpdate} updateProjet={updateProjet} />
                ) : showAddProjetForm ? (
                  <AddProjetForm addProjet={addProjet} />
                ) : (
                  <ProjetTable
                  addProjet={addProjet}
                   projets={filteredProjets}
                    deleteProjet={deleteProjet}
                    showUpdateFormFor={showUpdateFormFor}
                    updateProjet={updateProjet}
                  />
                )}
              </ResultSection>
            </div>
          </div>
        </div>
      
    </Layout>
);
};

export default ProjetPage;
