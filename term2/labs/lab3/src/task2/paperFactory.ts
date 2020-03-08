import { Student } from './student';
import { Diploma, Certificate } from './abstractPapers';
import { ModernDiploma, ModernCertificate, CommonDiploma, CommonCertificate } from './concretePapers';

export interface IPaperFactory {
    // readonly price: number;
    // readonly colours: number;
    createDiploma(student: Student, eventName: string, place: number): Diploma;
    createCertificate(student: Student, eventName: string): Certificate;
}

export const modernFactorySpecs = { price: 150, colours: 16581375 };
export const oldFactorySpecs = { price: 50, colours: 165814 };

export class ModernPaperFactory implements IPaperFactory {

    // public price = modernFactorySpecs.price;
    // public colours = modernFactorySpecs.colours;

    constructor(){}

    createDiploma(student: Student, eventName: string, place: number): Diploma {
        console.log('Creating diploma with best materials and colours!');
        const diploma = new ModernDiploma(student, eventName, place);
        return diploma;
    }
    createCertificate(student: Student, eventName: string): Certificate {
        console.log('Creating certificate with best materials and colours!');
        const certificate = new ModernCertificate(student, eventName);
        return certificate;
    }
}

export class OldPaperFactory implements IPaperFactory {
    
    
    // public price = oldFactorySpecs.price;
    // public colours = oldFactorySpecs.colours;

    constructor(){}

    createDiploma(student: Student, eventName: string, place: number): Diploma {
        console.log('Creating diploma with in usuall factory');
        const diploma = new CommonDiploma(student, eventName, place);
        return diploma;
    }
    createCertificate(student: Student, eventName: string): Certificate {
        console.log('Creating certificate in usuall factory');
        const certificate = new CommonCertificate(student, eventName);
        return certificate;
    }
}