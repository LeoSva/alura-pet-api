const conexao = require('../infra/conexao');
const moment = require('moment');

class Atendimento {

    adiciona(atendimento) {
        
        const atendimentoComDatasFormatadas = this.formatarDatas(atendimento);
        
        const sql = 'INSERT INTO atendimentos SET ?';

        return this.salvar(sql, atendimentoComDatasFormatadas);
    }

    buscar(id) {
        const sql = 'SELECT * FROM atendimentos WHERE id=?';
        return new Promise((resolve, reject) =>{
            conexao.query(sql, id, (erro, resultado) => {
                if(erro) {
                    return reject(erro);
                }
                return resolve(resultado);
            });
        });
    }

    salvar(sql, atendimentoComDatasFormatadas) {
        return new Promise((resolve, reject) => {
            conexao.query(sql, atendimentoComDatasFormatadas, (erro, resultado) => {
                if (erro) {
                    return reject(erro);
                }
                return resolve(atendimentoComDatasFormatadas);
            });
        });
    }

    alterar(atendimento, codigo) {
        atendimento.data = this.formatarDataNoPadraoAmericano(atendimento.data);
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE atendimentos SET ? WHERE id = ?';
            conexao.query(sql, [atendimento, codigo], (erro, resultado) => {
                if(erro) {
                    return reject(erro);
                }
                return resolve({...atendimento, id: codigo});
            });
        });
    }

    remover(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM atendimentos WHERE id=?';
            conexao.query(sql, id, (erro, resultado) => {
                if(erro) {
                    return reject(erro);
                }
                return resolve({id});
            });
        });
    }

    formatarDatas(atendimento) {
        const data_criacao = moment().format('YYYY-MM-DD HH:mm');
        const dataAgendamento = this.formatarDataNoPadraoAmericano(atendimento.data);
        atendimento.data = dataAgendamento;
        return { ...atendimento, 'data_criacao': data_criacao };
    }

    formatarDataNoPadraoAmericano(data) {
        return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm');
    }
}

module.exports = new Atendimento;