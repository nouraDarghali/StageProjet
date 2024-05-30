import testMongoDBConnection from '../../../../config/test-mongodb-connection';
const { NextResponse } = require('next/server');
//GET METHOD
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  const db = await testMongoDBConnection();
  const tachesCollection = db.collection('Tâches_CheftoM');

  // Filtrer les tâches par nom d'utilisateur
  const taches = await tachesCollection.find({ membre: username }).toArray();

  return NextResponse.json({ taches });
}

  //delete method
  import { ObjectId } from 'mongodb';
  
  export async function DELETE(request) {
    try {
      const id = request.nextUrl.searchParams.get("id");
      
      // Convert id from string to ObjectId
      const objectId = new ObjectId(id);
      
      // Connect to the database
      const db = await testMongoDBConnection();
      const tachesCollection = db.collection('Tâches_CheftoM');
      
      // Perform the delete operation
      const deletionResult = await tachesCollection.deleteOne({ _id: objectId });
      
      // Check if the deletion was successful
      if (deletionResult.deletedCount === 0) {
        // Task not found, return 404 response
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
      }
      
      // Task found and deleted, return success message
      return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error) {
      // Handle any errors that occur
      console.error('Error deleting task:', error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  