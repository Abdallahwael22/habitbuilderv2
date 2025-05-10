class Person {
    constructor(username, name, email, password) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    validate() {
        if (!this.username || !this.name || !this.email || !this.password) {
            throw new Error('Missing required fields');
        }
        return true;
    }
}

export default Person; 