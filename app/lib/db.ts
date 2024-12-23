import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGO_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to preserve the connection across hot reloads
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, create a new connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export const connectToDatabase = async () => {
const client = await clientPromise;
const db = client.db();
return { client, db };
};

export default clientPromise;