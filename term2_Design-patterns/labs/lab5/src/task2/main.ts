import { PropertyAgency } from "./PropertyAgency";
import { flats, clients } from './data';

const agency1 = new PropertyAgency();
const agency2 = new PropertyAgency();


clients.forEach(c => agency1.registerClient(c));

flats.slice(0, 2)   .forEach(f => agency1.registerFlat(f));
flats.slice(2).forEach(f => agency2.registerFlat(f));

agency1.registerOtherAgency(agency2);

agency1.findFlatsForClient(clients[0]);
agency1.findFlatsForClient(clients[2]);

agency1.searchForFlatInOtherAgencies(clients[0])
agency1.searchForFlatInOtherAgencies(clients[2])

flats.forEach(f => agency1.findClientsForFlat(f));
flats.forEach(f => agency2.findClientsForFlat(f));

// agency1.logCommandHistory();