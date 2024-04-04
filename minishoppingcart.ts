import * as readline from 'readline';

interface Product{
    id: number,
    Product: string,
    Price: number
    Quantity: number
}

const products: Product[] = [
    {id: 1, Product: "IQOO smartphone", Price: 20000, Quantity: 4},
    {id: 2, Product: "Apple Vision", Price: 100000, Quantity: 5},
    {id: 3, Product: "Bolt earbuds", Price: 1500, Quantity: 6},
    {id: 4, Product: "Sony LED TV", Price: 250000, Quantity: 5},
    {id: 5, Product: "Lenovo Laptop", Price: 47000, Quantity:4}
];

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayProducts(){
    console.log("Available Products:");
    products.forEach(product => {
        console.log(`ID: ${product.id}, Product Name: ${product.Product}, Price: Rs.${product.Price}, Quantity: ${product.Quantity}`);
    });
}

function buyProduct(ProductID: number, quantity: number){
    const product = products.find(p => p.id === ProductID);
    if(product){
        if(product.Quantity >= quantity){
            console.log(`You bought ${quantity} ${product.Product}(s) for the price of Rs.${product.Price * quantity}`);
            product.Quantity -= quantity;
        }else{
            console.log("Insufficient products available!");
        }
    }else{
        console.log("Products not found!");
    }
}

function mainmenu(){
    console.log("\nMini Shopping cart!");
    console.log("1. Display Products");
    console.log("2. Buy Products");
    console.log("3. Exit");

    r1.question('Enter your choice: ',(choice) => {
        switch (choice) {
            case '1':
                displayProducts();
                mainmenu();
                break;
            case '2':
                buyProductmenu();
                break;
            case '3':
                console.log("\nExiting...");
                r1.close();
                return;
            default:
                console.log("Invalid choice! Please enter a correct choice.");
                mainmenu();
        }
    })
}

function buyProductmenu(){
r1.question('Enter the Product ID to buy: ', (proidinput) => {
    const ProductID = parseInt(proidinput);
    r1.question('Enter the quantity of the product to buy: ',(proquantity) => {
        const quantity = parseInt(proquantity);
        buyProduct(ProductID,quantity);
        displayProducts();
        mainmenu();
    });
});
}

mainmenu();

