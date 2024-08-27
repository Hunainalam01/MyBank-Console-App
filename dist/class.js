// CUSTOMER CLASS:
export class Customer {
    firstName;
    lastName;
    age;
    gender;
    cellNumber;
    accountNumber;
    constructor(firstName, lastName, age, gender, cellNumber, accountNumber) {
        this.firstName = firstName,
            this.lastName = lastName,
            this.age = age,
            this.gender = gender,
            this.cellNumber = cellNumber,
            this.accountNumber = accountNumber;
    }
}
// BANK CLASS
export class Bank {
    customers = [];
    account = [];
    // ADD CUSTOMER METHOD:
    addCustomer(obj) {
        this.customers.push(obj);
    }
    // ADD ACCOUNT METHOD:
    addAccount(obj) {
        this.account.push(obj);
    }
}
