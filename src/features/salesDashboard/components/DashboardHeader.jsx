import { Plus } from 'lucide-react';

function DashboardHeader({ sectionData, onCreate }) {
  return (
    <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Dashboard</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{sectionData.title}</h2>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">{sectionData.description}</p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" />
          Novo {sectionData.singular}
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
