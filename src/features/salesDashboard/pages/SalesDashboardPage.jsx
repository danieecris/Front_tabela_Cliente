import DashboardHeader from '../components/DashboardHeader';
import DataTableCard from '../components/DataTableCard';
import RecordModal from '../components/RecordModal';
import Sidebar from '../components/Sidebar';
import SummaryPanel from '../components/SummaryPanel';
import { useSalesDashboard } from '../hooks/useSalesDashboard';
import { useTheme } from '../hooks/useTheme';

function SalesDashboardPage() {
  const {
    activeSection,
    setActiveSection,
    sectionData,
    filteredItems,
    search,
    setSearch,
    isModalOpen,
    editing,
    openModal,
    closeModal,
    handleDelete,
    handleSave,
    clients,
    isLoadingClients,
    clientsError,
  } = useSalesDashboard();

  const { dark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          dark={dark}
          onToggleTheme={toggleTheme}
        />

        <main className="flex-1">
          <DashboardHeader sectionData={sectionData} onCreate={() => openModal(null)} />

          <div className="mb-6 grid gap-6 md:grid-cols-[1fr_320px]">
            {activeSection === 'clientes' && isLoadingClients ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Carregando clientes...
              </div>
            ) : activeSection === 'clientes' && clientsError ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                {clientsError}
              </div>
            ) : (
              <DataTableCard
                sectionData={sectionData}
                activeSection={activeSection}
                filteredItems={filteredItems}
                search={search}
                onSearchChange={setSearch}
                onEdit={openModal}
                onDelete={handleDelete}
                clients={clients}
              />
            )}
            <SummaryPanel sectionData={sectionData} />
          </div>
        </main>
      </div>

      <RecordModal
        isOpen={isModalOpen}
        activeSection={activeSection}
        sectionData={sectionData}
        editing={editing}
        clients={clients}
        onClose={closeModal}
        onSubmit={handleSave}
      />
    </div>
  );
}

export default SalesDashboardPage;
