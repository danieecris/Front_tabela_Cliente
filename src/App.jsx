import { useEffect, useMemo, useState } from 'react';
import {
  Briefcase,
  Box,
  Moon,
  ShoppingCart,
  Sun,
  Users,
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
} from 'lucide-react';

const initialClients = [
  { id: 1, nome: 'Ana Souza', email: 'ana.souza@email.com', telefone: '(11) 98765-4321', cpf: '123.456.789-00' },
  { id: 2, nome: 'Carlos Lima', email: 'carlos.lima@email.com', telefone: '(21) 91234-5678', cpf: '987.654.321-11' },
];

const initialProducts = [
  { id: 1, nome: 'Notebook Pro', categoria: 'Eletrônicos', preco: 4999.9, estoque: 12 },
  { id: 2, nome: 'Mouse Wireless', categoria: 'Acessórios', preco: 149.9, estoque: 48 },
];

const initialOrders = [
  { id: 1, clienteId: 1, data: '2026-04-01', valorTotal: 5499.8 },
  { id: 2, clienteId: 2, data: '2026-04-05', valorTotal: 149.9 },
];

const sections = [
  { key: 'clientes', label: 'Clientes', icon: Users },
  { key: 'produtos', label: 'Produtos', icon: Box },
  { key: 'pedidos', label: 'Pedidos', icon: ShoppingCart },
];

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [activeSection, setActiveSection] = useState('clientes');
  const [clients, setClients] = useState(initialClients);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const sectionData = useMemo(() => {
    if (activeSection === 'clientes') {
      return {
        title: 'Clientes',
        description: 'Gerencie seus clientes: adicione, edite ou remova registros.',
        items: clients,
        columns: ['Nome', 'Email', 'Telefone', 'CPF'],
      };
    }
    if (activeSection === 'produtos') {
      return {
        title: 'Produtos',
        description: 'Cadastre produtos com preço e estoque de forma rápida.',
        items: products,
        columns: ['Nome', 'Categoria', 'Preço', 'Estoque'],
      };
    }
    return {
      title: 'Pedidos',
      description: 'Visualize e edite pedidos com valores e datas.',
      items: orders,
      columns: ['Cliente', 'Data', 'Valor Total'],
    };
  }, [activeSection, clients, products, orders]);

  const filteredItems = useMemo(() => {
    const query = search.toLowerCase();
    if (!query) return sectionData.items;
    return sectionData.items.filter((item) => {
      if (activeSection === 'clientes') {
        return [item.nome, item.email, item.telefone, item.cpf].some((field) => field.toLowerCase().includes(query));
      }
      if (activeSection === 'produtos') {
        return [item.nome, item.categoria, item.preco.toString(), item.estoque.toString()].some((field) => field.toLowerCase().includes(query));
      }
      const cliente = clients.find((client) => client.id === item.clienteId);
      return [cliente?.nome || '', item.data, item.valorTotal.toString()].some((field) => field.toLowerCase().includes(query));
    });
  }, [search, sectionData.items, activeSection, clients]);

  const openModal = (item = null) => {
    setEditing(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditing(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (activeSection === 'clientes') setClients((prev) => prev.filter((item) => item.id !== id));
    if (activeSection === 'produtos') setProducts((prev) => prev.filter((item) => item.id !== id));
    if (activeSection === 'pedidos') setOrders((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    if (activeSection === 'clientes') {
      const data = {
        id: editing?.id || Date.now(),
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        cpf: formData.get('cpf'),
      };
      setClients((prev) => {
        if (editing) return prev.map((item) => (item.id === editing.id ? data : item));
        return [data, ...prev];
      });
    }
    if (activeSection === 'produtos') {
      const data = {
        id: editing?.id || Date.now(),
        nome: formData.get('nome'),
        categoria: formData.get('categoria'),
        preco: Number(formData.get('preco')), 
        estoque: Number(formData.get('estoque')),
      };
      setProducts((prev) => {
        if (editing) return prev.map((item) => (item.id === editing.id ? data : item));
        return [data, ...prev];
      });
    }
    if (activeSection === 'pedidos') {
      const data = {
        id: editing?.id || Date.now(),
        clienteId: Number(formData.get('clienteId')),
        data: formData.get('data'),
        valorTotal: Number(formData.get('valorTotal')),
      };
      setOrders((prev) => {
        if (editing) return prev.map((item) => (item.id === editing.id ? data : item));
        return [data, ...prev];
      });
    }
    closeModal();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="w-full max-w-[280px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
                <Briefcase className="h-6 w-6" />
              </div>
              <button
                type="button"
                onClick={() => setDark((prev) => !prev)}
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-400"
                title={dark ? 'Modo claro' : 'Modo escuro'}
              >
                {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Gestão de Vendas</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Painel administrativo para cadastro rápido de clientes, produtos e pedidos.</p>
          </div>
          <div className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/20' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Dashboard</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{sectionData.title}</h2>
                <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">{sectionData.description}</p>
              </div>
              <button
                type="button"
                onClick={() => openModal(null)}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                <Plus className="h-4 w-4" />
                Novo {sectionData.title.slice(0, -1)}
              </button>
            </div>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-[1fr_320px]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Lista de {sectionData.title.toLowerCase()}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Use a busca para filtrar o resultado rapidamente.</p>
                </div>
                <div className="relative w-full sm:w-[320px]">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
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
                      <th className="px-4 py-3 font-semibold uppercase tracking-[0.12em]">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-800">
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={sectionData.columns.length + 1} className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                          Nenhum resultado encontrado.
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item) => {
                        const isClient = activeSection === 'clientes';
                        const isProduct = activeSection === 'produtos';
                        const clientName = clients.find((client) => client.id === item.clienteId)?.nome || '-';
                        return (
                          <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <td className="px-4 py-4 text-slate-900 dark:text-white">{isClient ? item.nome : isProduct ? item.nome : clientName}</td>
                            <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{isClient ? item.email : isProduct ? item.categoria : item.data}</td>
                            <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{isClient ? item.telefone : isProduct ? formatCurrency(item.preco) : formatCurrency(item.valorTotal)}</td>
                            <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{isClient ? item.cpf : isProduct ? item.estoque : '-'}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => openModal(item)}
                                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:text-brand-400"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item.id)}
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

            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Resumo rápido</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Número total de {sectionData.title.toLowerCase()} cadastrados.</p>
                <div className="mt-4 flex items-center justify-between rounded-3xl bg-slate-50 p-4 dark:bg-slate-700/50">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
                    <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">{sectionData.items.length}</p>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-300">
                    <Briefcase className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Dica rápida</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Use os botões de edição e exclusão para gerenciar registros localmente. Todos os dados são mantidos apenas em memória.</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-950/20 dark:bg-slate-800">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-600 dark:text-brand-400">{editing ? 'Editar registro' : 'Novo registro'}</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{sectionData.title.slice(0, -1)}</h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-5">
              {activeSection === 'clientes' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    Nome
                    <input name="nome" defaultValue={editing?.nome || ''} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    Email
                    <input name="email" type="email" defaultValue={editing?.email || ''} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    Telefone
                    <input name="telefone" defaultValue={editing?.telefone || ''} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    CPF
                    <input name="cpf" defaultValue={editing?.cpf || ''} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                  </label>
                </div>
              )}
              {activeSection === 'produtos' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    Nome
                    <input name="nome" defaultValue={editing?.nome || ''} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    Categoria
                    <input name="categoria" defaultValue={editing?.categoria || ''} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    Preço
                    <input name="preco" type="number" step="0.01" defaultValue={editing?.preco || ''} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    Estoque
                    <input name="estoque" type="number" defaultValue={editing?.estoque || ''} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                  </label>
                </div>
              )}
              {activeSection === 'pedidos' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    Cliente
                    <select name="clienteId" defaultValue={editing?.clienteId || clients[0]?.id} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white">
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>{client.nome}</option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    Data
                    <input name="data" type="date" defaultValue={editing?.data || ''} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300 sm:col-span-2">
                    Valor Total
                    <input name="valorTotal" type="number" step="0.01" defaultValue={editing?.valorTotal || ''} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                  </label>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={closeModal} className="inline-flex justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                  Cancelar
                </button>
                <button type="submit" className="inline-flex justify-center rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
