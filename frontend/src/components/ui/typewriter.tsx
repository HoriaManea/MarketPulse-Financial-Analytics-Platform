import { useEffect, useState } from "react";

type Props = {
  words: string;
};

export default function TextGenerateEffect({ words }: Props) {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setText(words.slice(0, i + 1));
      i++;

      if (i === words.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [words]);

  return <span>{text}</span>;
}
