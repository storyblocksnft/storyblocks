import { useState } from "react";

type Word = {
  word: string;
  address: string;
};


const WordBlock = ({ word, address }: { word: string; address: string }) => {

  return (
    <div className="w-40 h-40 text-2xl text-center flex flex-col justify-center bg-green-100">
      <div className="text-white bg-black">{word}</div>
    </div>
  );
};

const Story = () => {
  const [words, setWords] = useState<undefined | Word[]>([
    { word: "once", address: "0x2323" },
    { word: "upon", address: "0x2323" },
    { word: "a", address: "0x2323" },
    { word: "time", address: "0x2323" },
    { word: "a", address: "0x232sdf3" },
    { word: "story", address: "0x23adsf23" },
    { word: "was", address: "0x2323" },
    { word: "told", address: "0x23asdf23" },
  ]);

  return (
    <div className="flex flex-row flex-wrap">
      {words &&
        words.map((word) => (
          <WordBlock key={word.word} word={word.word} address={word.address} />
        ))}
    </div>
  );
};

export default Story;
