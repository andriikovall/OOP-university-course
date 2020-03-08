import { Student } from './student';

export interface Paper {
    student: Student;
    display(): void;
    eventName: string;
}



function getQuality(coloursUsed: number) {
    const coloursForGoodQuality: number = 1658137;
    return coloursUsed >= coloursForGoodQuality ? 'Good' : 'Ordinary';
}

export abstract class Certificate implements Paper {

    constructor(public student: Student, 
                public eventName: string){}
    // todo display quality
    display() {
        const certificate = [
            '-----------------------------', 
            `Certificate from ${this.eventName}`, 
            `for ${this.student.fName} ${this.student.lName}`, 
            `from ${this.student.school} - ${this.student.group}`, 
            `-----------------------------`
        ].join('\n');
        console.log(certificate);
    }

}

export abstract class Diploma implements Paper {

    constructor(public student: Student, 
                public eventName: string,
                public place: number){}

    display() {
        const diploma = [
            '-----------------------------', 
            `Diploma`, 
            `For ${this.student.fName} ${this.student.lName}`, 
            `From ${this.student.school} - ${this.student.group}`, 
            `For getting ${Diploma.getStringForPlace(this.place)} place`,
            `In ${this.eventName}`, 
            `-----------------------------`
        ].join('\n');
        console.log(diploma);
    }

    private static getStringForPlace(place: number): string {
        switch (place) {
            case 1: return '1-st';
            case 2: return '2-nd';
            case 3: return '3-rd';
            default: return `${place}-th`
        }
    }
}

