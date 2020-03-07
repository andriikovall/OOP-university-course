import { Student } from './student';
import { Diploma, Certificate } from './papers';

export interface IPaperFactory {
    price: number;
    colours: number;
    createDiploma(student: Student, eventName: string, place: number): Diploma;
    createCertificate(student: Student, eventName: string): Certificate;
}

export class ModernPaperFactory implements IPaperFactory {

    public price = 150;
    public colours = 16581375;

    constructor(){}

    createDiploma(student: Student, eventName: string, place: number): Diploma {
        console.log('Creating diploma with best materials and colours!');
        const diploma = new Diploma(student, this.colours, eventName, place);
        return diploma;
    }
    createCertificate(student: Student, eventName: string): Certificate {
        console.log('Creating certificate with best materials and colours!');
        const certificate = new Certificate(student, this.colours, eventName);
        return certificate;
    }
}

export class OldPaperFactory implements IPaperFactory {
    public price = 50;
    public colours = 165814;

    constructor(){}

    createDiploma(student: Student, eventName: string, place: number): Diploma {
        console.log('Creating diploma with in usuall factory');
        const diploma = new Diploma(student, this.colours, eventName, place);
        return diploma;
    }
    createCertificate(student: Student, eventName: string): Certificate {
        console.log('Creating certificate in usuall factory');
        const certificate = new Certificate(student, this.colours, eventName);
        return certificate;
    }
}