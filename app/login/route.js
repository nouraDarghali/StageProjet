import { NextResponse } from 'next/server';
import testMongoDBConnection from '../config/test-mongodb-connection';
//GET METHOD
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const password = searchParams.get('password');

  try {
    const db = await testMongoDBConnection();
    const usersCollection = db.collection('Utilisateurs');
    const user = await usersCollection.findOne({ nom: username, mot_passe: password }, { projection: { profile: 1 } });
    
    if (user) {
      return NextResponse.json({ profile: user.profile }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Nom d'utilisateur ou mot de passe incorrect." }, { status: 404 });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    return NextResponse.json({ message: 'Une erreur s\'est produite lors de la récupération du profil.' }, { status: 500 });
  }
}

  //METHOD POST
export async function POST(req) {
  try {
    const formData = await req.formData();
    const username = formData.get('username');
    const password = formData.get('password');
    
    const db = await testMongoDBConnection();
    const tachesCollection = db.collection('Utilisateurs');
    const user = await tachesCollection.findOne({ nom: username, mot_passe: password });

    if (user) {
      return NextResponse.json({ message: "Connexion réussie !" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Nom d'utilisateur ou mot de passe incorrect." }, { status: 404 });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return NextResponse.json({ message: 'Une erreur s\'est produite lors de la vérification des informations d\'identification.' }, { status: 500 });
  }
}
