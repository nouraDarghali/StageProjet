// import testMongoDBConnection from '../../../../../config/test-mongodb-connection';
// const { NextResponse } = require('next/server');

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const username = searchParams.get('username');
//   const db = await testMongoDBConnection();
//   const tachesCollection = db.collection('Taches');

//   // Filtrer les tâches par nom d'utilisateur et où le champ "projet" n'est pas vide, et ne sélectionner que le champ "projet"
//   const projets = await tachesCollection.find({ membre: username, projet: { $exists: true, $ne: '' } }, { projection: { projet: 1 } }).toArray();

//   return NextResponse.json({ projets });  // Envelopper les projets dans un objet
// }
import testMongoDBConnection from '../../../../../config/test-mongodb-connection';
const { NextResponse } = require('next/server');

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const db = await testMongoDBConnection();
  const tachesCollection = db.collection('Taches');

  // Filtrer les tâches par nom d'utilisateur et où le champ "projet" n'est pas vide, et ne sélectionner que le champ "projet"
  const allProjets = await tachesCollection.find({ membre: username, projet: { $exists: true, $ne: '' } }, { projection: { projet: 1 } }).toArray();

  // Regrouper les projets en utilisant un Map
  const projetMap = new Map();
  allProjets.forEach(task => {
    const projet = task.projet;
    if (projetMap.has(projet)) {
      projetMap.get(projet).count++;
    } else {
      projetMap.set(projet, { count: 1 });
    }
  });

  // Convertir le Map en tableau de réponse
  const projets = Array.from(projetMap, ([name, { count }]) => ({ name, count }));

  return NextResponse.json({ projets });
}