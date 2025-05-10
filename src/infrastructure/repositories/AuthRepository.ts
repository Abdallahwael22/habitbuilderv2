import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User, UserEntity } from '../../domain/entities/User';

export class AuthRepository implements IAuthRepository {
    private readonly API_URL = 'http://localhost:3000';

    async login(email: string, password: string): Promise<User> {
        const response = await fetch(`${this.API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return UserEntity.fromJSON(data.user);
    }

    async register(username: string, name: string, email: string, password: string): Promise<User> {
        const response = await fetch(`${this.API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, name, email, password }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        return UserEntity.fromJSON(data.user);
    }

    async logout(): Promise<void> {
        // Implement logout logic (e.g., clear local storage)
        localStorage.removeItem('user');
    }

    async getCurrentUser(): Promise<User | null> {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        
        return UserEntity.fromJSON(JSON.parse(userStr));
    }
} 