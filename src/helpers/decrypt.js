import LaravelEncrypt from './laravel-encrypt';

const encryptor = new LaravelEncrypt(process.env.API_ENCRYPTION_KEY);

const encryptString = (plainText) => {
    try {
        const encryptedText = encryptor.encrypt(plainText);
        return encryptedText;
    } catch (error) {
        console.error('Error al encriptar el texto:', error);
        return null;
    }
};

const decryptString = (encryptedText) => {
    try {
        const decryptedText = encryptor.decrypt(encryptedText);
        return decryptedText;
    } catch (error) {
        console.error('Error al descifrar el texto:', error);
        return null;
    }
};

export { encryptString, decryptString };
