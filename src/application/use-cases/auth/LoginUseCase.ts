import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { User } from '../../../domain/entities/User';

export class LoginUseCase {
    constructor(private authRepository: IAuthRepository) {}

    async execute(email: string, password: string): Promise<User> {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        return await this.authRepository.login(email, password);
    }
} 