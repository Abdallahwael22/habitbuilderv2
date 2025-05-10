import IPersonRepository from '../../domain/repositories/IPersonRepository';
import Person from '../../domain/entities/Person';
import { Person as PersonModel } from '../database/models/Person';

class SequelizePersonRepository extends IPersonRepository {
    async create(person) {
        const personModel = await PersonModel.create({
            username: person.username,
            name: person.name,
            email: person.email,
            password: person.password
        });
        return new Person(
            personModel.username,
            personModel.name,
            personModel.email,
            personModel.password
        );
    }

    async findByEmail(email) {
        const personModel = await PersonModel.findOne({ where: { email } });
        if (!personModel) return null;
        
        return new Person(
            personModel.username,
            personModel.name,
            personModel.email,
            personModel.password
        );
    }

    async findByUsername(username) {
        const personModel = await PersonModel.findByPk(username);
        if (!personModel) return null;
        
        return new Person(
            personModel.username,
            personModel.name,
            personModel.email,
            personModel.password
        );
    }

    async updatePassword(username, newPassword) {
        const personModel = await PersonModel.findByPk(username);
        if (!personModel) return false;
        
        await personModel.update({ password: newPassword });
        return true;
    }
}

export default SequelizePersonRepository; 