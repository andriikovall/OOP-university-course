import { IPaperFactory, ModernPaperFactory, OldPaperFactory, modernFactorySpecs, oldFactorySpecs } from "./paperFactory";
import { Student } from "./student";

import argParser from 'minimist';

const args = argParser(process.argv.slice(2));

function getFactoryFromSpecs(moneyAvailable: number, coloursNeeded: number): IPaperFactory {
    
    const factorySpecs = [modernFactorySpecs, oldFactorySpecs]
        .find( ({ colours, price }) => colours <= coloursNeeded && price <= moneyAvailable);
    if (!factorySpecs)
        return null;

    switch (factorySpecs) {
        case oldFactorySpecs: return new OldPaperFactory();
        case modernFactorySpecs: return new ModernPaperFactory();
    }

    return null;
}

(function main() {
    const moneyAvailable = args.m || args.money;
    const coloursNeeded  = args.c || args.colours;
    const factory = getFactoryFromSpecs(moneyAvailable, coloursNeeded);
    
    if (!factory) {
        console.log('Sorry, no factory matches your possiblitities');
        return;
    }

    const student = new Student('andrii', 'koval', 'kpi', 'kp83');

    const diploma = factory.createDiploma(student, 'int20h', 2);
    const certificate = factory.createCertificate(student, 'math olymp');

    diploma.display();
    certificate.display();
})();
