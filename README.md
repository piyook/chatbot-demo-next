# A Subject Specialised Chatbot

### LLM Retrieval Augmented Generation using LangChain and OpenAI in NextJS/React

![chatbot-demo-1](https://github.com/piyook/chatbot-demo-next/assets/51154763/de157268-8426-493e-af14-f1ba67c1159c)

### About

This is a simple demo project using LangChain, ChatGPT and NextJS to create a specialised Chatbot. In a real app, the chatbot would be located in a movable/collapsible/scrollable chat window with an improved UI.

The project also uses the mock LLM server running in docker for making rapid development changes without incurring costs in chatGPT and ability to work offline- see later.

The project uses LangChain to build prompt chains and interact with OpenAI using Retrieval Augmented Generation (RAG). Context is imported by splitting a **_reference document_** containing information on a subject the chatbot should know about, and vectorising and embedding this in a local store for use with RAG user queries. Chat history is enabled to allow follow up questions.

LangSmith can also be used to log calls to OpenAI with the appropriate API keys. The project name can be set in the .env.local file using the PROJECT_NAME node process environment variable.

### Set-up

Clone the project and install dependencies.

Copy **.env.local.example** into a newly created **.env.local** file placed in the same project root folder. Insert your API Keys obtained from your OPENAI account and LangChain API Keys fromyour LangChain account (if you want to use LangSmith to track your calls to the OpenAI API).

This is a demo project only and while OpenAI will be contacted using React server actions (so API keys wont be exposed in browser based client-side components), production code would need better secrets protection (such as injecting keys using Github Secrets and Actions or for cloud deployments using secret managers such as AWS Secrets Manager).

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

### Mock Development Server

The project can use our mock LLM server - see https://github.com/piyook/llm-mock

To use the server, clone the Mock LLM Project above, follow the README and start the docker container with the desired settings.

In THIS project, modify the .env.local file and add the environment variables below assuming the mock LLM default port is used.

```bash
DEV_MODE=true
DEV_BASE_URL=http://localhost:8001/chatgpt
```

By setting the DEV_MODE to true, ALL chatGPT requests will be sent to the mock LLM server which will return either random length LOREM IPSUM or STORED responses depending on the settings in the LLM Mock. These responses will be sent whatever the input to the LLM and will not use openAI for either requests or embeddings (embeddings requests are also mocked out when the DEV_MODE is on) and so wont incur costs (or need an openAI account or even an internet connection).
LangSmith is also bypassed when using DEV_MODE but LLM requests can be viewed at the LLM Mock Logs endpoint (see README)

Set DEV_MODE back to false to use OpenAI ChatGPT endpoints as normal.
