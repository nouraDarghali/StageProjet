// projet.js
/*
const MembrePage = () => {
    return (
        <div id="resultat">
            <h1 className="titre">MEMBRE</h1>
        </div>
    );
};

export default MembrePage;*/
/*
// projet.js
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberTable = ({ membres, deleteMember }) => {
  return (
    <div>
      <h2>Liste des Membres</h2>
      <table>
        <thead>
          <tr>
            <th>ID Membre</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Profil</th>
            <th>Projets</th>
            <th>Projet Actuel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {membres.map(membre => (
            <tr key={membre.id}>
              <td>{membre.id}</td>
              <td>{membre.nom}</td>
              <td>{membre.prenom}</td>
              <td>{membre.email}</td>
              <td>{membre.profile}</td>
              <td>{membre.projets}</td>
              <td>{membre.projet_actuel}</td>
              <td>
                <button onClick={() => deleteMember(membre.id)}>Supprimer</button>
                <button type="submit">Modifier Membre</button>
                
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddMemberForm = ({ addMember }) => {
  const [member, setMember] = useState({
    id: '',
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    profile: '',
    projets: '',
    projet_actuel: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!member.nom || !member.prenom || !member.email) return;
    addMember(member);
    setMember({
      id: '',
      nom: '',
      prenom: '',
      email: '',
      mot_de_passe: '',
      profile: '',
      projets: '',
      projet_actuel: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input type="text" name="nom" value={member.nom} onChange={handleChange} />
      </label>
      <label>
        Prénom:
        <input type="text" name="prenom" value={member.prenom} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="text" name="email" value={member.email} onChange={handleChange} />
      </label>
      <label>
      mot_de_passe:
        <input type="text" name="mot_de_passe" value={member.mot_de_passe} onChange={handleChange} />
      </label>
      <label>
      profile:
        <input type="text" name="profile" value={member.profile} onChange={handleChange} />
      </label>
      <label>
      projets:
        <input type="text" name="projets" value={member.projets} onChange={handleChange} />
      </label>
      <label>
      projet_actuel:
        <input type="text" name="projet_actuel" value={member.projet_actuel} onChange={handleChange} />
      </label>
      <button type="submit">Ajouter Membre</button>
    </form>
  );
};




const MemberPage = () => {
  const [membres, setMembres] = useState([]);

  useEffect(() => {
    const fetchMembres = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/members');
        setMembres(response.data);
      } catch (error) {
        console.error('Error fetching membres:', error);
      }
    };
    fetchMembres();
  }, []);

  const addMember = async (newMemberData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/members', newMemberData);
        console.log('New member added:', response.data);
        // Mettre à jour l'état local de la liste des membres, si nécessaire
    } catch (error) {
        console.error('Error adding member:', error);
    }
};
const deleteMember = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/members/${id}`);
    // Mettre à jour l'état local de la liste des membres après la suppression réussie
    setMembres(membres.filter(member => member.id !== id));
  } catch (error) {
    console.error('Error deleting member:', error);
  }
};

  // Ajoutez ici la fonction pour mettre à jour un membre

  return (
    <div>
      <MemberTable membres={membres} deleteMember={deleteMember} />
      <AddMemberForm addMember={addMember} />
      
    </div>
  );
};

export default MemberPage;
*/

// projet.js

/*

"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberTable = ({ membres, deleteMember, showUpdateFormFor }) => {
  return (
    <div><br></br><br></br>
      <h2>Liste des Membres</h2>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>ID Membre</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Profil</th>
            <th>Projets</th>
            <th>Projet Actuel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {membres.map(membre => (
            <tr key={membre.id}>
              <td>{membre.id}</td>
              <td>{membre.nom}</td>
              <td>{membre.prenom}</td>
              <td>{membre.email}</td>
              <td>{membre.profile}</td>
              <td>{membre.projets}</td>
              <td>{membre.projet_actuel}</td>
              <td><br></br>
                <button onClick={() => deleteMember(membre.id)}>Supprimer</button><br></br>
                <button onClick={() => showUpdateFormFor(membre)}>Modifier Membre</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddMemberForm = ({ addMember }) => {
  const [member, setMember] = useState({
    id: '',
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    profile: '',
    projets: '',
    projet_actuel: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!member.nom || !member.prenom || !member.email) return;
    addMember(member);
    setMember({
      id: '',
      nom: '',
      prenom: '',
      email: '',
      mot_de_passe: '',
      profile: '',
      projets: '',
      projet_actuel: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
    <br></br>
      <label>
        Nom:
        <input type="text" name="nom" value={member.nom} onChange={handleChange} />
      </label>
      <br></br>
      <label>
        Prénom:
        <input type="text" name="prenom" value={member.prenom} onChange={handleChange} />
      </label>
      <br></br>
      <label>
        Email:
        <input type="text" name="email" value={member.email} onChange={handleChange} />
      </label>
      <br></br>
      <label>
      mot_de_passe:
        <input type="text" name="mot_de_passe" value={member.mot_de_passe} onChange={handleChange} />
      </label>
      <br></br>
      <label>
      profile:
        <input type="text" name="profile" value={member.profile} onChange={handleChange} />
      </label>
      <br></br>
      <label>
      projets:
        <input type="text" name="projets" value={member.projets} onChange={handleChange} />
      </label>
      <br></br>
      <label>
      projet_actuel:
        <input type="text" name="projet_actuel" value={member.projet_actuel} onChange={handleChange} />
      </label>
      <br></br>
      <button type="submit">Ajouter Membre</button>
    </form>
  );
};

const UpdateMemberForm = ({ member, updateMember }) => {
  const [updatedMember, setUpdatedMember] = useState(member);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember({ ...updatedMember, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMember(member.id, updatedMember);
  };

  return (
    <form onSubmit={handleSubmit}>
    <br></br>
      <label>
        Nom:
        <input type="text" name="nom" value={updatedMember.nom} onChange={handleChange} />
      </label>
      <br></br>
      <label>
        Prénom:
        <input type="text" name="prenom" value={updatedMember.prenom} onChange={handleChange} />
      </label>
      <br></br>
      <label>
        Email:
        <input type="text" name="email" value={updatedMember.email} onChange={handleChange} />
      </label>
      <br></br>
      <label>
      mot_de_passe:
        <input type="text" name="mot_de_passe" value={updatedMember.mot_de_passe} onChange={handleChange} />
      </label>
      <br></br>
      <label>
      profile:
        <input type="text" name="profile" value={updatedMember.profile} onChange={handleChange} />
      </label>
      <br></br>
      <label>
      projets:
        <input type="text" name="projets" value={updatedMember.projets} onChange={handleChange} />
      </label>
      <br></br>
      <label>
      projet_actuel:
        <input type="text" name="projet_actuel" value={updatedMember.projet_actuel} onChange={handleChange} />
      </label>
      <br></br>
      <button type="submit">Modifier Membre</button>
    </form>
  );
};

const MemberPage = () => {
  const [membres, setMembres] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [memberToUpdate, setMemberToUpdate] = useState(null);

  useEffect(() => {
    const fetchMembres = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/members');
        setMembres(response.data);
      } catch (error) {
        console.error('Error fetching membres:', error);
      }
    };
    fetchMembres();
  }, []);

  const addMember = async (newMemberData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/members', newMemberData);
        console.log('New member added:', response.data);
        setMembres([...membres, response.data]);
    } catch (error) {
        console.error('Error adding member:', error);
    }
  };

  const deleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/members/${id}`);
      setMembres(membres.filter(member => member.id !== id));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const updateMember = async (id, updatedMemberData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/members/${id}`, updatedMemberData);
      console.log('Member updated:', response.data);
      const updatedMembres = membres.map(member =>
        member.id === id ? { ...member, ...updatedMemberData } : member
      );
      setMembres(updatedMembres);
      setShowUpdateForm(false);
      setMemberToUpdate(null);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const showUpdateFormFor = (member) => {
    setShowUpdateForm(true);
    setMemberToUpdate(member);
  };

  return (
    <div>
      {showUpdateForm && memberToUpdate && (
        <UpdateMemberForm member={memberToUpdate} updateMember={updateMember} />
      )}
      <MemberTable
        membres={membres}
        deleteMember={deleteMember}
        showUpdateFormFor={showUpdateFormFor}
      />
      <AddMemberForm addMember={addMember} />
    </div>
  );
};

export default MemberPage;
*/

////////////////////////////////////////////////////////hfjmfyh,i
/*
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MemberTable = ({ membres, deleteMember, showUpdateFormFor }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Liste des Membres</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID Membre</th>
            <th className="border border-gray-300 p-2">Nom</th>
            <th className="border border-gray-300 p-2">Prénom</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Profil</th>
            <th className="border border-gray-300 p-2">Projets</th>
            <th className="border border-gray-300 p-2">Projet Actuel</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {membres.map((membre) => (
            <tr key={membre.id} className="text-center">
              <td className="border border-gray-300 p-2">{membre.id}</td>
              <td className="border border-gray-300 p-2">{membre.nom}</td>
              <td className="border border-gray-300 p-2">{membre.prenom}</td>
              <td className="border border-gray-300 p-2">{membre.email}</td>
              <td className="border border-gray-300 p-2">{membre.profile}</td>
              <td className="border border-gray-300 p-2">{membre.projets}</td>
              <td className="border border-gray-300 p-2">{membre.projet_actuel}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => deleteMember(membre.id)}
                >
                  Supprimer
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => showUpdateFormFor(membre)}
                >
                  Modifier Membre
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!member.nom || !member.prenom || !member.email) return;
  try {
      const response = await axios.post("http://localhost:8080/api/members", member);
      console.log("New member added:", response.data);
      setMembres([...membres, response.data]);
      setMember({
          id: "",
          nom: "",
          prenom: "",
          email: "",
          mot_de_passe: "",
          profile: "",
          projets: "",
          projet_actuel: "",
      });
  } catch (error) {
      console.error("Error adding member:", error);
  }

;
  return (
    <form onSubmit={handleSubmit} className="my-8">
      <label className="block text-gray-400 text-sm font-bold mb-2">
        Nom:
        <input
          type="text"
          name="nom"
          value={member.nom}
          onChange={handleChange}
          className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
      </label>
      <label className="block mb-4">
        Prénom:
        <input
          type="text"
          name="prenom"
          value={member.prenom}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Email:
        <input
          type="text"
          name="email"
          value={member.email}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Mot de passe:
        <input
          type="text"
          name="mot_de_passe"
          value={member.mot_de_passe}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Profile:
        <input
          type="text"
          name="profile"
          value={member.profile}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Projets:
        <input
          type="text"
          name="projets"
          value={member.projets}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Projet actuel:
        <input
          type="text"
          name="projet_actuel"
          value={member.projet_actuel}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Ajouter Membre
      </button>
    </form>
  );

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.put(`http://localhost:8080/api/members/${member.id}`, updatedMember);
      console.log("Member updated:", response.data);
      const updatedMembres = membres.map((mem) =>
          mem.id === member.id ? { ...mem, ...updatedMember } : mem
      );
      setMembres(updatedMembres);
      setShowUpdateForm(false);
      setMemberToUpdate(null);
  } catch (error) {
      console.error("Error updating member:", error);
  }
}


  return (
    <form onSubmit={handleSubmit} className="my-8">
      <label className="block mb-4">
        Nom:
        <input
          type="text"
          name="nom"
          value={updatedMember.nom}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Prénom:
        <input
          type="text"
          name="prenom"
          value={updatedMember.prenom}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Email:
        <input
          type="text"
          name="email"
          value={updatedMember.email}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Mot de passe:
        <input
          type="text"
          name="mot_de_passe"
          value={updatedMember.mot_de_passe}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Profile:
        <input
          type="text"
          name="profile"
          value={updatedMember.profile}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Projets:
        <input
          type="text"
          name="projets"
          value={updatedMember.projets}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <label className="block mb-4">
        Projet actuel:
        <input
          type="text"
          name="projet_actuel"
          value={updatedMember.projet_actuel}
          onChange={handleChange}
          className="block border border-gray-300 rounded px-4 py-2 w-full mt-2"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Modifier Membre
      </button>
    </form>
  );
};

const MemberPage = () => {
  const [membres, setMembres] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [memberToUpdate, setMemberToUpdate] = useState(null);

  useEffect(() => {
    const fetchMembres = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/members");
        setMembres(response.data);
      } catch (error) {
        console.error("Error fetching membres:", error);
      }
    };
    fetchMembres();
  }, []);

  const addMember = async (newMemberData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/members",
        newMemberData
      );
      console.log("New member added:", response.data);
      setMembres([...membres, response.data]);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const deleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/members/${id}`);
      setMembres(membres.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const updateMember = async (id, updatedMemberData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/members/${id}`,
        updatedMemberData
      );
      console.log("Member updated:", response.data);
      const updatedMembres = membres.map((member) =>
        member.id === id ? { ...member, ...updatedMemberData } : member
      );
      setMembres(updatedMembres);
      setShowUpdateForm(false);
      setMemberToUpdate(null);
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const showUpdateFormFor = (member) => {
    setShowUpdateForm(true);
    setMemberToUpdate(member);
  };

  return (
    <div className="container mx-auto px-4">
      {showUpdateForm && memberToUpdate && (
        <UpdateMemberForm member={memberToUpdate} updateMember={updateMember} />
      )}
      <MemberTable
        membres={membres}
        deleteMember={deleteMember}
        showUpdateFormFor={showUpdateFormFor}
      />
      <AddMemberForm addMember={addMember} />
    </div>
  );
};

export default MemberPage;
*/

"use client";
import Layout from '../Layout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faBriefcase, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { FaPlus, FaList } from 'react-icons/fa';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../globals.css";


 

const MemberTable = ({ membres, deleteMember, showUpdateFormFor }) => {
  
  const ResultSection = ({ children }) => (
    <div className="bg-gray-200 flex justify-start items-center w-5/5 h-auto position-fixed ml-4">
    <div className="w-full">
      {children}
    </div>
   </div>
  );
  
  return (
    
     <ResultSection>
    
     <div className="my-3">
     <h2 className="hover:text-green-500 text-xl font-bold mb-5 text-blue-500">Liste des Members</h2>
    </div>
    <table className="w-full border-collapse rounded-lg overflow-hidden rounded-lg  ">
 {/* En-têtes de colonne */}
      <thead>
        <tr className="bg-[#b9bbbd] rounded-lg border-l-4 border-blue-400 h-30">
        <th className="px-4 py-2 text-black">code</th>
          <th className="px-4 py-2 text-black">Nom</th>
          <th className="px-4 py-2 text-black">Prénom</th>
          <th className="px-4 py-2 text-black">Email</th>
          <th className="px-4 py-2 text-black">Profil</th>
          <th className="px-4 py-2 text-black">Projets</th>
          <th className="px-4 py-2 text-black">Projet Actuel</th>
          <th className="px-4 py-2 text-black">Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Données des membres */}
        {membres.map((membre) => (
          <tr key={membre.id}
           className="hover:bg-[#b9bbbd] text-unset transition-colors duration-300 ease-in-out border-l-4 border-blue-400 hover:border-green-400 text-black" style={{ fontSize: "1.1rem" }}>
          <td className="px-4 py-2">{membre._id}</td>
          <td className="px-4 py-2">{membre.nom}</td>
            <td className="px-4 py-2">{membre.prenom}</td>
            <td className="px-4 py-2">{membre.email}</td>
            <td className="px-4 py-2">{membre.profile}</td>
            <td className="px-4 py-2">{membre.projets}</td>
            
            <td className="px-4 py-2">{membre.projet_actuel}</td>
            <td className="px-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <FaTrashAlt
                className="text-red-500 cursor-pointer mr-2 bg-zing-200 p-1 rounded-md hover:text-red-600"
                style={{ fontSize: "1.7rem" }}
                onClick={() => deleteMember(membre._id)}
              />
              <FaEdit
                className="text-blue-500 cursor-pointer mr-2 bg-zing-200 p-1 rounded-md hover:text-blue-600"
                style={{ fontSize: "1.8rem" }}
                onClick={() => showUpdateFormFor(membre)}
              /></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </ResultSection>
);
} ;

    



const AddMemberForm = () => {
  const [formData, setFormData] = useState({
    _id: '',
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    profile: '',
    projets: [],
    projet_actuel: ''
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProjectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      projets: selectedOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/members', formData);
      console.log('Member added successfully:', response.data);
      // Reset the form
      setFormData({
        _id: '',
        nom: '',
        prenom: '',
        email: '',
        mot_de_passe: '',
        profile: '',
        projets: [],
        projet_actuel: ''
      });
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };
   const sizes = ["sm", "md", "lg"];
    const ResultSection = ({ children }) => (
      <div className="my-8 flex justify-center items-center w-10/5 h-auto">
        <div className="rounded-lg bg-gray-700 p-8">
          {children}
        </div>
      </div>
    );
  
  

  return (
    
    <form onSubmit={handleSubmit}
      className="my-8 w-full max-w-md mx-auto bg-gray-900 shadow-md rounded px-8 pt-6 pb-8">
      <div className="grid grid-cols-2 gap-4">
  
  <label className="block text-gray-400 text-sm font-bold mb-2">
        Code:
        <FontAwesomeIcon icon={faUser} className="menu-icon" />
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 "
          autoFocus
     /></label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
        Nom:
        <FontAwesomeIcon icon={faUser} className="menu-icon" />
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 "
          autoFocus
     />
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
        Prénom:<FontAwesomeIcon icon={faUser} className="menu-icon" />
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          autoFocus />
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
        Email:   <FontAwesomeIcon icon={faEnvelope} className="menu-icon" />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange} required
          className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          autoFocus/>
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
        Mot de passe:    <FontAwesomeIcon icon={faLock} className="menu-icon" />
        <input
          type="text"
          name="mot_de_passe"
          value={formData.mot_de_passe}
          onChange={handleChange} required
          className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
        Profile:   <FontAwesomeIcon icon={faBriefcase} className="menu-icon" />
        <input
          type="text"
          name="profile"
          value={formData.profile}
          onChange={handleChange} required
          className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
    "/>
      </label>
      <label className="block text-gray-400 text-sm font-bold mb-2">
          Projets:
          <select
            name="projets"
            multiple
            value={formData.projets}
            onChange={handleProjectChange}
            required
            className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {projects.map(project => (
              <option key={project._id} value={project._id}>
                {project.projet}
              </option>
            ))}
          </select>
            </label>
            <label className="block text-gray-400 text-sm font-bold mb-2">
          Projet actuel:
          <select
            name="projet_actuel"
            value={formData.projet_actuel}
            onChange={handleChange}
            required
            className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {projects.map(project => (
              <option key={project._id} value={project._id}>
                {project.projet}
              </option>
            ))}
          </select>
        </label>
      <button
        type="submit"
        className="right-section bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleSubmit}
      >
        Ajouter Membre
      </button>
    </div></form>
  );
};
//setShowUpdateForm(false); // Assurez-vous que le formulaire de modification est masqué
 
const UpdateMemberForm = ({ member, updateMember }) => {
  const [updatedMember, setUpdatedMember] = useState(member);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember({ ...updatedMember, [name]: value });
  };

  const handleProjectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setUpdatedMember({ ...updatedMember, projets: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/members/${member._id}`, updatedMember, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Member updated:", response.data);
      updateMember(member._id, response.data);
    } catch (error) {
      console.error("Error updating member:", error.response ? error.response.data : error.message);
    }
  };
  
  const ResultSection = ({ children }) => (
    <div className="my-8 flex justify-center items-center w-3/5 h-auto">
    <div className="rounded-lg bg-gray-400 p-8">
      {children}
    </div>
   </div>
  );
  
  
  return (
    
     <form onSubmit={handleSubmit}
      className="my-8 w-full max-w-md mx-auto bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 justify-center items-center ">
      <div className="grid grid-cols-2 gap-4">
      
      <div className="mb-4 justify-center items-center ">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            <span>code:</span>
            <FontAwesomeIcon icon={faUser} className="menu-icon ml-2" />
          </label>
          <input
            type="text"
            name="id"
            value={updatedMember._id}
            onChange={handleChange} required
            className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            <span>Nom:</span>
            <FontAwesomeIcon icon={faUser} className="menu-icon ml-2" />
          </label>
          <input
            type="text"
            name="nom"
            value={updatedMember.nom}
            onChange={handleChange} required
            className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            <span>Prénom:</span>
            <FontAwesomeIcon icon={faUser} className="menu-icon ml-2" />
          </label>
          <input
            type="text"
            name="prenom"
            value={updatedMember.prenom}
            onChange={handleChange} required
            className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoFocus />
        </div>
        {/* Deuxième ligne */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            <span>Email:</span>
            <FontAwesomeIcon icon={faEnvelope} className="menu-icon ml-2" />
          </label>
          <input
            type="text"
            name="email"
            value={updatedMember.email}
            onChange={handleChange} required
            className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoFocus />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            <span>Mot de passe:</span>
            <FontAwesomeIcon icon={faLock} className="menu-icon ml-2" />
          </label>
          <input
            type="text"
            name="mot_de_passe"
            value={updatedMember.mot_de_passe}
            onChange={handleChange} required
            className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoFocus
          />
        </div>
        {/* Troisième ligne */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            <span>Profile:</span>
            <FontAwesomeIcon icon={faBriefcase} className="menu-icon ml-2" />
          </label>
          <input
            type="text"
            name="profile"
            value={updatedMember.profile}
            onChange={handleChange} required
            className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoFocus  />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            <span>Projets:</span>
            <select
              name="projets"
              multiple
              value={updatedMember.projets}
              onChange={handleProjectChange}
              required
              className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.projet}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            <span>Projet actuel:</span>
            <select
              name="projet_actuel"
              value={updatedMember.projet_actuel}
              onChange={handleChange}
              required
              className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.projet}
                </option>
              ))}
            </select>
          </label>
        </div>
        
      
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
       
      >
        
        Modifier Membre
      </button></div>
    </form>
  );
}

const deleteMember = async (memberId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/members/${memberId}`); // Ensure memberId is included in the URL
    console.log('Membre supprimé avec succès :', response.data.message);
    // Mettre à jour l'état après la suppression réussie
    setMembres(membres.filter(member => member.id !== memberId));
  } catch (error) {
    console.error('Erreur lors de la suppression du membre :', error);
  }
};
  
const MemberPage = () => {
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [showMemberTable, setShowMemberTable] = useState(true);
  const [membres, setMembres] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [memberToUpdate, setMemberToUpdate] = useState(null);
  const [projets, setProjets] = useState([]); // État pour stocker les projets

  useEffect(() => {
    const fetchMembres = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/members");
        setMembres(response.data);
      } catch (error) {
        console.error("Error fetching membres:", error);
      }
    };
    const fetchProjets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projets");
        setProjets(response.data);
      } catch (error) {
        console.error("Error fetching projets:", error);
      }
    };

    
    fetchProjets();
    fetchMembres();
  }, []);
 
  const addMember = async (newMemberData) => {
    try {
        const response = await axios.post("http://localhost:5000/api/members", newMemberData);
        console.log("New member added:", response.data);
        setMembres([...membres, response.data]);
    } catch (error) {
        console.error("Error adding member:", error);
    }
  };

  const deleteMember = async (memberId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/members/${memberId}`);
      console.log('Membre supprimé avec succès :', response.data.message);
      // Ajoutez ici d'autres actions à effectuer après la suppression réussie du membre
    } catch (error) {
      console.error('Erreur lors de la suppression du membre :', error);
    }
  };


  const updateMember = async (id, updatedMemberData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/members/${id}`, updatedMemberData);
      console.log("Member updated:", response.data);
      // Update the state with the updated member
      const updatedMembres = membres.map((member) =>
        member.id === id ? { ...member, ...updatedMemberData } : member
      );
      setMembres(updatedMembres);
      setShowUpdateForm(false);
      setMemberToUpdate(null);
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };
  

  const showUpdateFormFor = (member) => {
    setShowUpdateForm(true);
    setMemberToUpdate(member);
  };

  const handleShowMemberTable = () => {
    setShowUpdateForm(false); // Assurez-vous que le formulaire de mise à jour est masqué
    setShowMemberTable(true); // Affichez le tableau
  };

  const handleShowAddMemberForm = () => {
    setShowAddMemberForm(true);
    setShowMemberTable(false); // Masquez le tableau
  };
  

    const [menuVisible, setMenuVisible] = useState(false);
  
    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    }
  const ButtonSection = ({ children }) => (
    <div className="my-8 flex justify-center items-center w-3/5 h-auto">
    <div className="rounded-lg bg-gray-400 p-8">
      {children}
    </div>
   </div>
  );

  const ResultSection = ({ children }) => (
    <div className="my-8 flex justify-center items-center">
      <div className="rounded-lg bg-gray-200 dark-bg-gray-200 p-8">
        {children}
      </div>
    </div>
  );

  return (
    
    <Layout>
  <div className="container px-4 flex justify-center items-center">
       
    <div className="flex grid grid-cols-1 gap-4">
     
      <h1 className="text-white">-------------</h1><h1 className="text-white">-------------</h1>
      <h1 className="text-white">-------------</h1><h1 className="text-white">-------------</h1>
      <div className="flex grid grid-cols-3 gap-5">
     
       {/* Contenu de ButtonSection */}
       <div className="">
  <input
    type="text"
    placeholder="Rechercher..."
    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  
</div>
<div className="flex grid grid-cols-3 gap-4 items-center">

              <button
               className="text-white bg-blue-500 w-32 h-10 rounded-md hover:bg-blue-600"
                onClick={() => setShowUpdateForm(false)}
              >
                Afficher les  Membres
              </button>
              
              <button
                onClick={handleShowAddMemberForm}
                className="text-white bg-blue-500 w-32 h-10 rounded-md hover:bg-blue-600"

              >
                + Ajouter Membre
              </button>
              </div>
              </div>
              
              <ResultSection>
          <div className="flex items-center flex-col">
            {/* Utilisation d'un opérateur ternaire pour afficher le bon formulaire en fonction de showUpdateForm */}
            {showUpdateForm ? (
            <UpdateMemberForm member={memberToUpdate} updateMember={updateMember} />
          ) : showAddMemberForm ? (
            <AddMemberForm addMember={addMember} />
          ) : (
            <div className="flex items-center flex-col">
            
              <MemberTable
                membres={membres}
                projets={projets}
                deleteMember={deleteMember}
                showUpdateFormFor={showUpdateFormFor}
              />
            </div>
          )}
          </div>
        </ResultSection>
     
    </div>
  </div>
</Layout>


  );
};

export default MemberPage;

/*<Layout>
  <div className="container px-4">
    <ButtonSection>
    <ResultSection>
    <div className={`fixed left-0 top-0 bottom-0 bg-gray-800 p-4 ${menuVisible ? 'w-64' : 'w-16'} transition-width duration-300 z-10`}>
      
      <button onClick={toggleMenu} className="absolute top-4 right-4 text-white focus:outline-none">
        {menuVisible ? 'Hide Menu' : 'Show Menu'}
      </button>
      <div className="flex items-center flex-col"> {/* Flex colonne pour afficher les boutons verticalement 
        <button
          className="hover:bg-gray-500 transition-colors duration-300 bg-blue-400 text-white px-4 py-2 rounded w-56" // Ajout de mb-2 pour un espace entre les boutons
          onClick={() => setShowUpdateForm(false)}
        >
          Afficher les Projets
        </button>
        <h3 className="text-gray-400">-----------</h3>
        <button
  onClick={handleShowAddMemberForm}
  className="hover:bg-gray-500 transition-colors duration-300 bg-blue-400 text-white px-4 py-2 rounded w-56"
>
  Ajouter Membre
</button>
      </div> <div className="flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  </ResultSection>
    </ButtonSection>

    <h1 className="text-gray-900">-------------</h1><h1 className="text-gray-900">-------------</h1>
    <h1 className="text-gray-900">-------------</h1><h1 className="text-gray-900">-------------</h1>
  
    <ResultSection>
    <div className="flex items-center flex-col">
   
    {showUpdateForm ? (
  <UpdateMemberForm member={memberToUpdate} updateMember={updateMember} />
) : (
  <MemberTable
    membres={membres}
    deleteMember={deleteMember}
    showUpdateFormFor={showUpdateFormFor}
  />
)}

<h1 className="text-gray-900">-------------</h1>
{showAddMemberForm && <AddMemberForm addMember={addMember} />}
</div></ResultSection>
  </div>
</Layout>*/
