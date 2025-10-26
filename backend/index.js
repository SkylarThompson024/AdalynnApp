import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import multer from 'multer'; //To handle pictures fetching and posting
import { MongoClient, ObjectId } from "mongodb";
import { Buffer } from 'buffer';
// const e = require('express');

dotenv.config({ path: './config.env' })

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() }); 


// eslint-disable-next-line no-undef
const uri = process.env.ATLAS_URI;
// eslint-disable-next-line no-undef
const port = process.env.PORT;
if (!uri) {
    throw new Error('Missing ATLAS_URI in environment variables');
}
if (!port) {
    throw new Error('Missing PORT in environment variables');
}
const client = new MongoClient(uri)
const dbName = 'AdalynnDatabase';


//GET Routes
app.get('/ping', (req, res) => {        //For pinging the Render server periodically to indicate to the user if the connection is active or not
    res.status(200).json({ ok: true});
    //res.send('pong');
});

app.get('/', (req, res) => {
    res.send('Hello from Express');
});

app.get('/feed', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Feed');
        const entries = await collection.find({}).toArray();
        res.json(entries);
    } catch (error) {
        console.error('Error fetching Feed: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/sleep', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Sleep');
        const entries = await collection.find({}).toArray();
        res.json(entries);
    } catch (error) {
        console.error('Error fetching Sleep: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/diaper', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Diaper');
        const entries = await collection.find({}).toArray();
        res.json(entries);
    } catch (error) {
        console.error('Error fetching Diaper: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/sick', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Sick');
        const entries = await collection.find({}).toArray();
        res.json(entries);
    } catch (error) {
        console.error('Error fetching Sick: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/injury', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Injury');
        const entries = await collection.find({}).toArray();
        res.json(entries);
    } catch (error) {
        console.error('Error fetching Injury: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/doctor', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Doctor');
        const entries = await collection.find({}).toArray();
        res.json(entries);
    } catch (error) {
        console.error('Error fetching Doctor: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//This get method for picture gets all the pictures from the Picture collection 
app.get('/picture', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Picture');
        const entries = await collection.find({}, { projection: { imageUri: 0 } }).toArray(); //projection part excludes binary for performance?
        res.json(entries);
        console.log(`In GET picture => entries: ${entries}`)
    } catch (error) {
        console.error('Error fetching Picture: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//This get method gets the neccessary data for each individual picture to render on screen
app.get('/picture/:id/image', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Picture');

        const entry = await collection.findOne({ _id: new ObjectId(req.params.id) });
        console.log('Requested image ID: ', req.params.id);
        console.log('Found entry: ', entry);

        if (!entry || !entry.imageUrl) {
            return res.status(404).send('Image not found');
        }

        //Ensure imageUri is a buffer
        const imageBuffer = Buffer.isBuffer(entry.imageUri)
            ? entry.imageUri
            : Buffer.from(entry.imageUri.buffer); //handles BSON binary

        console.log('Serving image with type: ', entry.imageType)
        res.set('Content-Type', entry.imageType);
        res.send(imageBuffer);
    } catch (error) {
        console.error('Error serving image: ', error);
        res.status(500).send('Server error');
    }
});

//POST Routes
app.post('/feed', async (req, res) => {
    try {
        const { amount, date, guardian, type, time } = req.body;
        console.log(`Amount: ${amount}`);
        console.log(`Date: ${date}`);
        console.log(`Guardian: ${guardian}`);
        console.log(`Type: ${type}`);
        console.log(`Time: ${time}`);
        
        //Basic Validation
        if (
            typeof amount !== 'number' ||
            typeof guardian !== 'string' ||
            typeof type !== 'string' ||
            typeof time !== 'string' ||
            isNaN(Date.parse(date))
        ) {
            return res.status(400).json({ error: 'Invalid input format' })
        }
        

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Feed');

        const entry = {
            amount,
            date: new Date(date), //This ensures it is stored as a Date Object
            guardian,
            time,
            type,
        };

        const result = await collection.insertOne(entry);
        res.status(201).json({ message: 'Entry added', id: result.insertedId });
    } catch (error) {
        console.error('Error inserting entry: ', error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
});

app.post('/sleep', async (req, res) => {
    try {
        const { fromTime, toTime, elapsedTime, date, guardian } = req.body;

        //Basic Validation
        if (
            typeof fromTime !== 'string' ||
            typeof toTime !== 'string' ||
            typeof elapsedTime !== 'string' ||
            typeof guardian !== 'string' ||
            isNaN(Date.parse(date))
        ) {
            return res.status(400).json({ error: 'Invalid input format'})
        }

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Sleep');

        const entry = {
            fromTime,
            toTime,
            elapsedTime,
            date: new Date(date), //This ensures it is stored as a Date Object
            guardian,
        };

        const result = await collection.insertOne(entry);
        res.status(201).json({ message: 'Entry added', id: result.insertedId });
    } catch (error) {
        console.error('Error inserting entry: ', error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
});

app.post('/diaper', async (req, res) => {
    try {
        const { type, date, guardian, time } = req.body;

        //Basic Validation
        if (
            typeof type !== 'string' ||
            typeof guardian !== 'string' ||
            typeof time !== 'string' ||
            isNaN(Date.parse(date))
        ) {
            return res.status(400).json({ error: 'Invalid input form' })
        }

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Diaper');

        const entry = {
            type,
            date: new Date(date), //This ensures it is stored as a Date Object
            guardian,
            time,
        };

        const result = await collection.insertOne(entry);
        res.status(201).json({ message: 'Entry added', id: result.insertedId });
    } catch (error) {
        console.error('Error inserting entry: ', error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
});

app.post('/sick', async (req, res) => {
    try {
        const { date, guardian, notes, time } = req.body;

        //Basic Validation
        if (
            typeof guardian !== 'string' ||
            typeof notes !== 'string' ||
            typeof time !== 'string' ||
            isNaN(Date.parse(date))
        ) {
            return res.status(400).json({ error: 'Invalid input format' })
        }

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Sick');

        const entry = {
            date: new Date(date), //This ensures it is stored as a Date Object
            guardian,
            time,
            notes,
        };

        const result = await collection.insertOne(entry);
        res.status(201).json({ message: 'Entry added', id: result.insertedId });
    } catch (error) {
        console.error('Error inserting entry: ', error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
});

app.post('/injury', async (req, res) => {
    try {
        const { date, guardian, notes, time } = req.body;

        //Basic Validation
        if (
            typeof guardian !== 'string' ||
            typeof notes !== 'string' ||
            typeof time !== 'string' ||
            isNaN(Date.parse(date))
        ) {
            return res.status(400).json({ error: 'Invalid input format' })
        }

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Injury');

        const entry = {
            date: new Date(date), //This ensures it is stored as a Date Object
            guardian,
            time,
            notes,
        };

        const result = await collection.insertOne(entry);
        res.status(201).json({ message: 'Entry added', id: result.insertedId });
    } catch (error) {
        console.error('Error inserting entry: ', error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
});

app.post('/doctor', async (req, res) => {
    try {
        const { date, guardian, notes, time } = req.body;

        //Basic Validation
        if (
            typeof guardian !== 'string' ||
            typeof notes !== 'string' ||
            typeof time !== 'string' ||
            isNaN(Date.parse(date))
        ) {
            return res.status(400).json({ error: 'Invalid input format' })
        }

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Doctor');

        const entry = {
            date: new Date(date), //This ensures it is stored as a Date Object
            guardian,
            time,
            notes,
        };

        const result = await collection.insertOne(entry);
        res.status(201).json({ message: 'Entry added', id: result.insertedId });
    } catch (error) {
        console.error('Error inserting entry: ', error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
});

app.post('/picture', upload.single('photo'), async (req, res) => {
    try {
        const { guardian, caption, date } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        //Basic Validation
        if (
            typeof guardian !== 'string' ||
            typeof caption !== 'string' ||
            isNaN(Date.parse(date))
        ) {

            return res.status(400).json({ error: 'Invalid input format' })
        }

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Picture');

        const _id = new ObjectId(); //Manually assigned ID so it can be used in imageUrl
        const imageUrl = `${req.protocol}://${req.get('host')}/picture/${_id}/image`;

        const entry = {
            _id,
            guardian,
            caption,
            date: new Date(date), //This ensures it is stored as a Date Object
            imageUri: file.buffer, //Raw Binary
            imageType: file.mimetype, //e.g. 'image/png'
            imageUrl,
        };
        
        const result = await collection.insertOne(entry);
        console.log('Inserted entry: ', result);

        res.status(201).json({ message: 'Entry added', id: _id });
    } catch (error) {
        console.error('Error inserting entry: ', error.stack || error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
});


//Port listener
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
