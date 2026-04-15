'use server';
import fs from 'fs/promises';
import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

async function splitDocuments() {
    // Create a document splitter object
    const splitter = new RecursiveCharacterTextSplitter();

    // load text from file and create a document object
    const text = await fs.readFile('./src/app/assets/docs/FAQS.txt', 'utf-8');
    const documents = [new Document({ pageContent: text })];

    // Split docs using doc splitter
    return splitter.splitDocuments(documents);
}

export { splitDocuments };
