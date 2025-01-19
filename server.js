const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const connectDB = require('./config/db');  // Mengimpor fungsi koneksi MongoDB

// Koneksi ke MongoDB
connectDB();

// Middleware untuk body parser (untuk mengambil data dari form)
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine ke EJS
app.set('view engine', 'ejs');

// Tentukan folder views tempat file EJS berada
app.set('views', path.join(__dirname, 'views'));

const upload = multer({ 
    dest: 'uploads/',  // Folder tempat file akan disimpan
    limits: { fileSize: 10 * 1024 * 1024 }, // Maksimal ukuran file 10MB
}).single('file'); // Menangani hanya satu file per request

// Membuat schema dan model untuk data yang akan disimpan
const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    name: String
});
const Data = mongoose.model('Data', dataSchema);

// Set direktori untuk menyimpan file yang di-upload
const upload = multer({ 
    dest: 'uploads/',  // Folder tempat file akan disimpan
    limits: { fileSize: 10 * 1024 * 1024 }, // Maksimal ukuran file 10MB
}).single('file'); // Menangani hanya satu file per request

// Membuat schema dan model untuk menyimpan metadata file ke MongoDB
const fileSchema = new mongoose.Schema({
    name: String,
    filename: String,
    path: String,
    size: Number,
    mimetype: String,
});
const File = mongoose.model('File', fileSchema);

// Rute untuk root "/"
app.get('/', (req, res) => {
    res.render('index'); // Render file index.ejs
});

// Rute untuk meng-handle pengiriman data
app.post('/submit', (req, res) => {
    const newData = new Data({
        name: req.body.name // Mengambil data dari input form
    });

    newData.save()
        .then(() => {
            res.redirect('/success');
        })
        .catch(err => {
            res.status(400).send('Error saat menyimpan data');
        });
});

app.get('/success', (req, res) => {
    res.render('success'); // Render halaman success.ejs
});

// Jalankan server di port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
