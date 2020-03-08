import { IPaperFactory, ModernPaperFactory, OldPaperFactory } from "./paperFactory";
import { Student } from "./student";

const modern: IPaperFactory = new ModernPaperFactory();
const old: IPaperFactory = new OldPaperFactory();

const student = new Student('andrii', 'koval', 'kpi', 'kp83');

const modernDiploma = modern.createDiploma(student, 'int20h', 1);
const oldDiploma = old.createDiploma(student, 'int20h', 4);

const modernCert = modern.createCertificate(student, 'int20h');
const oldCert = old.createCertificate(student, 'int20h');


modernDiploma.display();
oldDiploma.display();

modernCert.display();
oldCert.display();