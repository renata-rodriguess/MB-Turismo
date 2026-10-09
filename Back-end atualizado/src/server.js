const app = require('./app');
const connectDB = require('./config/db');


const PORT = process.env.PORT || 3001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(erro => {
    console.error('Erro:', erro.message);
    process.exit(1);
});