const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    encryptedData: {
        type: String,
        required: true
    }
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;