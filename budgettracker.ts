import * as readlineSync from 'readline-sync';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

class BudgetTracker {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  addTransaction(description: string, amount: number, type: 'income' | 'expense'): void {
    const id = this.transactions.length + 1;
    const transaction: Transaction = { id, description, amount, type };
    this.transactions.push(transaction);
  }

  getTotalIncome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  getTransactionHistory(): Transaction[] {
    return this.transactions;
  }

  generateSpendingInsights(): string {
    const totalExpenses = this.getTotalExpenses();
    const totalIncome = this.getTotalIncome();
    const balance = this.getBalance();

    const percentageOfIncome = (totalExpenses / totalIncome) * 100;

    if (totalExpenses > totalIncome) {
      return `You have exceeded your income by ${Math.abs(balance)}.
      You spent ${percentageOfIncome.toFixed(2)}% of your income.`;
    } else {
      return `You have ${balance} remaining.
      You spent ${percentageOfIncome.toFixed(2)}% of your income.`;
    }
  }
}

// Example usage
const tracker = new BudgetTracker();

function getUserInput(prompt: string): string {
  return readlineSync.question(prompt);
}

function getUserNumberInput(prompt: string): number {
  return parseFloat(readlineSync.question(prompt));
}

function main() {
  while (true) {
    console.log('\n1. Add Income');
    console.log('2. Add Expense');
    console.log('3. View Transaction History');
    console.log('4. View Balance and Spending Insights');
    console.log('5. Exit');

    const choice = getUserInput('\nEnter your choice: ');

    switch (choice) {
      case '1':
        const incomeDescription = getUserInput('Enter income description: ');
        const incomeAmount = getUserNumberInput('Enter income amount: ');
        tracker.addTransaction(incomeDescription, incomeAmount, 'income');
        break;
      case '2':
        const expenseDescription = getUserInput('Enter expense description: ');
        const expenseAmount = getUserNumberInput('Enter expense amount: ');
        tracker.addTransaction(expenseDescription, expenseAmount, 'expense');
        break;
      case '3':
        console.log('\nTransaction History:');
        console.log(tracker.getTransactionHistory());
        break;
      case '4':
        console.log('\nBalance and Spending Insights:');
        console.log(tracker.generateSpendingInsights());
        break;
      case '5':
        console.log('\nExiting...');
        return;
      default:
        console.log('Invalid choice. Please try again.');
    }
  }
}

main();
