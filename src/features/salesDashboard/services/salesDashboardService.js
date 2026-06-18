import { sectionConfig } from '../config/sectionConfig';

function includesQuery(fields, query) {
    return fields.some((field) => String(field).toLowerCase().includes(query));
}

export function getSectionData(activeSection, dataSets) {
    const section = sectionConfig[activeSection];

    return {
        ...section,
        items: dataSets[activeSection],
    };
}

export function filterSectionItems({ activeSection, items, search, clients }) {
    const query = search.trim().toLowerCase();

    if (!query) {
        return items;
    }

    return items.filter((item) => {
        if (activeSection === 'clientes') {
            return includesQuery([item.nome, item.email, item.telefone, item.cpf], query);
        }

        if (activeSection === 'produtos') {
            return includesQuery([item.nome, item.categoria, item.preco, item.estoque], query);
        }

        const cliente = clients.find((client) => client.id === item.clienteId);
        return includesQuery([cliente?.nome ?? '', item.data, item.valorTotal], query);
    });
}

export function removeItemBySection({ activeSection, id, dataSets }) {
    return {
        ...dataSets,
        [activeSection]: dataSets[activeSection].filter((item) => item.id !== id),
    };
}

export function buildFormPayload({ activeSection, formData, editing }) {
    const id = editing?.id || Date.now();

    if (activeSection === 'clientes') {
        return {
            id,
            nome: formData.get('nome'),
            email: formData.get('email'),
            telefone: formData.get('telefone'),
            cpf: formData.get('cpf'),
        };
    }

    if (activeSection === 'produtos') {
        return {
            id,
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            preco: Number(formData.get('preco')),
            ativo: formData.get('ativo') === 'true',
        };
    }

    return {
        id,
        clienteId: Number(formData.get('clienteId')),
        data: formData.get('data'),
        valorTotal: Number(formData.get('valorTotal')),
    };
}

export function upsertItemBySection({ activeSection, item, editing, dataSets }) {
    const sectionItems = dataSets[activeSection];

    return {
        ...dataSets,
        [activeSection]: editing
            ? sectionItems.map((current) => (current.id === editing.id ? item : current))
            : [item, ...sectionItems],
    };
}
