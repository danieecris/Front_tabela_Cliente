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
import { getOrders } from '../api/orderApi';
import { getOrderById } from '../api/orderApi';
import { createOrder } from '../api/orderApi';
import { updateOrder } from '../api/orderApi';
import { deleteOrder } from '../api/orderApi';
import { getProduct } from '../api/productApi';
import { getProductById } from '../api/productApi';
import { createProduct } from '../api/productApi';
import { updateProduct } from '../api/productApi';
import { deleteProduct } from '../api/productApi';



export function useSalesDashboard() {
    const [activeSection, setActiveSection] = useState('clientes');
    const [dataSets, setDataSets] = useState({
        clientes: initialClients,
        produtos: initialProducts,
        pedidos: initialOrders,
    });
    const [isLoadingClients, setIsLoadingClients] = useState(false);
    const [clientsError, setClientsError] = useState('');
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [ordersError, setOrdersError] = useState('');
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [productsError, setProductsError] = useState('');
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);


    //Carrega os clientes do servidor quando o componente é montado
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


    useEffect(() => {
        async function loadOrders() {
            try {
                setIsLoadingOrders(true);
                setOrdersError('');

                const orders = await getOrders();
                setDataSets((prev) => ({
                    ...prev,
                    pedidos: orders,
                }));
            } catch (error) {
                setOrdersError(error.message || 'Nao foi possivel carregar os pedidos.');
            } finally {
                setIsLoadingOrders(false);
            }
        }

        loadOrders();
    }, []);

    useEffect(()=>{
        async function loadProducts(){

            try {
            setIsLoadingProducts(true);
            setProductsError('');
            
            const products = await getProducts();
            setDataSets((prev) => ({
                ...prev,
                produtos: products,
            }));
        } 
        catch (error) {            
            setProductsError(error.message || 'Nao foi possivel carregar os produtos.');
        } 
        finally {            
            setIsLoadingProducts(false);
            }
        }
      loadProducts();  
    }, [])

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


    //HandleDelete é responsável por deletar um cliente, e atualizar o estado local para refletir a mudança
    const handleDelete = async (id) => {
        try {
            if (activeSection === 'clientes') {
            await deleteClient(id);
            }else if (activeSection === 'pedidos'){
                await deleteOrder(id)
            }else if (activeSection ==='produtos'){
                await deleteProduct(id)
            }

            setDataSets((prev) => removeItemBySection({ activeSection, id, dataSets: prev }));
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            return;
        }
    };

    //HandleSave é responsável por criar ou editar um cliente, dependendo se 
    // estamos editando um item existente ou criando um novo
    const handleSave = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const payload = buildFormPayload({ activeSection, formData, editing });
        try {
            let responseData;
            if (activeSection === 'clientes') {
                if (editing === null) {
                    responseData = await createClient(payload);
                } else {
                    responseData = await updateClient(editing.id, payload);
                }
            } else if (activeSection === 'pedidos') {
                if (editing === null) {
                    responseData = await createOrder(payload)
                } else {
                    responseData = await updateOrder(editing.id, payload)
                }
            } else if (activeSection === 'produtos') {
                if (editing === null){
                    responseData =await createProduct(payload) 
                }else{
                    responseData = await updateProduct(editing.id, payload)
                }
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
            console.error('Erro ao criar ou editar:', error)
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
        isLoadingOrders,
        ordersError,
        isLoadingProducts,
        productsError,
    };
}
