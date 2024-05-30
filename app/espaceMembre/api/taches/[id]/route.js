// import { ObjectId } from "mongodb";
// import testMongoDBConnection from '../../../../config/test-mongodb-connection';
// import { NextResponse } from "next/server";
// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { newStatut: statut } = await request.json();
//   const currentDate = new Date();
//   const day = String(currentDate.getDate()).padStart(2, '0');
//   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//   const year = currentDate.getFullYear();
//   const date_fin = `${day}/${month}/${year}`;
//   try {
//     const db = await testMongoDBConnection();
//     const tachesCollection = db.collection('Taches');
    
//     // Utilisation de l'ID comme sélecteur et spécification du champ à mettre à jour avec sa nouvelle valeur
//     const result = await tachesCollection.updateOne({ _id: new ObjectId(id) }, { $set: { statut: statut,date_fin:date_fin } });

//     if (result.modifiedCount === 1) {
//       return NextResponse.json({ message: "Tache updated" }, { status: 200 });
//     } else {
//       return NextResponse.json({ message: "No matching document found or no changes were made" }, { status: 404 });
//     }
//   } catch (error) {
//     console.error("Error updating tache:", error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }
import { ObjectId } from "mongodb";
import testMongoDBConnection from '../../../../config/test-mongodb-connection';
import { NextResponse } from "next/server";

// Helper function to parse a date in "DD/MM/YYYY" format
function parseDate(dateString) {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { newStatut: statut } = await request.json();
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const date_fin = `${day}/${month}/${year}`;

  try {
    const db = await testMongoDBConnection();
    const tachesCollection = db.collection('Taches');
    
    // Retrieve the task to get the start date
    const task = await tachesCollection.findOne({ _id: new ObjectId(id) });

    if (!task) {
      return NextResponse.json({ message: "No matching document found" }, { status: 404 });
    }

    const date_debut = parseDate(task.date_debut); // Parse the start date
    const diffTime = Math.abs(currentDate - date_debut);
    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate the duration in days
    const durationWithUnit = `${duration} jour${duration > 1 ? 's' : ''}`; // Add "jour" with pluralization

    // Update the task with the new status, end date, and duration
    const result = await tachesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { statut: statut, date_fin: date_fin, duree: durationWithUnit } } // Correct field name for duration
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: "Tache updated" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No matching document found or no changes were made" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating tache:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

//GET METHOD
export async function GET(request, { params }) {
    const { id } = params;
    const db = await testMongoDBConnection();
    const tachesCollection = db.collection('Taches');
    const task = await tachesCollection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json({ task }, { status: 200 });
  }
