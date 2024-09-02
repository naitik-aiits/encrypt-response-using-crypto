import React, { useState } from 'react';
import { Decrypt } from './decryption'; // Make sure the path is correct

const App = () => {
    const secretKey = 'hlo-world'; 
    const [data, setData] = useState('');
    const [encryptedData, setEncryptedData] = useState('');
    const [decryptedData, setDecryptedData] = useState('');
    const [error, setError] = useState('');

    const handleEncrypt = () => {
        fetch('http://localhost:3007/encrypt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data }),
        })
            .then(response => response.json())
            .then(data => {
                setEncryptedData(data.encryptedData);
                setError('');
            })
            .catch(err => {
                console.error('Error encrypting data:', err);
                setError('Error encrypting data');
            });
    };

    const handleDecrypt = () => {
        try {
            const decryptedData = Decrypt(encryptedData, secretKey);
            console.log('Decrypted Data:', decryptedData);
            setDecryptedData(decryptedData);
            setError('');
        } catch (err) {
            console.error('Error decrypting data:', err);
            setError('Error decrypting data');
        }
    };

    return (
        <div>
            <h1>Encryption and Decryption</h1>
            <div>
                <h2>Encrypt Data</h2>
                <input
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="Enter data to encrypt"
                />
                <button onClick={handleEncrypt}>Encrypt</button>
                <p><strong>Encrypted Data:</strong> {encryptedData}</p>
            </div>
            <div>
                <h2>Decrypt Data</h2>
                <input
                    type="text"
                    value={encryptedData}
                    onChange={(e) => setEncryptedData(e.target.value)}
                    placeholder="Enter encrypted data"
                />
                <button onClick={handleDecrypt}>Decrypt</button>
                <p><strong>Decrypted Data:</strong> {decryptedData}</p>
            </div>
            {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}
        </div>
    );
};

export default App;
