import { PropertyAgency } from "./PropertyAgency";
import { Client } from "./client";
import { Flat } from "./flat";

const clients = [
    new Client('andrii', 5000, 2), 
    new Client('vova', 45000, 3), 
    new Client('bob', 1, 1)
];



const flats = [
    new Flat(3, 500000, 'nowhere'), 
    new Flat(1, 13, 'somewhere'), 
    new Flat(3, 1231, 'улица пушкника, дом колотушкина'), 
    new Flat(1, 23, 'kpi'), 
    new Flat(1, 1, 'rublevka')
];


const agency1 = new PropertyAgency();
const agency2 = new PropertyAgency();


clients.forEach(c => agency1.registerClient(c));

flats.slice(0, 3)   .forEach(f => agency1.registerFlat(f));
flats.slice(2).forEach(f => agency2.registerFlat(f));

agency1.registerOtherAgency(agency2);

agency1.findFlatsForClient(clients[0]);
agency1.findFlatsForClient(clients[2]);

agency1.searchForFlatInOtherAgencies(clients[0])
agency1.searchForFlatInOtherAgencies(clients[2])

agency1.findClientsForFlat(flats[0]);