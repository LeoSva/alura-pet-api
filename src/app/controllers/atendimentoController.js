const atendimentoModel = require('../models/atendimentoModel');
const moment = require('moment');

class AtendimentoController {

    static rotas() {
        return {
             home: '/',
             atendimentos: '/atendimentos',
             buscarPorId: '/atendimentos/:id'
         }
    }

    home () {
        return (req, resp) => resp.status(200).send('ok leo, isso vc já sabia! PPPp')
    }

    listaAtendimentos() {
        return (req, resp) => {
            resp.status(200).send('listagem de atendimentos');
        }
    }

    buscarAtendimento() {
        return (req, resp) => {
            const id = parseInt(req.params.id);

            atendimentoModel.buscar(id)
                .then(resultado => resp.status(200).json(resultado))
                .catch(erro => resp.status(400).json(erro));
        }
    }

    novoAtendimento() {
        return (req, resp) => {
            console.log(`Recebido:\n${JSON.stringify(req.body)}`);

            const erros = this.validarRegras(req);

            if(erros.length) {
                return resp.status(400).json(erros);
            }

            atendimentoModel
                .adiciona(req.body)
                .then(resultado => resp.status(201).json(resultado))
                .catch(erro => resp.status(400).json(erro));
        }
    }

    alterarAtendimento() {
        return (req, resp) => {
            const id = parseInt(req.params.id);
            atendimentoModel
                .alterar(req.body, id)
                .then(resultado => resp.status(200).json(resultado))
                .catch(erro => resp.status(400).json(erro));
        }
    }
    removerAtendimento() {
        return (req, resp) => {
            const id = parseInt(req.params.id);
            atendimentoModel
                .remover(id)
                .then(resultado => resp.status(200).json(resultado))
                .catch(erro => resp.status(400).json(erro));
        }
    }

    validarRegras(req) {
        const regraNome = req.body.cliente.length > 4;
        const regraData = moment(req.body.data, 'DD/MM/YYYY').isSameOrAfter(moment());
        
        const validacoes = [
            {
                mensagem: 'O nome deve conter no mínimo 5 caracteres',
                valido: regraNome
            },
            {
                mensagem: 'A data deve ser maior ou igual o data atual',
                valido: regraData
            }
        ];
        
        return validacoes.filter(valid => !valid.valido);
    }
}

module.exports = AtendimentoController;