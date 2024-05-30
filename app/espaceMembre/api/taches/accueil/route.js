import testMongoDBConnection from '../../../../config/test-mongodb-connection';
const { NextResponse } = require('next/server');
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const db = await testMongoDBConnection();
    const tachesCollection = db.collection('Taches');
    // Filtrer les tâches par nom d'utilisateur
    const taches = await tachesCollection.find({ membre: username }).toArray();
    return NextResponse.json({ taches });
  }