'use server';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from '@langchain/core/prompts';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { RunTree } from 'langsmith';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { FakeEmbeddings } from 'langchain/embeddings/fake';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { splitDocuments } from './docloader';
import { CustomChatMessageHistory } from './chat-history';
import { sanitiseInput } from './utils';
import { serverSchema } from './env-schema';

type chatBotProperties = {
    userQuestion: string;
    history: Array<{
        id: string | undefined;
        question: string | undefined;
        answer: string | undefined;
    }>;
};

async function getChatBotReply({
    userQuestion,
    history,
}: chatBotProperties): Promise<string | undefined> {
    const _serverEnv = serverSchema.parse(process.env);
    let rt = null;
    // Initiate an openAI object using local mock environment if dev mode is set to true
    const chatModel = new ChatOpenAI({
        openAIApiKey: _serverEnv.OPENAI_API_KEY,
        modelName: 'gpt-4o-mini',
        temperature: 1,
        n: 1,
        configuration:
            _serverEnv.DEV_MODE === 'true'
                ? {
                      baseURL: _serverEnv.DEV_BASE_URL,
                  }
                : {},
    });

    // Set up in-memory history and populate with previous questions and answers since we are running in a browser we cant persist
    const chat_store = new CustomChatMessageHistory({ sessionId: 'test' });

    for (const item of history) {
        try {
            await chat_store.addMessages([
                new HumanMessage(sanitiseInput(item.question)),
                new AIMessage(item.answer ?? ''),
            ]);
        } catch {
            throw new Error('Error building history');
        }
    }

    // Retrieve chat history
    const chat_history = await chat_store.getMessages();

    // Create a System Template Direction
    const systemTemplate = `You are a friendly, sympathetic, helpful ai that answers questions as descriptively as possible. 
    You do not make up answers that you dont know the answer to. You do not answer questions outside of the provided context.
    Only answer questions based on only the following context: {context}`;

    // Create embeddings object and use a fake one if dev mode is set to true to prevent cost of using OpenAI

    let embeddings;

    if (_serverEnv.DEV_MODE === 'true') {
        embeddings = new FakeEmbeddings();
        console.log(
            `WARNING: DEV MODE IS ON. Using fake embeddings and localhost mock server on ${_serverEnv.DEV_BASE_URL}`,
        );
    } else {
        embeddings = new OpenAIEmbeddings({
            openAIApiKey: _serverEnv.OPENAI_API_KEY,
        });
    }

    const myContext = await splitDocuments();

    // Create in-memory vector store to store vectorised embeddings
    const vectorstore = await MemoryVectorStore.fromDocuments(
        myContext,
        embeddings,
    );

    // Create an embedding retriever
    const retriever = vectorstore.asRetriever();

    // Create a retriever thats aware of the chat history
    const historyAwarePrompt = ChatPromptTemplate.fromMessages([
        new MessagesPlaceholder('chat_history'),
        ['ai', systemTemplate],
        ['human', '{input}'],
    ]);

    // Generate chat history aware retrival chain
    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
        llm: chatModel,
        retriever,
        rephrasePrompt: historyAwarePrompt,
    });

    // Combine embedded documents
    const historyAwareCombineDocumentsChain = await createStuffDocumentsChain({
        llm: chatModel,
        prompt: historyAwarePrompt,
    });

    // Generate conversational retrieval chain taking into account chat history for context
    const conversationalRetrievalChain = await createRetrievalChain({
        retriever: historyAwareRetrieverChain,
        combineDocsChain: historyAwareCombineDocumentsChain,
    });

    // Invoke chain to get answer supplying input, context and chat history
    const result = await conversationalRetrievalChain.invoke({
        input: sanitiseInput(userQuestion),
        chat_history,
        context: myContext,
    });

    // Submit metrics to LangSmith

    if (!(_serverEnv.DEV_MODE === 'true')) {
        console.log('Sending metrics to Langsmith');
        rt = new RunTree({
            run_type: 'llm',
            name: 'OpenAI Call RunTree',
            inputs: { historyAwarePrompt },
            project_name: _serverEnv.PROJECT_NAME ?? 'demo',
        });

        try {
            await rt.end(result);
            await rt.postRun();
        } catch {
            console.log(
                'Error logging to LangSmith API - check you have a valid LANGCHAIN_API_KEY value in your .env.local file',
            );
        }
    }

    // Return AI anwser
    return result.answer;
}

export { getChatBotReply };
