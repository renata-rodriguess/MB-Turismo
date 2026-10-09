const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mb-turismo';
        await mongoose.connect(uri);
        console.log('Conectado ao MongoDB!');
    } catch (erro) {
        console.error('Erro de conexão:', erro.message);
        throw erro;
    }
};
module.exports = conectarDB;
