import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the MongoDB connection across module reloads
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, create a new MongoClient instance and connect
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// async function getDBOld(dbName: string) {
//   try {
//     const clientInstance = await clientPromise;
//     console.log(">>>>>>Connected to DB<<<<<<");
//     return clientInstance.db(dbName);
//   } catch (error) {
//     console.log("Error Connecting to DB: ", error);
//   }
// }

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log(">>>>>>Connected to DB<<<<<<");
  } catch (error) {
    console.log("Error Connecting to DB: ", error);
  }
}

// export async function getCollection(collectionName: string) {
//   const db = await getDBOld('dev_collab_db');
//   if (db) return db.collection(collectionName);
//   return null;
// }
