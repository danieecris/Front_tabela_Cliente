# AGENTS

## Projeto em 30 segundos
- Stack: React 18 + Vite 5 + Tailwind CSS 3.
- Dominio principal: dashboard de clientes, produtos e pedidos.
- Arquitetura por feature: tudo da tela principal fica em `src/features/salesDashboard`.

## Comandos essenciais
- `npm install` para instalar dependencias.
- `npm run dev` para ambiente local.
- `npm run build` para validar build de producao.
- `npm run preview` para revisar bundle final.

## Mapa de arquitetura
- Entrada: `src/main.jsx` e `src/App.jsx`.
- Pagina principal: `src/features/salesDashboard/pages/SalesDashboardPage.jsx`.
- Estado e fluxo: `src/features/salesDashboard/hooks/useSalesDashboard.js`.
- Regras de negocio puras: `src/features/salesDashboard/services/salesDashboardService.js`.
- Configuracao de secoes: `src/features/salesDashboard/config/sectionConfig.js`.
- UI reutilizavel: `src/features/salesDashboard/components`.
- API HTTP: `src/features/salesDashboard/api/clienteApi.js` e `src/lib/http/apiClient.js`.

## Convencoes para agentes
- Preserve a separacao: componente renderiza, hook orquestra estado, service transforma dados.
- Reutilize funcoes em `services` para filtros, payloads e upsert; evite duplicar regra em componente.
- Ao adicionar campo novo em entidade, atualize de forma consistente:
  1. `constants/initialData.js`
  2. `config/sectionConfig.js`
  3. `services/salesDashboardService.js`
  4. componentes de tabela/modal
- Use mensagens de erro claras em portugues e mantenha padrao textual existente.
- Mantenha classes Tailwind legiveis e sem reformatacao desnecessaria.

## Pontos de atencao
- `README.md` diz que nao ha API, mas o codigo atual busca clientes via `getClients()`.
- A variavel `VITE_API_URL` e necessaria para chamadas em `apiClient`.
- Nem toda pasta listada no README pode existir como descrita; confirme antes de referenciar.

## Como ajudar em modo didatico
- Quando o usuario pedir ensino, priorize explicacao progressiva, exemplos pequenos e justificativa de cada escolha.
- Para estudos guiados, use o agente especializado em `.github/agents/professor-frontend.agent.md`.
- Referencia de onboarding do projeto: [README.md](README.md).
