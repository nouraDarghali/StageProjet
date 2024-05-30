
import { user } from '@nextui-org/react';
import testMongoDBConnection from '../../../../config/test-mongodb-connection';
const { NextResponse } = require('next/server');
//GET METHOD
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  const db = await testMongoDBConnection();
  const tachesCollection = db.collection('Taches');

  // Filtrer les tâches par nom d'utilisateur
  const taches = await tachesCollection.find({ membre: username }).toArray();

  return NextResponse.json({ taches });
}
  //POST METHODE
  export async function POST(request) {
    const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
        const { tache, description, projet } = await request.json();
        const db = await testMongoDBConnection();
        const tachesCollection = db.collection('Taches');
        let date_fin="--";
       // Obtenir la date actuelle
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const membre=username;
    // Formater la date au format jour/mois/année
    const date_debut = `${day}/${month}/${year}`;
        let duree="--";
        let statut="en cours";
        const result = await tachesCollection.insertOne({ tache, description, date_debut,date_fin,duree, statut, projet,membre });
        return NextResponse.json({ message: "Tâche créée avec succès", id: result.insertedId }, { status: 201 });
}