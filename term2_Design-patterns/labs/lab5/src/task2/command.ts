import { Flat } from "./flat";
import { PropertyAgency } from "./PropertyAgency";
import { Client } from "./client";

export interface ICommand {
    propertyAgency: PropertyAgency;
    execute();
}

export class FindFlatCommand implements ICommand {

    constructor(public propertyAgency: PropertyAgency, private client: Client) { }

    execute() {
        const flats = this.propertyAgency.flats.filter(
            f => f.price <= this.client.moneyAvailable && f.roomsCount >= this.client.requiredRoomsCount
        );

        this.propertyAgency.setFlatsForClient(this.client, flats);
    }
}

export class FindCostomerCommand implements ICommand {

    constructor(public propertyAgency: PropertyAgency, private flat: Flat) {}

    execute() {
        const clients = this.propertyAgency.clients.filter(
            c => c.moneyAvailable >= this.flat.price && c.requiredRoomsCount <= this.flat.roomsCount
        );

        this.propertyAgency.setClientsForFlat(this.flat, clients);
    }
}

export class FindFlatInOtherAgenciesCommand implements ICommand {
    constructor(public propertyAgency: PropertyAgency, private client: Client) { }

    execute() {
        const flats: Flat[] = [];
        this.propertyAgency.otherAgencies.forEach(
            ag => {
                ag.findFlatsForClient(this.client);
                flats.push(...ag.getFlatsForClient(this.client)); 
            }
        );
        this.propertyAgency.setFlatsForClient(this.client, flats);
    }
}