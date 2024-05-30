// lib/db.js

import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://assyaasbabou:Hxj2FQ1ismuigA7J@cluster0.9sqdpz0.mongodb.net/app';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const db = client.db('app');
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    throw new Error('Erreur de connexion à la base de données');
  }
}

export default connectToDatabase;
