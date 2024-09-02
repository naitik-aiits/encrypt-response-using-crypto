const express = require('express');
const cors = require('cors');
const CryptoJS = require('crypto-js');
const app = express();

// Secret key for encryption/decryption
const secretKey = 'hlo-world';

// Middleware
app.use(cors());
app.use(express.json());

// Encrypt data
app.post('/encrypt', (req, res) => {
  // if (!data) {
    //   return res.status(400).json({ error: 'No data provided' });
    // }
    
    try {
    const { data } = req.body;
    // const { name,age,gender,isAvailable } = req.body;
    // const dataToEncrypt = JSON.stringify({ name, age, gender, isAvailable });
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    console.log(encryptedData);
    res.json({ encryptedData });
  } catch (error) {

    res.status(500).json({ error: 'Error encrypting data' });
  }
});

// Decrypt data
app.post('/decrypt', (req, res) => {
  const { encryptedData } = req.body;
  if (!encryptedData) {
    return res.status(400).json({ error: 'No data provided' });
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    console.log(typeof decryptedData);
    res.json({ decryptedData });
  } catch (error) {
    res.status(500).json({ error: 'Error decrypting data' });
  }
});

app.listen(3007, () => {
  console.log('Server running on port 3007');
});
