import { Student } from './student';

export interface Paper {
    student: Student;
    display(): void;
    coloursUsed: number;
    eventName: string;
}

export class Certificate implements Paper {

    constructor(public student: Student, 
                public coloursUsed: number, 
                public eventName: string){}

    // todo display quality
    display() {
        console.log('Certificate of', this.student, 'from', this.student.school, this.student.group, 'for', this.eventName);
    }

}

export class Diploma implements Paper {

    constructor(public student: Student, 
                public coloursUsed: number, 
                public eventName: string,
                public place: number){}

    display() {
        console.log('Diploma of', this.student, 'from', this.student.school, this.student.group, 'place', this.place, this.eventName);
    }
}