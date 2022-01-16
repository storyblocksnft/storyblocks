import { useState } from "react";
import { wordSet } from "../utils/words";

type ValidResponse = {
  isValid: boolean;
  message: string;
};

const isValidPhrase = (phrase: string): ValidResponse => {
  // assume phrase is alphabetical and split by spaces
  const words = phrase.split(" ");
  for (const word of words) {
    if (!wordSet.has(word)) {
      return {
        isValid: false,
        message: `${word} is not in set of available words.`,
      };
    }
  }
  return { isValid: true, message: "" };
};

const WordInput = () => {
  const [word, setWord] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const onWordChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setValidationMessage(isValidPhrase(e.currentTarget.value).message);
    setWord(e.currentTarget.value);
  };

  return (
    <div>
      <input
        type="text"
        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
        value={word}
        onChange={onWordChange}
      />
      <p> {validationMessage} </p>
    </div>
  );
};

export default WordInput;
