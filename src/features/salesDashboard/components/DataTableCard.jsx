import { Edit3, Search, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

function DataTableCard({
  sectionData,
  activeSection,
  filteredItems,
  search,
  onSearchChange,
  onEdit,
  onDelete,
  clients,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Lista de {sectionData.title.toLowerCase()}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Use a busca para filtrar o resultado rapidamente.
          </p>
        </div>
        <div className="relative w-full sm:w-[320px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-700">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-700/50 dark:text-slate-400">
            <tr>
              {sectionData.columns.map((column) => (
                <th key={column} className="px-4 py-3 font-semibold uppercase tracking-[0.12em]">
                  {column}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold uppercase tracking-[0.12em]">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-800">
            {filteredItems.length === 0 ? (
              <tr>
                <td
                  colSpan={sectionData.columns.length + 1}
                  className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  Nenhum resultado encontrado.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const isClient = activeSection === 'clientes';
                const isProduct = activeSection === 'produtos';
                const clientName = clients.find((client) => client.id === item.clienteId)?.id || '-';

                return (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-4 text-slate-900 dark:text-white">
                      {isClient ? item.nome : isProduct ? item.nome : clientName}
                    </td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-400">
                      {isClient ? item.email : isProduct ? item.descricao : item.data}
                    </td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-400">
                      {isClient
                        ? item.telefone
                        : isProduct
                          ? formatCurrency(item.preco)
                          : formatCurrency(item.valorTotal)}
                    </td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-400">
                      {isClient ? item.cpf : isProduct ? item.ativo ? 'Sim': 'Nao': '-'}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:text-brand-400"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(item.id)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-red-300 hover:text-red-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTableCard;
