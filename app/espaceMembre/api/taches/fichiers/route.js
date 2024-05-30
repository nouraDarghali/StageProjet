import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import uploadFileToS3 from './s3'; // Ensure the s3.js file is correctly implemented

// MongoDB connection function
async function connectToMongoDB() {
  const client = await MongoClient.connect("mongodb+srv://assyaasbabou:Hxj2FQ1ismuigA7J@cluster0.9sqdpz0.mongodb.net/app", {
    useUnifiedTopology: true,
  });
  return client;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replace(/ /g, "_");
    const contentType = file.type;
    let folderName = "";

    if (contentType.includes("image")) {
      folderName = "images";
    } else if (contentType === "application/pdf") {
      folderName = "pdfs";
    } else {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    // Upload the file to S3 and get the file URL
    const fileUrl = await uploadFileToS3(buffer, filename, contentType, folderName);

    // Connect to MongoDB
    const client = await connectToMongoDB();
    const db = client.db("app");

    // Insert the file URL into the "Fichiers" collection
    const result = await db.collection("Fichiers").insertOne({
      filename: filename,
      fileUrl: fileUrl, // Store the URL of the file
      contentType: contentType,
      uploadedAt: new Date(), // Optionally store the upload date
    });

    client.close();

    return NextResponse.json({ Message: "Success", fileUrl: fileUrl, status: 201 });
  } catch (error) {
    console.error("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}

// GET METHOD
// export async function GET() {
//     const db = await testMongoDBConnection();
//     const tachesCollection = db.collection('Fichiers');
//     const taches = await tachesCollection.find().toArray();
//     return NextResponse.json({ taches });
//   }


import {  ObjectId } from 'mongodb';
export const GET = async (req, res) => {
  try {
    const { id } = req.query;

    // Connect to MongoDB
    const client = await connectToMongoDB();
    const db = client.db("app");

    // Find the file by its ID
    const fileDoc = await db.collection("Fichiers").findOne({ _id: new ObjectId(id) });

    if (!fileDoc) {
      client.close();
      return res.json({ error: "File not found." }, { status: 404 });
    }

    client.close();

    // Return the file URL
    return res.json({ fileUrl: fileDoc.fileUrl, status: 200 });
  } catch (error) {
    console.error("Error occurred ", error);
    return res.json({ Message: "Failed", status: 500 });
  }
};
