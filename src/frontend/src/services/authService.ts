import { api } from './api';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    username: string;
    roles: string[];
}

class AuthService {
    async login(data: LoginRequest): Promise<AuthResponse> {
        try {
            const response = await api.post('/account/login', data);
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify({
                    username: response.username,
                    roles: response.roles
                }));
            }
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(data: RegisterRequest): Promise<AuthResponse> {
        try {
            const response = await api.post('/account/register', data);
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify({
                    username: response.username,
                    roles: response.roles
                }));
            }
            return response;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getCurrentUser(): { username: string; roles: string[] } | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    hasRole(role: string): boolean {
        const user = this.getCurrentUser();
        return user?.roles.includes(role) ?? false;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}

export default new AuthService(); 