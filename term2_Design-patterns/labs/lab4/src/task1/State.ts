import { SaleManagementService } from "./SaleManagementService";
import { Client, RegularClient, VIPClient } from "./Client";

export interface IState {
    ctx: SaleManagementService;
    configureSalePersentage();
}

export class CommonClientState implements IState {

    constructor(public ctx: SaleManagementService) { }

    configureSalePersentage() {
        const isRegularClient: boolean = dateDiffInDays(new Date(), this.ctx.currClient.registrationDate) >= 365 / 2;
        console.log('isRegularClient:', isRegularClient)
        const isVIPClient: boolean =  dateDiffInDays(new Date(), this.ctx.currClient.lastSubscriptionDate) <= 30;
        console.log('isVIPClient:', isVIPClient)
        if (isRegularClient) {
            this.ctx.setState(new RegularClietnState(this.ctx));
        }
        if (isVIPClient) {
            this.ctx.setState(new VIPClientState(this.ctx));
        }
    }
}

export class RegularClietnState implements IState {

    constructor(public ctx: SaleManagementService) { }

    configureSalePersentage() {
        this.ctx.accumulatedSalePersentage += RegularClient.salePersentage;
    }
}

export class VIPClientState implements IState {

    constructor(public ctx: SaleManagementService) { }

    configureSalePersentage() {
        this.ctx.accumulatedSalePersentage += VIPClient.salePersentage;
    }
}


function dateDiffInDays(a: Date, b: Date): number {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.abs(Math.floor((utc2 - utc1) / MS_PER_DAY));
}