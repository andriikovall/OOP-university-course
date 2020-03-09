import { Document } from './document';

type accountedDocument = { id: number, item: Document, isPaid: boolean };

export default accountedDocument;

export interface IAccouningService {
    addDocument(document: Document | accountedDocument): void;
    displayDocuments(): void;
    displayDocument(doc: number | accountedDocument): void;
    payForDocument(id: number): void;
}