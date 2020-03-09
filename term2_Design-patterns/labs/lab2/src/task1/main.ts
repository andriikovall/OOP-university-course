import { Document } from './document';
import { AccountingServiceProxied } from './AccountingServiceProxied'; 

const docs = [
    new Document('readme', 123, 'txt', 'A readme for the best project ever'), 
    new Document('Infografics', 0, 'xlsx', 'An infographics for previous accountong year'), 
    new Document('Marks', 0, 'sqlite', 'A db for marks'),
    new Document('Visitors', 50, 'xls', 'A list of visitors for the upcomming event'),
];

const accountingServiceProxied = new AccountingServiceProxied();

docs.forEach(accountingServiceProxied.addDocument);

accountingServiceProxied.displayDocuments();
AccountingServiceProxied.documents.slice(2).forEach(d => accountingServiceProxied.payForDocument(d.id));
console.log('---------------------------------------------------------------------\n');
accountingServiceProxied.displayDocuments();

