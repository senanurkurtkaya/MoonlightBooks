const API_URL = 'http://localhost:5000/api';

interface FetchOptions extends RequestInit {
    token?: string;
}

async function fetchApi(endpoint: string, options: FetchOptions = {}) {
    const { token, ...fetchOptions } = options;
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
        credentials: 'include'
    });

    if (response.status === 401) {
        // Token süresi dolmuş veya geçersiz
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Unauthorized');
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Bir hata oluştu');
    }

    return response.json();
}

export const api = {
    get: (endpoint: string, options?: FetchOptions) => 
        fetchApi(endpoint, { ...options, method: 'GET' }),

    post: (endpoint: string, data: any, options?: FetchOptions) =>
        fetchApi(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        }),

    put: (endpoint: string, data: any, options?: FetchOptions) =>
        fetchApi(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        }),

    delete: (endpoint: string, options?: FetchOptions) =>
        fetchApi(endpoint, { ...options, method: 'DELETE' })
};

export default api; 