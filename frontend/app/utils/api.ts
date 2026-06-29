// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
const BASE_URL = 'http://localhost:8080/api/v1';

async function fetchApi<T>(endpoint: string, method: string, body?: any, token?: string, customOptions?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
        method,
        headers,
        ...customOptions,
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        let errorMessage = `Lỗi hệ thống: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            const errorText = await response.text();
            if (errorText) errorMessage = errorText;
        }
        const error = new Error(errorMessage);
        (error as any).status = response.status;
        throw error;
    }

    try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return (await response.json()) as T;
        }
        return (await response.text()) as any as T;
    } catch (e) {

        return null as any as T;
    }
}


export const doGet = <T>(endpoint: string, token?: string, options?: RequestInit) =>
    fetchApi(endpoint, 'GET', undefined, token, options);

export const doPost = <T>(endpoint: string, body: any, token?: string, options?: RequestInit) =>
    fetchApi(endpoint, 'POST', body, token, options);

export const doPut = <T>(endpoint: string, body: any, token?: string, options?: RequestInit) =>
    fetchApi(endpoint, 'PUT', body, token, options);

export const doDelete = (endpoint: string, token?: string, options?: RequestInit) =>
    fetchApi(endpoint, 'DELETE', undefined, token, options);

export const doLogin = (credentials: { email: string; password: string }) =>
    doPost('/auth/login-or-register', credentials);
