import { Briefcase, Moon, Sun } from 'lucide-react';
import { sections } from '../constants/sections';

function Sidebar({ activeSection, setActiveSection, dark, onToggleTheme }) {
  return (
    <aside className="w-full max-w-[280px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
            <Briefcase className="h-6 w-6" />
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-400"
            title={dark ? 'Modo claro' : 'Modo escuro'}
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Gestao de Vendas</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Painel administrativo para cadastro rapido de clientes, produtos e pedidos.
        </p>
      </div>

      <div className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const active = activeSection === section.key;

          return (
            <button
              key={section.key}
              type="button"
              onClick={() => setActiveSection(section.key)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                active
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/20'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
