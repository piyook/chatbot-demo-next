# Chatbot Demo using Retrieval Augmented Generation

## Next.JS, LangChain and OpenAI

![chatbot-demo-1](https://github.com/piyook/chatbot-demo-next/assets/51154763/de157268-8426-493e-af14-f1ba67c1159c)

### About

The project uses LangChain to build prompt chains and interact with OpenAI using Retrieval Augmented Generation (RAG). Context is imported by splitting a context document, vectorising and embedding in a local store for use with RAG user queries.
LangSmith can also be used to log calls to OpenAI with the appropriate API keys. The project name can be set in the .env.local file using the PROJECT_NAME node process environment variable.

### Set-up

Clone the project and install dependencies.

Copy **.env.local.example** into a newly created **.env.local** file and insert your API Keys obtained from your OPENAI account and LangChain API Keys fromyour LangChain account (if you want to use LangSmith to track your calls to the OpenAI API).

This is a demo project only and while OpenAI will be contacted using server components (so API keys wont be exposed in browser based client-side components), production code would need better secrets protection (such as injecting keys using Github Secrets and Actions or for cloud deployments using secret managers such as AWS Secrets Manager).

### Using

https://github.com/piyook/chatbot-demo-next/assets/51154763/90e970c5-83e5-4e16-a5f4-282c311fe866

The assets/docs/FAQ.txt provides contextual information for requests to OpenAI - this can be modified to add any context you wish the chatbot to be knowlegable about. The AI System prompt specifies that the answers will be limited to only those within the context. For the purposes of the demo a limited amount of fictional information is provided.

Start the project using

```bash
npm run dev
```

The project will be available on http://localhost:3000 in your browser.

Questions can be input in any language and the response will match the language.

Bot response typing speed can be set in the .env.local using the NEXT_PUBLIC_TYPING_SPEED_MS variable with character typing delay in ms - the default value is 30ms.

To tear down and rebuild project run

```bash
npm run nuke
```
