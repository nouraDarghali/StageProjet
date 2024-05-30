import testMongoDBConnection from '../../../../../config/test-mongodb-connection';
const { NextResponse } = require('next/server');

// GET METHOD
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  const db = await testMongoDBConnection();
  const tachesCollection = db.collection('Tâches_CheftoM');

  // Filtrer les tâches par nom d'utilisateur, trier par _id décroissant, puis limiter à 2 résultats
  const task = await tachesCollection.find({ membre: username })
    .sort({ _id: -1 })  // Trier par _id en ordre décroissant pour obtenir les lignes les plus récentes
    .limit(2)
    .toArray();

  return NextResponse.json({ task });
}

