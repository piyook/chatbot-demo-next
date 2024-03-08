"use server";
import OpenAI from "openai";

async function getChatBotReply(
  userQuestion: string
): Promise<string | undefined> {
  const openai = new OpenAI({
    apiKey: (process.env.OPENAI_API_KEY as string) ?? "please_provide_key",
    dangerouslyAllowBrowser: true,
  });
  // Prepare prompt
  const parameters: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: "user", content: userQuestion }],
    model: "gpt-3.5-turbo",
  };

  // Get OAI response with user supplied prompt and await response
  const completion: OpenAI.Chat.ChatCompletion | undefined =
    await openai.chat.completions.create(parameters).catch((error) => {
      if (error instanceof OpenAI.APIError) {
        console.log(error.status);
        console.log(error.message);
        return undefined;
      }

      throw new Error("Sorry - there was an error. Please Try again later.");
    });

  // Set OAI response and unset loading spinner
  return completion?.choices[0].message.content ?? "error";
}

export { getChatBotReply };
