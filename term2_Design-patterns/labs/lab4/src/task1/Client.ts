export class Client {
    constructor(public fName: string, 
                public lName: string, 
                public lastSubscriptionDate: Date, 
                public registrationDate: Date){}
    
    static salePersentage: number = 0;
}

export class RegularClient extends Client {
    static salePersentage: number = 5;
}

export class VIPClient extends Client {
    static salePersentage: number = 10;
}