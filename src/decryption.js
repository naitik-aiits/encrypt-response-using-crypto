import CryptoJS from 'crypto-js';

// Define your function
export const Decrypt = (encryptedData, secretKey) => {

    try {
        // Decrypt the data using the same secret key
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    } catch (error) {
        throw error;
    }
};

