const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Ganti dengan port yang Anda inginkan

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://mnadhif:9841185n@cluster0.jp7etyc.mongodb.net/'; // Ganti dengan URI MongoDB Anda

app.get('/', async (req, res) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const db = client.db('catatan_keuangan');
        const collection = db.collection('items');
        const items = await collection.find({}).toArray();

        await client.close();

        res.render('index', { items });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan dalam mengakses database.');
    }
});

app.post('/tambah', async (req, res) => {
    const { nama, harga, tanggal } = req.body;

    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const db = client.db('catatan_keuangan');
        const collection = db.collection('items');
        await collection.insertOne({ nama, harga, tanggal });

        await client.close();

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan dalam mengakses database.');
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
