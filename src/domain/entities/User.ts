export interface User {
    username: string;
    name: string;
    email: string;
}

export class UserEntity implements User {
    constructor(
        public username: string,
        public name: string,
        public email: string
    ) {}

    static fromJSON(json: any): UserEntity {
        return new UserEntity(
            json.username,
            json.name,
            json.email
        );
    }
} 