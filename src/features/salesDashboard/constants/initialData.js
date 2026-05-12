export const initialClients = [
    { id: 1, nome: 'Ana Souza', email: 'ana.souza@email.com', telefone: '(11) 98765-4321', cpf: '123.456.789-00' },
    { id: 2, nome: 'Carlos Lima', email: 'carlos.lima@email.com', telefone: '(21) 91234-5678', cpf: '987.654.321-11' },
];

export const initialProducts = [
    { id: 1, nome: 'Notebook Pro', categoria: 'Eletronicos', preco: 4999.9, estoque: 12 },
    { id: 2, nome: 'Mouse Wireless', categoria: 'Acessorios', preco: 149.9, estoque: 48 },
];

export const initialOrders = [
    { id: 1, clienteId: 1, data: '2026-04-01', valorTotal: 5499.8 },
    { id: 2, clienteId: 2, data: '2026-04-05', valorTotal: 149.9 },
];
