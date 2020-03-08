AtendimentoController = require('../controllers/atendimentoController');

module.exports = app => {
    
    controller = new AtendimentoController();
        
    app.get(AtendimentoController.rotas().home, controller.home());

    app.route(AtendimentoController.rotas().atendimentos)
        .get(controller.listaAtendimentos())
        .post(controller.novoAtendimento());
    
    app.route(AtendimentoController.rotas().buscarPorId)
        .get(controller.buscarAtendimento())
        .patch(controller.alterarAtendimento())
        .delete(controller.removerAtendimento());

}