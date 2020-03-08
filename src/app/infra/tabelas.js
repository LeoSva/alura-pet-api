class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarTabelaAtendimentos();
    }

    criarTabelaAtendimentos() {
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos(id int NOT NULL AUTO_INCREMENT, cliente varchar(20), servico varchar(20) 
        NOT NULL, status varchar(20) NOT NULL, observacoes text, data datetime, data_criacao datetime, PRIMARY KEY(id))`;
            
        this.conexao.query(sql);
    }
}

module.exports = new Tabelas();