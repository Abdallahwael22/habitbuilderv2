import Person from '../../../domain/entities/Person';

class RegisterUserUseCase {
    constructor(personRepository) {
        this.personRepository = personRepository;
    }

    async execute(username, name, email, password) {
        const person = new Person(username, name, email, password);
        person.validate();
        
        return await this.personRepository.create(person);
    }
}

export default RegisterUserUseCase; 