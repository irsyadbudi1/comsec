const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Hapus opsi useNewUrlParser dan useUnifiedTopology
        await mongoose.connect('mongodb://localhost:27017/mydatabase');
        console.log('Connected to MongoDB...');
    } catch (err) {
        console.error('Could not connect to MongoDB...', err);
        process.exit(1); // Keluar dari aplikasi jika gagal terhubung ke MongoDB
    }
};

module.exports = connectDB;
