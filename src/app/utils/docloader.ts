"use server";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

async function splitDocs() {
  // Create a document splitter object
  const splitter = new RecursiveCharacterTextSplitter();

  // Use Cheerio to split upload and embed a document
  const loader = new TextLoader("./src/app/assets/docs/FAQS.txt");

  // load docs using cherio
  const docs = await loader.load();

  // split docs using doc splitter
  return await splitter.splitDocuments(docs);
}

export { splitDocs };
