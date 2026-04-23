# Front Tabela Cliente

Aplicação front-end de painel administrativo para gestão de vendas, criada com React, Vite e Tailwind CSS. O projeto foca em UI/UX e estado local, sem conexão com APIs ou backend.

## Funcionalidades

- Dashboard com sidebar de navegação
- CRUD local para Clientes, Produtos e Pedidos
- Listagem em tabela com botões de Editar e Excluir
- Modais/formulários para criação e edição
- Busca simples para filtrar resultados
- Dados mock em memória usando `useState`
- Layout responsivo com design profissional em tons de cinza e azul
- Ícones usando `lucide-react`

## Estrutura

- `src/App.jsx` — componente principal com dashboard, navegação e CRUD
- `src/main.jsx` — entrada do React
- `src/index.css` — estilos globais e configuração Tailwind
- `vite.config.js` — configuração do Vite
- `tailwind.config.js` — configuração do Tailwind CSS
- `postcss.config.js` — configuração do PostCSS

## Como rodar

1. Navegue até a pasta do projeto:
   ```bash
   cd /d b:\Front_tabelaCliente
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra o endereço exibido no terminal para visualizar a interface.

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a versão de produção
- `npm run preview` — pré-visualiza o build de produção localmente

## Tecnologias

| Tecnologia | Versão | Descrição |
|---|---|---|
| React | 18.3 | Biblioteca para construção de interfaces |
| Vite | 5.4 | Bundler e dev server ultrarrápido |
| Tailwind CSS | 3.4 | Framework CSS utility-first |
| Lucide React | 0.542 | Biblioteca de ícones SVG |
| PostCSS | 8.4 | Processador de CSS |

## Campos das Entidades

### Cliente
| Campo | Tipo |
|---|---|
| `nome` | texto |
| `email` | email |
| `telefone` | texto |
| `cpf` | texto |

### Produto
| Campo | Tipo |
|---|---|
| `nome` | texto |
| `categoria` | texto |
| `preco` | número |
| `estoque` | número |

### Pedido
| Campo | Tipo |
|---|---|
| `clienteId` | referência ao cliente |
| `data` | data |
| `valorTotal` | número |

## Como contribuir

1. Faça um fork do repositório
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "feat: minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Observações

- O projeto usa apenas dados estáticos em memória.
- Não há chamadas de `fetch` ou `axios`.
- Ideal para testar o fluxo de cadastro e visualização de dados antes de conectar o backend.
