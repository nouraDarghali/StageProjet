// Dans votre fichier server.js
import { ObjectId } from "mongodb";
import testMongoDBConnection from '../../../../../config/test-mongodb-connection';
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { date_debut, date_fin } = await request.json();

  try {
    const db = await testMongoDBConnection();
    const tachesCollection = db.collection('Taches');

    const task = await tachesCollection.findOne({ _id: new ObjectId(id) });

    if (!task) {
      return NextResponse.json({ message: "Aucun document correspondant trouvé" }, { status: 404 });
    }

    const duration = calculateDuration(date_debut, date_fin);

    const result = await tachesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { date_debut, date_fin, duree: duration } }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: "Tâche mise à jour" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Aucun document correspondant trouvé ou aucune modification n'a été apportée" }, { status: 404 });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche:", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}

function calculateDuration(date_debut, date_fin) {
  const start = new Date(date_debut);
  const end = new Date(date_fin);
  const diffTime = Math.abs(end - start+1);
  const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${duration} jour${duration > 1 ? 's' : ''}`;
}
