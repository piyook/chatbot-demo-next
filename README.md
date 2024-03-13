# Chatbot Demo using RAG

## Next.JS, Lanchain and OpenAI

### About

The project uses Langchain to build prompt chains and interact with OpenAI using Retrieval Augmented Generation (RAG). Context is imported by splitting a context document, vectorising and embedding in a local store for use with RAG user queries.
LangSmith can also be used to log calls to OpenAI and the project name is set in the .env.local file under the PROJECT_NAME node process environment variable.

### Set-up

Clone the project and install dependencies.

Copy **.env.local.example** into a newly created **.env.local** file and insert your API Keys from OPENAI and LangChain (if you want to use LangSmith to track your calls to the OpenAI API).

This is a demo project only and while OpenAI will be contacted using server components (so API keys wont be exposed in browser based client-side components), production code would need greater secrets protection such as injecting keys using Github Actions and Github secrets or for cloud deployments using secret managers such as AWS secrets manager.

### Using

The assets/docs/FAQ.txt provides context information for requests to OPENAI - this can be modified to add any context you wish the chatbot to be knowlegable about. The AI System prompt specifies that the answers will be limited to only those within the context.

Start the project using

```bash
npm run dev
```

The project will be available on http://localhost:3000 in your browser.

Questions can be input in any language and the response will match the language.
