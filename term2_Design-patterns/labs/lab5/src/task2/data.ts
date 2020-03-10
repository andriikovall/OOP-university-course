import { Client } from "./client";
import { Flat } from "./flat";

export const clients = [
    new Client('andrii', 5000, 2), 
    new Client('vova', 45000, 3), 
    new Client('bob', 1, 1)
];

export const flats = [
    new Flat(3, 500000, 'nowhere'), 
    new Flat(1, 13, 'somewhere'), 
    new Flat(3, 1231, 'улица пушкника, дом колотушкина'), 
    new Flat(1, 23, 'kpi'), 
    new Flat(1, 1, 'rublevka')
];