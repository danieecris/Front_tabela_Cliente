import { X } from 'lucide-react';

function RecordModal({ isOpen, activeSection, sectionData, editing, clients, onClose, onSubmit }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-950/20 dark:bg-slate-800">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-brand-600 dark:text-brand-400">
              {editing ? 'Editar registro' : 'Novo registro'}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {sectionData.singular}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {activeSection === 'clientes' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                Nome
                <input
                  name="nome"
                  defaultValue={editing?.nome || ''}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                Email
                <input
                  name="email"
                  type="email"
                  defaultValue={editing?.email || ''}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                Telefone
                <input
                  name="telefone"
                  defaultValue={editing?.telefone || ''}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                CPF
                <input
                  name="cpf"
                  defaultValue={editing?.cpf || ''}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </label>
            </div>
          )}

          {activeSection === 'produtos' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                Nome
                <input
                  name="nome"
                  defaultValue={editing?.nome || ''}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                Categoria
                <input
                  name="categoria"
                  defaultValue={editing?.categoria || ''}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                Preco
                <input
                  name="preco"
                  type="number"
                  step="0.01"
                  defaultValue={editing?.preco || ''}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                Estoque
                <input
                  name="estoque"
                  type="number"
                  defaultValue={editing?.estoque || ''}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </label>
            </div>
          )}

          {activeSection === 'pedidos' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                Cliente
                <select
                  name="clienteId"
                  defaultValue={editing?.clienteId || clients[0]?.id}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                >
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                Data
                <input
                  name="data"
                  type="date"
                  defaultValue={editing?.data || ''}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300 sm:col-span-2">
                Valor Total
                <input
                  name="valorTotal"
                  type="number"
                  step="0.01"
                  defaultValue={editing?.valorTotal || ''}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </label>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecordModal;
