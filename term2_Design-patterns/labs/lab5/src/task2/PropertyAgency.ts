import { ICommand, FindFlatCommand, FindCostomerCommand } from "./command";
import { Client } from "./client";
import { Flat } from "./flat";

export class PropertyAgency {

    private _clients: Client[] = [];
    private _flats: Flat[] = [];

    private commandHistory: ICommand[] = [];

    private otherAgencies: PropertyAgency[] = [];

    private clientsSuggestedFlats: Map<Client, Flat[]> = new Map();
    private flatsSuggestedClients: Map<Flat, Client[]> = new Map();

    public setClientsSuggestedFlats(client: Client, flats: Flat[]) {
        this.clientsSuggestedFlats.set(client, flats);
    }

    public getClientSuggestedFlats(client: Client) {
        return this.clientsSuggestedFlats.get(client);
    }

    public setFlatsSuggestedClients(flat: Flat, clients: Client[]) {
        this.flatsSuggestedClients.set(flat, clients);
    }

    public getFlatsSuggestedClients(flat: Flat) {
        return this.flatsSuggestedClients.get(flat);
    }

    public get flats() {
        return this._flats;
    }

    public get clients() {
        return this._clients;
    }

    public runCommand(command: ICommand) {
        command.execute();
        this.commandHistory.push(command);
    }

    public registerClient(client: Client) {
        console.log('Registrating new client', client.name);
        this._clients.push(client);
    }

    public registerFlat(flat: Flat) {
        this._flats.push(flat);
    }

    public registerOtherAgency(agency: PropertyAgency) {
        this.otherAgencies.push(agency);
    }

    public findFlatsForClient(client: Client) {
        if (!this._clients.includes(client))
            this.registerClient(client);
        
        this.runCommand(new FindFlatCommand(this, client));
        console.log(client.name, this.getClientSuggestedFlats(client));
    }

    public findClientsForFlat(flat: Flat) {
        if (!this._flats.includes(flat))
            this.registerFlat(flat);
        
        this.runCommand(new FindCostomerCommand(this, flat));
        console.log(flat.address, this.getFlatsSuggestedClients(flat));
    }

    public searchForFlatInOtherAgencies(client: Client) {
        this.otherAgencies.forEach(a => a.findFlatsForClient(client));
    }
}