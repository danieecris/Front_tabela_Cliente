export const sectionConfig = {
    clientes: {
        title: 'Clientes',
        singular: 'Cliente',
        description: 'Gerencie seus clientes: adicione, edite ou remova registros.',
        columns: ['Nome', 'Email', 'Telefone', 'CPF'],
    },
    produtos: {
        title: 'Produtos',
        singular: 'Produto',
        description: 'Cadastre produtos com preco e estoque de forma rapida.',
        columns: ['Nome', 'Descricao', 'Preco','Ativo'],
        },
    pedidos: {
        title: 'Pedidos',
        singular: 'Pedido',
        description: 'Visualize e edite pedidos com valores e datas.',
        columns: ['ID', 'Data', 'Valor Total'],
    },
};
