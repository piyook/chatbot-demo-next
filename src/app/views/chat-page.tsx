import React from "react";
import { Stack } from "react-bootstrap";
import UserBox from "../components/user-box";
import BotResponse from "../components/bot-response";
import IntroBox from "../components/intro-box";

type ChatPageProps = {
  readonly chatItems: Array<{
    id: string | undefined;
    question: string | undefined;
    answer: string | undefined;
  }>;
};

function ChatPage({ chatItems }: ChatPageProps): React.JSX.Element {
  return (
    <Stack className="ChatPage mt-5">
      <IntroBox />
      {chatItems.map((item) => {
        if (item.question === undefined || item.answer === undefined) return;

        return (
          <div key={item.id} className="ChatPage__responseSection">
            <UserBox userQuestion={item.question} />
            <BotResponse botAnswer={item.answer} />
          </div>
        );
      })}
    </Stack>
  );
}

export default ChatPage;
