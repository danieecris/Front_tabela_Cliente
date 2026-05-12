import { Briefcase } from 'lucide-react';

function SummaryPanel({ sectionData }) {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Resumo rapido</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Numero total de {sectionData.title.toLowerCase()} cadastrados.
        </p>
        <div className="mt-4 flex items-center justify-between rounded-3xl bg-slate-50 p-4 dark:bg-slate-700/50">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
              {sectionData.items.length}
            </p>
          </div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-300">
            <Briefcase className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Dica rapida</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Use os botoes de edicao e exclusao para gerenciar registros localmente. Todos os dados
          sao mantidos apenas em memoria.
        </p>
      </div>
    </div>
  );
}

export default SummaryPanel;
