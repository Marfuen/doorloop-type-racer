import { Text } from "@chakra-ui/react";
import Letter from "./Letter";

interface WordProps {
  word: string;
  currentLetterIndex: number;
  typedWord: string;
  isCurrentWord: boolean;
  lastTypedWords: string[];
  wordList: string[];
  wordIndex: number;
}

const Word: React.FC<WordProps> = ({
  word,
  currentLetterIndex,
  typedWord,
  isCurrentWord,
  lastTypedWords,
  wordList,
  wordIndex,
}) => {
  const splitWord = word.split("");
  const isCorrectWord = wordList[wordIndex] === lastTypedWords[wordIndex];

  return (
    <Text
      color={
        isCurrentWord
          ? "white"
          : wordIndex <= lastTypedWords.length - 1
          ? isCorrectWord
            ? "green.500"
            : "red.500"
          : "gray.500"
      }
    >
      {splitWord.map((letter, index) => {
        const isCurrentLetter = index === currentLetterIndex;
        const isCorrectLetter = word[index] === typedWord[index];
        return (
          <Letter
            key={index}
            letter={letter}
            isCurrentLetter={isCurrentLetter}
            isCorrectLetter={isCorrectLetter}
            typedWord={typedWord}
            isCurrentWord={isCurrentWord}
            letterIndex={index}
          />
        );
      })}
    </Text>
  );
};

export default Word;
