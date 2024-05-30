'use client';
 import React, { useState, useEffect } from 'react';
import { HiUser, HiLockClosed } from 'react-icons/hi';
import { useRouter } from "next/navigation";
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Connexion réussie
        await fetchProfile(); // Fetch the profile after successful login
      } else {
        const text = await response.text();
        console.error('Erreur lors de la connexion :', text);
        setError('Une erreur s\'est produite lors de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setError('Une erreur s\'est produite lors de la connexion.');
    }
  };
  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/login?username=${username}&password=${password}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile); // Set the profile fetched from the server
      } else {
        const text = await response.text();
        console.error('Erreur lors de la récupération du profil :', text);
        setError('Une erreur s\'est produite lors de la récupération du profil.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil :', error);
      setError('Une erreur s\'est produite lors de la récupération du profil.');
    }
  };
  useEffect(() => {
    if (profile === 'Administrateur') {
      router.push("/espaceAdmin");
    } else if (profile === 'Responsable de projet') {
      router.push('/espaceResponsable');
    } else if (profile === 'Chef de projet') {
      router.push('/chef');
    } else if (profile === 'Membre de projet') {
      router.push(`/espaceMembre?username=${encodeURIComponent(username)}`);
      
    }
  }, [profile, router,username]);
  

return (
  <div className="flex justify-center items-center h-screen">
    <form onSubmit={handleSubmit} className="max-w-md w-full px-4">
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">
          <span className="flex items-center">
            <HiUser className="w-5 h-5 mr-2" /> Nom d'utilisateur
          </span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          autoComplete="username"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          style={{ height: '2.5rem' }} // Taille personnalisée pour l'entrée
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
          <span className="flex items-center">
            <HiLockClosed className="w-5 h-5 mr-2" /> Mot de passe
          </span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="current-password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          style={{ height: '2.5rem' }} // Taille personnalisée pour l'entrée
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="profile" className="block mb-2 text-sm font-medium text-gray-600">
          <span className="flex items-center">
            Profil
          </span>
        </label>
        <input
          type="text"
          id="profile"
          name="profile"
          value={profile}
          readOnly
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          style={{ height: '2.5rem' }}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
      >
        Connexion
      </button>
    </form>
    {error && <p className="text-red-500 mt-4">{error}</p>}
  </div>
);

}
export default LoginForm;
