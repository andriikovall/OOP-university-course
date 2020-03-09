import { IState, CommonClientState } from "./State";
import { Client } from "./Client";

export class SaleManagementService {
    private state: IState;   
    public accumulatedSalePersentage: number = 0;
    public currClient: Client;

    constructor() {
        this.state = new CommonClientState(this);
    }

    public setState(state: IState) {
        this.state = state;
        this.state.configureSalePersentage();
    }

    public getPayement(client: Client, price: number) {
        this.currClient = client;
        this.state.configureSalePersentage();
        const persentage = this.accumulatedSalePersentage;
        this.accumulatedSalePersentage = 0;
        this.state = new CommonClientState(this);
        return price * (100 - persentage) / 100;
    }
}