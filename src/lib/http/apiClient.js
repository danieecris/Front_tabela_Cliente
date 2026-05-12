const API_URL = import.meta.env.VITE_API_URL;

export async function apiClient(path, options ={}){
    const response = await fetch(`${API_URL}${path}`,{
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    });
     
    if(!response.ok){
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao comunuicar com o servidor');
    }

    if(response.status === 204){
        return null;

    }

    return response.json();
}