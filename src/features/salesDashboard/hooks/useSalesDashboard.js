import { useEffect, useMemo, useState } from 'react';
import {
    buildFormPayload,
    filterSectionItems,
    getSectionData,
    removeItemBySection,
    upsertItemBySection,
} from '../services/salesDashboardService';
import { initialClients, initialOrders, initialProducts } from '../constants/initialData';
import { getClients } from '../api/clienteApi';
import { createClient } from '../api/clienteApi';
import { updateClient } from '../api/clienteApi';
import { deleteClient } from '../api/clienteApi';

export function useSalesDashboard() {
    const [activeSection, setActiveSection] = useState('clientes');
    const [dataSets, setDataSets] = useState({
        clientes: initialClients,
        produtos: initialProducts,
        pedidos: initialOrders,
    });
    const [isLoadingClients, setIsLoadingClients] = useState(false);
    const [clientsError, setClientsError] = useState('');
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        async function loadClients() {
            try {
                setIsLoadingClients(true);
                setClientsError('');

                const clients = await getClients();
                setDataSets((prev) => ({
                    ...prev,
                    clientes: clients,
                }));
            } catch (error) {
                setClientsError(error.message || 'Nao foi possivel carregar os clientes.');
            } finally {
                setIsLoadingClients(false);
            }
        }

        loadClients();
    }, []);

    const clients = dataSets.clientes;

    const sectionData = useMemo(
        () => getSectionData(activeSection, dataSets),
        [activeSection, dataSets]
    );

    const filteredItems = useMemo(
        () =>
            filterSectionItems({
                activeSection,
                items: sectionData.items,
                search,
                clients,
            }),
        [activeSection, sectionData.items, search, clients]
    );

    const openModal = (item = null) => {
        setEditing(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditing(null);
        setIsModalOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            await deleteClient(id);
            setDataSets((prev) => removeItemBySection({ activeSection, id, dataSets: prev }));
        }catch (error) {
            console.error('Erro ao deletar cliente:', error);
            return;
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const payload = buildFormPayload({ activeSection, formData, editing });
        try{
            let responseData;
            if (editing === null) {
                responseData = await createClient(payload);
            } else {
                responseData = await updateClient(editing.id, payload);
            }
        setDataSets((prev) =>
            upsertItemBySection({
                activeSection,
                item: responseData,
                editing,
                dataSets: prev,
            })
        );

        closeModal();
    } catch (error) {
        console.error('Erro ao criar ou editar cliente:', error)
    }
    };

    return {
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
    };
}
