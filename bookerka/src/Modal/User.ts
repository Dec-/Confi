export class User {
    public firstname: string;
    public lastname: string;
    public email: string;
    public phoneNumber: string;

    constructor(firstname: string, lastname: string, email: string, phoneNumber: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}

export default User;
