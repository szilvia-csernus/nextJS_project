import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
          "mongodb+srv://szilvi:Cuvgu9-cakrat-byxbur@cluster0.hp2po9x.mongodb.net/meetups?retryWrites=true&w=majority");
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted.'});
        
    }
}
export default handler

// mongoDB credentials: szilvi, pw: Cuvgu9-cakrat-byxbur