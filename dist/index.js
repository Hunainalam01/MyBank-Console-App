#!/usr/bin/env node
import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";
import { Bank, Customer } from "./class.js";
console.log(chalk.green.bold(`WELCOME TO CLI BASE BANKING SYSTEM\n`));
let myBank = new Bank();
// CREATE CUSTOMERS
for (let i = 1; i <= 5; i++) {
    let fName = faker.person.firstName();
    let lName = faker.person.lastName();
    let cellNum = parseInt("3" + faker.string.numeric(9));
    const customers = new Customer(fName, lName, 18, "male", cellNum, 5000 + i);
    myBank.addCustomer(customers);
    myBank.addAccount({ accountNumber: customers.accountNumber, balance: 500 * i });
}
// BANK FACILITIES:
async function bankServices(bank) {
    do {
        const serviceOption = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.yellow.italic(`Please select the kind of service you want!\n`),
            choices: ["View Balance", "Cash Withdrawal", "Cash Deposit", "Transaction", "Exit"]
        });
        // VIEW BALANCE:
        if (serviceOption.select == "View Balance") {
            const response = await inquirer.prompt({
                name: "accNum",
                type: "input",
                message: "Enter Your Account number:"
            });
            let responseAccount = myBank.account.find((acc) => acc.accountNumber == response.accNum);
            if (!responseAccount) {
                console.log(chalk.red.bold.italic(`PLEASE ENTER A VALID ACCOUNT NUMBER!`));
            }
            if (responseAccount) {
                let name = myBank.customers.find((item) => item.accountNumber == responseAccount?.accountNumber);
                console.log(`
            \nDEAR ${chalk.yellow.italic.bold(name?.firstName)} ${chalk.yellow.italic.bold(name?.lastName)}
            Your Current Account Balance is 
            ${chalk.green.bold(`${responseAccount.balance} PKR`)}\n
            `);
            }
        }
        // CASH WITHDRAWAL:
        else if (serviceOption.select == "Cash Withdrawal") {
            const response = await inquirer.prompt({
                name: "accNum",
                type: "input",
                message: "Enter Your Account Number:"
            });
            let responseAccount = myBank.account.find((acc) => acc.accountNumber == response.accNum);
            if (!responseAccount) {
                console.log(chalk.red.bold.italic(`PLEASE ENTER A VALID ACCOUNT NUMBER!`));
            }
            else if (responseAccount) {
                const answer = await inquirer.prompt({
                    name: "pkr",
                    type: "number",
                    message: "Enter Your Amount"
                });
                // create new balance after withdraw the amount:
                let newBalance = responseAccount.balance - answer.pkr;
                if (answer.pkr > responseAccount.balance) {
                    console.log(chalk.red.bold(`\nYou Have An Insufficient Balance:`));
                    // create prompt to check the balance
                    const balAnswer = await inquirer.prompt({
                        name: "currentBal",
                        type: "list",
                        message: "\n Please Select The Given option!",
                        choices: ["Check Balance", "Exit"]
                    });
                    // OPTION 01
                    if (balAnswer.currentBal == "Check Balance") {
                        console.log(`
                        \nDEAR ${chalk.yellow.italic.bold(Customer.name)}
                        Your Current Account Balance is 
                        ${chalk.green.bold(`${responseAccount.balance} PKR`)}\n
                        `);
                    }
                    // OPTION 02
                    if (balAnswer.currentBal == "Exit") {
                        console.log(chalk.bold.red(`Exiting...`));
                        process.exit();
                    }
                }
                else {
                    responseAccount.balance = newBalance;
                    console.log(chalk.green.bold(`CASH WITHDRAWN SUCCESSFULLY! Your new balance is ${newBalance}`));
                }
            }
        }
        // CASH DEPOSIT:
        else if (serviceOption.select == "Cash Deposit") {
            const response = await inquirer.prompt({
                name: "accNum",
                type: "input",
                message: "Enter Your Account Number:"
            });
            let responseAccount = myBank.account.find((acc) => acc.accountNumber == response.accNum);
            if (!responseAccount) {
                console.log(chalk.red.bold.italic(`PLEASE ENTER A VALID ACCOUNT NUMBER!`));
            }
            // ASKING USER TO ENTER ACC NUMBER:
            else if (responseAccount) {
                const answer = await inquirer.prompt({
                    name: "pkr",
                    type: "number",
                    message: "Enter Your Amount"
                });
                let newBalance = responseAccount.balance + answer.pkr;
                console.log(chalk.green.bold(`CASH DEPOSITED SUCCESSFULLY! Your new balance is ${newBalance}`));
            }
        }
        // TRANSACTION:
        else if (serviceOption.select == "Transaction") {
            const senderResponse = await inquirer.prompt({
                name: "senderAccNum",
                type: "input",
                message: "Enter Sender's Account Number:"
            });
            let senderAccount = myBank.account.find((acc) => acc.accountNumber == (senderResponse.senderAccNum));
            if (!senderAccount) {
                console.log(chalk.red.bold.italic(`PLEASE ENTER A VALID SENDER'S ACCOUNT NUMBER!`));
                return;
            }
            const receiverResponse = await inquirer.prompt({
                name: "receiverAccNum",
                type: "input",
                message: "Enter Receiver's Account Number:"
            });
            let receiverAccount = myBank.account.find((acc) => acc.accountNumber == (receiverResponse.receiverAccNum));
            if (!receiverAccount) {
                console.log(chalk.red.bold.italic(`PLEASE ENTER A VALID RECEIVER'S ACCOUNT NUMBER!`));
                return;
            }
            const amountResponse = await inquirer.prompt({
                name: "amount",
                type: "number",
                message: "Enter Amount to Transfer:"
            });
            if (amountResponse.amount > senderAccount.balance) {
                console.log(chalk.red.bold(`INSUFFICIENT FUNDS!`));
            }
            else {
                senderAccount.balance -= amountResponse.amount;
                receiverAccount.balance += amountResponse.amount;
                console.log(chalk.green.bold(`TRANSACTION COMPLETED SUCCESSFULLY!`));
            }
        }
        // EXIT:
        else if (serviceOption.select == "Exit") {
            console.log(chalk.red.bold(`Exiting the program...`));
            process.exit();
        }
    } while (true);
}
bankServices(myBank);
