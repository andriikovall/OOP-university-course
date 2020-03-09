import { Document } from './document';

import accountedDocument, { IAccouningService } from './AccountingInterface';


export class AccountingService implements IAccouningService {
    public static documents: accountedDocument[] = []; 
    static nextId: number = 0;   
    
    addDocument(document: Document | accountedDocument) {
        if (document instanceof Document) {
            const doc: accountedDocument = { id: ++AccountingService.nextId, item: document as Document, isPaid: false };
            AccountingService.documents.push(doc);
        } else {
            AccountingService.documents.push(document as accountedDocument);
        }
    }

    payForDocument(id: number): void {
        for (const doc of AccountingService.documents) {
            if (doc.id === id) {
                doc.isPaid = true;
                return;
            }
        }
        throw new Error('Document with id '+ id + ' not found');
    }

    displayDocuments() {
        console.log('All documents');
        AccountingService.documents.forEach(this.displayDocument);
        console.log('All documents');
    }

    displayDocument(doc: number | accountedDocument) {
        console.log('--');
        const document: accountedDocument = typeof doc === 'number' ? AccountingService.documents.filter(d => d.id !== doc)[0] || null : doc; 
        if (document == null) {
            console.log(`Document not found`);
            return;
        }
        console.log(`Name: ${document.item.name},\nType ${document.item.type}\nPrice: ${document.item.price}\nInfo: ${document.item.info}`);
        console.log('--');
    } 
}
