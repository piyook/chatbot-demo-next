"use server";
import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { RunTree } from "langsmith";

import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { MessagesPlaceholder } from "@langchain/core/prompts";

import { splitDocs } from "./docloader";

async function getChatBotReply(
  userQuestion: string
): Promise<string | undefined> {
  // Initiate an openAI object
  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  // Create a System Template Direction
  const systemTemplate = `You are a friendly, sympathetic, helpful ai that answers questions as descriptively as possible. 
  You do not make up answers that you dont know the answer to and are not in the context. 
  Answer ONLY questions based on only the following context: {context}`;

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

  // Create a retriever thats aware of the chat history
  const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chat_history"),
    ["ai", systemTemplate],
    ["human", "{input}"],
  ]);

  // Generate chat history aware retrival chain
  const historyAwareRetrieverChain = await createHistoryAwareRetriever({
    llm: chatModel,
    retriever,
    rephrasePrompt: historyAwarePrompt,
  });

  // Combine embedded documents
  const historyAwareCombineDocsChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt: historyAwarePrompt,
  });

  // Generate conversational retrieval chain taking into account chat history for context
  const conversationalRetrievalChain = await createRetrievalChain({
    retriever: historyAwareRetrieverChain,
    combineDocsChain: historyAwareCombineDocsChain,
  });

  // Send metrics to Langsmith
  const rt = new RunTree({
    run_type: "llm",
    name: "OpenAI Call RunTree",
    inputs: { historyAwarePrompt },
    project_name: "MyUoY Chatbot Demo",
  });

  // Invoke chain to get answer
  const result = await conversationalRetrievalChain.invoke({
    input: userQuestion,
  });

  // End and submit the run
  rt.end(result);
  await rt.postRun();

  // Return AI anwser
  return result.answer;
}

export { getChatBotReply };
