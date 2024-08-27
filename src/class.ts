 // CUSTOMER CLASS:
export class Customer {
    firstName: string
    lastName: string
    age: number
    gender: string
    cellNumber: number
    accountNumber: number

    constructor(
        firstName: string,
        lastName: string,
        age: number,
        gender: string,
        cellNumber: number,
        accountNumber: number
    ) {
        this.firstName = firstName,
            this.lastName = lastName,
            this.age = age,
            this.gender = gender,
            this.cellNumber = cellNumber,
            this.accountNumber = accountNumber
    }
}

// BANK INTERFACE
interface BankAccount {
    accountNumber: number;
    balance: number
}

// BANK CLASS
export class Bank {
    customers: Customer[] = [];
    account: BankAccount[] = [];

    // ADD CUSTOMER METHOD:
    addCustomer(obj: Customer) {
        this.customers.push(obj)
    }

    // ADD ACCOUNT METHOD:
    addAccount(obj: BankAccount) {
        this.account.push(obj)
    }
}