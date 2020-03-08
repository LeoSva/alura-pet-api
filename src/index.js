const app = require('../src/config/customExpress');
const mysql = require('mysql');
const conexao = require('./app/infra/conexao');
const Tabelas = require('./app/infra/tabelas');

conexao.connect(erro => {
    new Promise((resolve, reject) =>{
        if(erro) {
            console.log('erro ao conectar no banco: ' + erro);
            return reject(erro);
        }
        console.log('conectado ao banco com sucesso');
        
        Tabelas.init(conexao);
        
        return resolve();

    })
    .then(value => {
        app.listen(3030, () => {
            console.log('Servidor rodando!');
        });
    })
    .catch(erro => {
        console.log('Impossível iniciar a aplicação\n' + erro);
    });

});
