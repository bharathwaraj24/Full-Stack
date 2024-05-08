import * as readline from 'readline';

class CurrencyConverter {
  private exchangeRateUSDToEUR: number;
  private exchangeRateUSDtoINR: number;
  
  constructor(exchangeRateUSDToEUR: number, exchangeRateUSDtoINR: number) {
    this.exchangeRateUSDToEUR = exchangeRateUSDToEUR;
    this.exchangeRateUSDtoINR = exchangeRateUSDtoINR;
  }

  usdToEur(usdAmount: number): number {
    return usdAmount * this.exchangeRateUSDToEUR;
  }

  eurToUsd(eurAmount: number): number {
    return eurAmount / this.exchangeRateUSDToEUR;
  }

  usdToInr(usdAmount: number): number {
    return usdAmount * this.exchangeRateUSDtoINR;
  }

  inrToUsd(inrAmount: number): number {
    return inrAmount / this.exchangeRateUSDtoINR;
  }

  eurToInr(eurAmount: number): number {
    const usdAmount = this.eurToUsd(eurAmount);
    return this.usdToInr(usdAmount);
  }

  inrToEur(inrAmount: number): number {
    const usdAmount = this.inrToUsd(inrAmount);
    return this.usdToEur(usdAmount);
  }
}

// Example usage
const exchangeRateUSDToEUR = 0.82; // 1 USD = 0.82 EUR
const exchangeRateUSDtoINR = 73.15; // 1 USD = 73.15 INR
const converter = new CurrencyConverter(exchangeRateUSDToEUR, exchangeRateUSDtoINR);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("1. USD to EUR");
console.log("2. EUR to USD");
console.log("3. USD to INR");
console.log("4. INR to USD");
console.log("5. EUR to INR");
console.log("6. INR to EUR");

rl.question("Enter your choice: ", (choice) => {
  let amount: number;
  let result: number;

  switch (parseInt(choice)) {
    case 1:
      rl.question("Enter USD amount: ", (usdAmount) => {
        amount = parseFloat(usdAmount);
        result = converter.usdToEur(amount);
        console.log(`${amount} USD = ${result.toFixed(2)} EUR`);
        rl.close();
      });
      break;
    case 2:
      rl.question("Enter EUR amount: ", (eurAmount) => {
        amount = parseFloat(eurAmount);
        result = converter.eurToUsd(amount);
        console.log(`${amount} EUR = ${result.toFixed(2)} USD`);
        rl.close();
      });
      break;
    case 3:
      rl.question("Enter USD amount: ", (usdAmount) => {
        amount = parseFloat(usdAmount);
        result = converter.usdToInr(amount);
        console.log(`${amount} USD = ${result.toFixed(2)} INR`);
        rl.close();
      });
      break;
    case 4:
      rl.question("Enter INR amount: ", (inrAmount) => {
        amount = parseFloat(inrAmount);
        result = converter.inrToUsd(amount);
        console.log(`${amount} INR = ${result.toFixed(2)} USD`);
        rl.close();
      });
      break;
    case 5:
      rl.question("Enter EUR amount: ", (eurAmount) => {
        amount = parseFloat(eurAmount);
        result = converter.eurToInr(amount);
        console.log(`${amount} EUR = ${result.toFixed(2)} INR`);
        rl.close();
      });
      break;
    case 6:
      rl.question("Enter INR amount: ", (inrAmount) => {
        amount = parseFloat(inrAmount);
        result = converter.inrToEur(amount);
        console.log(`${amount} INR = ${result.toFixed(2)} EUR`);
        rl.close();
      });
      break;
    default:
      console.log("Invalid choice");
      rl.close();
  }
});
