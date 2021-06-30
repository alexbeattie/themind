import { MongoClient } from 'mongodb';

async function handler(req, res) {
    
    if (req.method === 'POST') {

        const data = req.body;

        const client =  await MongoClient.connect('mongodb+srv://artisanb:J6bOiVoornD31vem@cluster0.nvuhk.mongodb.net/althea?retryWrites=true&w=majority')
      
        const db = client.db();
      
        const meetupsCollection = db.collection('althea');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);
        client.close();
        res.status(201).json({message: 'Meetup Inserted'});

    }  
}
export default handler;