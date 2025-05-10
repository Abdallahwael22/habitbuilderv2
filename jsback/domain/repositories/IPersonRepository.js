class IPersonRepository {
    async create(person) {
        throw new Error('Method not implemented');
    }

    async findByEmail(email) {
        throw new Error('Method not implemented');
    }

    async findByUsername(username) {
        throw new Error('Method not implemented');
    }

    async updatePassword(username, newPassword) {
        throw new Error('Method not implemented');
    }
}

export default IPersonRepository; 