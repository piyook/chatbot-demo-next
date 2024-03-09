import React, { useEffect, useRef, useState } from "react";

function BotBox({
  botAnswer,
}: {
  readonly botAnswer: string;
}): React.JSX.Element {
  const botAnswerRef = useRef<HTMLDivElement>(null);

  const [letters, setLetters] = useState<string>("");
  const [typing, setTyping] = useState(0);

  useEffect(() => {
    if (botAnswerRef.current) {
      botAnswerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [botAnswer, typing]);

  useEffect(() => {
    const letterArray = botAnswer.split("");
    let newLetterArray: string[] = [];

    for (const [index, letter] of letterArray.entries()) {
      setTimeout(() => {
        newLetterArray = [...newLetterArray, letter];
        setLetters(newLetterArray.join(""));
        // scroll the box up periodically
        if (index % 50 === 0) {
          setTyping(index);
        }

        if (index + 1 === letterArray.length) {
          // reset typing when completed so that box may be scrolled into view
          setTyping(index + 1);
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
