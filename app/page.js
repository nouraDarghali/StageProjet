
// pages/index.js

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Page d'accueil</h1>
      <ul>
        <li>
          <Link href="/espaceAdmin">
            Administrateur
          </Link>
        </li>
        <li>
          <Link href="/espaceResponsable">
            Responsable de projet
          </Link>
        </li>
        <li>
          <Link href="/espaceChef/membre">
            Chef de projet
          </Link>
        </li>
        <li>
          <Link href="/espaceMembre">
            Membre de projet
          </Link>
        </li>
        <li>
          <Link href="/conDB">
            connexion
          </Link>
        </li>
      </ul>
    </div>
  );
} 
