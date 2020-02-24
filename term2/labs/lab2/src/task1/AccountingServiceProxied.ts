import { Document } from './document';
import accountedDocument, { IAccouningService } from './AccountingInterface';
import { AccountingService } from './AccountingService';

export class AccountingServiceProxied implements IAccouningService {
    static accountingService = new AccountingService();
    static get documents() {
        return AccountingService.documents;
    }
    addDocument(document: Document | accountedDocument): void {
        AccountingServiceProxied.accountingService.addDocument(document);
    }
    displayDocuments(): void {
        AccountingService.documents.forEach(this.displayDocument);
    }
    displayDocument(doc: number | accountedDocument): void {
        const document: accountedDocument = typeof doc === 'number' ? AccountingService.documents.filter(d => d.id !== doc)[0] || null : doc;
        if (document.isPaid) {
            AccountingServiceProxied.accountingService.displayDocument(doc);
        } else {
            const msg: string = `Document with id ${document.id} is not payed. Make the payment to get additional info`;
            console.log('--');
            console.log(msg);
            console.log('--');
        }
    } 
    payForDocument(id: number): void {
        AccountingServiceProxied.accountingService.payForDocument(id);
    }

}