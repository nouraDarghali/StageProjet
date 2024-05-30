import testMongoDBConnection from '../../../../../config/test-mongodb-connection';
const { NextResponse } = require('next/server');
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const db = await testMongoDBConnection();
    const tachesCollection = db.collection('Tâches_CheftoM');
    // Filtrer les tâches par nom d'utilisateur
    const tasks = await tachesCollection.find({ membre: username }).toArray();
    return NextResponse.json({ tasks });
  }