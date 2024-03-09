import React, { useEffect, useRef, useState } from "react";

function BotBox({
  botAnswer,
}: {
  readonly botAnswer: string;
}): React.JSX.Element {
  const botAnswerRef = useRef<HTMLDivElement>(null);

  const [letters, setLetters] = useState<string>("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (botAnswerRef.current) {
      botAnswerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [botAnswer, typing]);

  useEffect(() => {
    const letterArray = botAnswer.split("");
    let newLetterArray: string[] = [];
    setTyping(true);
    for (const [index, letter] of letterArray.entries()) {
      setTimeout(() => {
        newLetterArray = [...newLetterArray, letter];
        setLetters(newLetterArray.join(""));
        if (index === letterArray.length) {
          // reset typing when completed so that box may be scrolled into view
          setTyping(false);
        }
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
