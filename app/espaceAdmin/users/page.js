/*"use client"
import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('Membre');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Vérification des informations d'identification et du profil
    if (username === 'admin' && password === 'admin' && profile === 'Admin') {
      // Authentification réussie, rediriger vers le tableau de bord
      // Vous pouvez utiliser React Router pour gérer la navigation
      // Par exemple, <Redirect to="/tableau-de-bord" />
      console.log('Authentification réussie!');
    } else {
      // Afficher un message d'erreur si l'authentification échoue
      setErrorMessage('Nom d\'utilisateur, mot de passe ou profil incorrect.');
    }
  };

  return (
    <div>
      <h2>Connexion à l'application</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form>
        <div>
          <label>Nom d'utilisateur:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Profil:</label>
          <select value={profile} onChange={(e) => setProfile(e.target.value)}>
            <option value="Membre">Membre</option>
            <option value="Chef projet">Chef projet</option>
            <option value="Responsable">Responsable</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="button" onClick={handleLogin}>Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
*/
// LoginPage.tsx
/*
"use client"
// LoginPage.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const router = useRouter(); // Initialisez useRouter


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('Membre');
  const [errorMessage, setErrorMessage] = useState('');
  //const router = useRouter(); // Initialisez useRouter

  const handleLogin = () => {
    // Vérification des informations d'identification et du profil
    if (username === 'admin' && password === 'admin' && profile === 'Admin') {
      // Rediriger vers le tableau de bord Admin
      router.push('/espaceAdmin/tableau-de-bord');
    } else if (profile === 'Membre') {
      // Rediriger vers l'accueil des Membres
      router.push('/espaceMembre/Accueil');
    } else if (profile === 'Chef projet') {
      // Rediriger vers l'accueil des Chefs de projet
      router.push('/espaceChef/Accueil');
    } else if (profile === 'Responsable') {
      // Rediriger vers l'accueil des Responsables
      router.push('/espaceMembre/Responsable');
    } else {
      // Afficher un message d'erreur si l'authentification échoue
      setErrorMessage('Nom d\'utilisateur, mot de passe ou profil incorrect.');
    }
  };

  return (
    <div>
    <h2>Connexion à l'application</h2>
    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    <form>
      <div>
        <label>Nom d'utilisateur:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Mot de passe:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Profil:</label>
        <select value={profile} onChange={(e) => setProfile(e.target.value)}>
          <option value="Membre">Membre</option>
          <option value="Chef projet">Chef projet</option>
          <option value="Responsable">Responsable</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button type="button" onClick={handleLogin}>Se connecter</button>
    </form>
  </div>
);
};
export default LoginPage;*/
/*
"use client";
import React, { useState } from 'react';
import layout from './layout';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('Membre');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        const { profile } = data;
        if (profile === 'Admin') {
          window.location.href = '/espaceAdmin/tableau-de-bord';
        } else if (profile === 'Responsable') {
          window.location.href = '/espaceResponsable/Responsable';
        } else if (profile === 'Chef projet') {
          window.location.href = '/espaceChef/Accueil';
        } else if (profile === 'Membre') {
          window.location.href = '/espaceMembre/Accueil';
        }
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Une erreur est survenue.');
    }
  };

  return (
    <layout>
    <div>
      <h2>Connexion à l'application</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Profil:</label>
          <select value={profile} onChange={(e) => setProfile(e.target.value)}>
            <option value="Membre">Membre</option>
            <option value="Chef projet">Chef projet</option>
            <option value="Responsable">Responsable</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="button" onClick={handleLogin}>
            <a href="/espaceAdmin/tableau-de-bord">Se connecter</a>
          </button>
      </form>
    </div></layout>
  );
};

export default LoginPage;
*/
/*
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import { Pie } from 'react-chartjs-2';
import "../globals.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [projectManagers, setProjectManagers] = useState(0);
  const [members, setMembers] = useState(0);
  const [chefs, setChefs] = useState(0);
  const [administrators, setAdministrators] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/utilisateurs');
      console.log('Fetched users:', response.data); // Log fetched users
      setUsers(response.data);
      setTotalUsers(response.data.length);
      setProjectManagers(response.data.filter(user => user.profile === 'Responsable de projet').length);
      setMembers(response.data.filter(user => user.profile === 'Membre de projet').length);
      setChefs(response.data.filter(user => user.profile === 'Chef de projet').length);
      setAdministrators(response.data.filter(user => user.profile === 'Administrateur').length);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/utilisateurs/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const generateRandomColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const randomColor = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  };

  const data = {
    labels: ['Nombre de Responsable', 'Nombre de Membre', 'Nombre de Chef de projet', 'Nombre de Administrateur'],
 
    datasets: [
      {
        label: '# of Users',
        data: [projectManagers, members, chefs, administrators],
        backgroundColor: [
          '#0047AB', '#30D5C8', '#50C878', '#001F3F',
        ],
        borderColor: [
          '#0047AB', '#30D5C8', '#50C878', '#001F3F',
        ],
        borderWidth: 0,
      },
    ],
  };

  const filteredUsers = users.filter(user => 
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profile.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const ResultSection = ({ children }) => (
    <div className="my-8 flex items-center">
       <div className= "rounded-lg bg-gray-200 dark-bg-gray-200 p-8 hover:bg-gray-300 text-black transition-transform duration-300 hover:scale-105" style={{ fontSize: "1.5rem" ,
            font:"unset"}}>
        {children}
      </div></div>
    
  );
  

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
      <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
      <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
     <div className="flex flex-col items-center justify-center h-screen">
     <div className="mb-4 ">
    
     <div className="grid grid-cols-2 gap-4  ">
       
      
        <div className="flex items-center rounded-lg justify-center bg-gray-200 " style={{ width: '30vw', height: '50vh' }}>
        <div className="rounded-full  text-white px-4 py-2">
          <Pie data={data} /></div>
        </div>
        <div className="flex items-center rounded-lg justify-center bg-gray-200 "style={{ width: '20vw', height: '20vh' }}>
        <div className="rounded-full bg-blue-500 text-white px-4 py-2">
        {totalUsers}
        </div>
        <p className="text-black hover: text-black"> Nombre Total d'Utilisateurs </p>
      </div>
      </div></div>
      <h1 className='text-black'>-</h1>
      <h1 className='text-black font-bold'> Profils des utilisateurs</h1> 
     
      <input 
              type="text" 
              placeholder="Rechercher un utilisateur" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="mb-4 p-2 border rounded"
            />

      <h1 className='text-black'>-</h1>
      <div className="flex flex-wrap justify-center">
        
      <div className="grid grid-cols-4 gap-4 ">
        {users.map(user => (
          <div key={user._id} className="bg-gray-200 hover:bg-gray-300 w-30 h-25 m-2 p-4 rounded-lg shadow-lg flex flex-col items-center">
          <div
                className="mb-2 rounded-full"
                style={{
                  backgroundColor: generateRandomColor(user.nom),
                  width: '40px',
                  height: '40px'
                }}
              ></div>
 <div className="text-center">
              <h3 className="text-lg font-bold">{user.nom}</h3>
              <p>{user.mot_passe}</p>
              <p>{user.profile}</p>
            </div>
            <button 
              onClick={() => deleteUser(user._id)} 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2 rounded">
              Supprimer
            </button>
          </div>
        ))}
      </div></div></div></div>
    </Layout>
  );
};

export default Users;*/
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import { Pie } from 'react-chartjs-2';
import "../globals.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [projectManagers, setProjectManagers] = useState(0);
  const [members, setMembers] = useState(0);
  const [chefs, setChefs] = useState(0);
  const [administrators, setAdministrators] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/utilisateurs');
      console.log('Fetched users:', response.data); // Log fetched users
      setUsers(response.data);
      setTotalUsers(response.data.length);
      setProjectManagers(response.data.filter(user => user.profile === 'Responsable de projet').length);
      setMembers(response.data.filter(user => user.profile === 'Membre de projet').length);
      setChefs(response.data.filter(user => user.profile === 'Chef de projet').length);
      setAdministrators(response.data.filter(user => user.profile === 'Administrateur').length);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/utilisateurs/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const generateRandomColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const randomColor = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  };

  const filteredUsers = users.filter(user => 
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profile.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const data = {
    labels: ['Nombre de Responsable', 'Nombre de Membre', 'Nombre de Chef de projet', 'Nombre de Administrateur'],
    datasets: [
      {
        label: '# of Users',
        data: [projectManagers, members, chefs, administrators],
        backgroundColor: [
          '#0047AB', '#30D5C8', '#50C878', '#001F3F',
        ],
        borderColor: [
          '#0047AB', '#30D5C8', '#50C878', '#001F3F',
        ],
        borderWidth: 0,
      },
    ],
  };

  const ResultSection = ({ children }) => (
    <div className="my-8 flex items-center">
      <div className= "rounded-lg bg-gray-200 dark-bg-gray-200 p-8 hover:bg-gray-300 text-black transition-transform duration-300 hover:scale-105" style={{ fontSize: "1.5rem", font:"unset" }}>
        {children}
      </div>
    </div>
  );
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-auto flex items-center">
        <h1 className='text-white'>-</h1>
        <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
        <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
        <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
        <h1 className='text-white'>-</h1>
        <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
        <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
        <h1 className='text-white'>-</h1><h1 className='text-white'>-</h1><h1 className='text-white'>-</h1>
        
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center rounded-lg justify-center bg-gray-200" style={{ width: '30vw', height: '50vh' }}>
                <div className="rounded-full text-white px-4 py-2">
                  <Pie data={data} />
  </div>
              </div>
              <div className="flex items-center rounded-lg justify-center bg-gray-200" style={{ width: '20vw', height: '20vh' }}>
                <div className="rounded-full bg-blue-500 text-white px-4 py-2">
                  {totalUsers}
                </div>
                <p className="text-black ml-3"> Nombre Total d'Utilisateurs </p>
              </div>
         <input 
           type="text" 
           placeholder="Rechercher un utilisateur" 
           value={searchTerm} 
           onChange={(e) => setSearchTerm(e.target.value)} 
           className="mb-4 p-2 border rounded ml-3"
         />
         </div>
          </div>
          <h1 className='text-white'>-</h1>
          <h1 className='text-white'>-</h1>
          <h1 className='text-black font-bold text-4xl'> Profils des Utilisateurs</h1>
          <h1 className='text-white'>-</h1>
          
             <div className="flex flex-wrap justify-center">
            <div className="grid grid-cols-4 gap-4">
              {filteredUsers.map(user => (
                <div key={user._id} className="bg-gray-200 hover:bg-gray-300 w-30 h-25 m-2 p-4 rounded-lg shadow-lg flex flex-col items-center">
                  <div
                    className="mb-2 rounded-full"
                    style={{
                      backgroundColor: generateRandomColor(user.nom),
                      width: '40px',
                      height: '40px'
                    }}
                  ></div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{user.nom}</h3>
                    <p>{user.mot_passe}</p>
                    <p>{user.profile}</p>
                  </div>
                  <button 
                    onClick={() => deleteUser(user._id)} 
                    className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-2 mt-2 rounded">
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;

