import { Certificate, Diploma } from "./abstractPapers";

export class CommonCertificate extends Certificate {
    display() {
        super.display();
        console.log('Common sertificate made with cheap materials');
    }
}

export class CommonDiploma extends Diploma {
    display() {
        super.display();
        console.log('Common diploma made with cheap materials');
    }
}

export class ModernCertificate extends Certificate {
    display() {
        super.display();
        console.log('Modern sertificate made with hi-end materials');
    }
}

export class ModernDiploma extends Diploma {
    display() {
        super.display();
        console.log('Modern diploma made with hi-end materials');
    }
}