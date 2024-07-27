//pages/api/saveData.js

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const formdata = req.body;

        const client = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        try {
            await client.connect();

            // Choose a name for your database
            const database = client.db("Mantra");

            // Choose a name for your collection
            const collection = database.collection("User_Data");

            await collection.insertOne(formdata);

            res.status(201).json({ message: "Data saved successfully!" });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong!" });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }
}