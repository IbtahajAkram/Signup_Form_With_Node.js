const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

const connectionString = 'mongodb+srv://zawwar1313:SKemd6qGp8cvc3BT@cluster0.yf0z8hu.mongodb.net/?retryWrites=true&w=majority';
const databaseName = 'register';
const collectionName = 'registers';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the signup form
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// Handle the form submission
app.post('/signup', async (req, res) => {
  try {
    const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    const dataToInsert = req.body;

    const result = await collection.insertOne(dataToInsert);

    console.log(`User registered successfully. Inserted ID: ${result.insertedId}`);

    res.send('Signup successful!');

    await client.close();
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
