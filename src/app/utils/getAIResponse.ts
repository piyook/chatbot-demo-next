"use server";
import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

import { splitDocs } from "./docloader";

async function getChatBotReply(
  userQuestion: string
): Promise<string | undefined> {
  // Create a System Template Direction
  const systemTemplate =
    "You are a helpful assistant that responds to questions in a friendly and expressive manner. You dont make up answers if you dont know them";

  // Create the Chat Prompt
  const humanTemplate = "";

  // Create embeddings object
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const myContext = await splitDocs();

  // Create in-memory vector store to store vectorised embeddings
  const vectorstore = await MemoryVectorStore.fromDocuments(
    myContext,
    embeddings
  );

  // Create an embedding retriever
  const retriever = vectorstore.asRetriever();

  // initiate an openAI object
  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  // Create a prompt
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "ai",
      `You are a friendly, helpful ai that answers questions as descriptively as possible. 
      You dont make up answers that you dont know the answer to. 
      Answer ONLY questions based on only the following context: {context}`,
    ],
    ["human", "{input}"],
  ]);

  const documentChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt,
  });

  // Create a chain using the document embeddings
  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  // Invoke chain to get answer
  const result = await retrievalChain.invoke({
    input: userQuestion,
  });

  return result.answer;
}

export { getChatBotReply };
