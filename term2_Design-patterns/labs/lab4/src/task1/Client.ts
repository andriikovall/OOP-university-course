export class Client {
    constructor(public fName: string, 
                public lName: string, 
                public lastSubscriptionDate: Date, 
                public registrationDate: Date){}
    
    static salePersentage: number = 0;

    public payForTraining(price: number) {
        console.log('Common client pays 100% of the price -', price);
    }
}

export class RegularClient extends Client {

    static salePersentage: number = 5;
    public payForTraining(price: number) {
        const newPrice = price * (100 - RegularClient.salePersentage) / 100;
        console.log('Regular client pays 95% of the price');
        console.log(`${newPrice} instead of ${price}`);
    }
}

export class VIPClient extends Client {

    static salePersentage: number = 10;
    public payForTraining(price: number) {
        const newPrice = price * (100 - VIPClient.salePersentage) / 100;
        console.log('VIP client pays 90% of the price');
        console.log(`${newPrice} instead of ${price} and get our VIP towels in shower`);
    }
}