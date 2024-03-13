'use server';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

async function splitDocuments() {
    // Create a document splitter object
    const splitter = new RecursiveCharacterTextSplitter();

    // Use Cheerio to split upload and embed a document
    const loader = new TextLoader('./src/app/assets/docs/FAQS.txt');

    // Load docs using cherio
    const documents = await loader.load();

    // Split docs using doc splitter
    return splitter.splitDocuments(documents);
}

export { splitDocuments };
