"use client";
import React, { useState, useRef, useEffect } from "react";
import "bootswatch/dist/solar/bootstrap.min.css";
import LoadSpinner from "./components/load-spinner";
import { uniquishId } from "./utils/utils";
import ChatPage from "./views/chat-page";
import { getChatBotReply } from "./utils/getAIResponse";

type ChatData = Array<{
  id: string | undefined;
  question: string | undefined;
  answer: string | undefined;
}>;

function App(): React.JSX.Element {
  const [chatItems, setChatItems] = useState<ChatData>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputData = useRef<HTMLInputElement>(null);

  const submitHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Screen out empty values or any key press that is not 'enter'
    if (
      event.key !== "Enter" ||
      inputData.current === null ||
      inputData.current.value === ""
    )
      return;

    // Set up return data and set loading spinner until OAI response is obtained
    const userQuestion = inputData.current.value;

    setIsLoading(true);

    const OaiAnswer = await getChatBotReply(inputData.current.value);
    // Reset input to empty
    inputData.current.value = "";

    setIsLoading(false);

    // Add new question and answers to array in state to trigger re-render
    setChatItems((current) => {
      return [
        ...current,
        {
          id: uniquishId(),
          question: userQuestion,
          answer: `${OaiAnswer}`,
        },
      ];
    });
  };

  return (
    <>
      {isLoading && <LoadSpinner />}
      <ChatPage chatItems={chatItems} />
      <input
        ref={inputData}
        className="UserInput text-dark fw-bold"
        type="text"
        placeholder=">"
        onKeyUp={submitHandler}
      />
    </>
  );
}

export default App;
