import React, { useEffect, useRef, useState } from "react";

function BotBox({
  botAnswer,
}: {
  readonly botAnswer: string;
}): React.JSX.Element {
  const botAnswerRef = useRef<HTMLDivElement>(null);

  const [letters, setLetters] = useState<string>("");

  useEffect(() => {
    if (botAnswerRef.current) {
      botAnswerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [botAnswer]);

  useEffect(() => {
    const letterArray = botAnswer.split("");
    let newLetterArray: string[] = [];

    for (const [index, letter] of letterArray.entries()) {
      setTimeout(() => {
        newLetterArray = [...newLetterArray, letter];
        setLetters(newLetterArray.join(""));
      }, index * 30);
    }
  }, [botAnswer]);

  return (
    <p ref={botAnswerRef} className="BotBox bg-light mb-5">
      {letters}
    </p>
  );
}

export default BotBox;
