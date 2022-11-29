import { Text } from "@chakra-ui/react";

interface LetterProps {
  letter: string;
  isCurrentLetter: boolean;
  isCorrectLetter: boolean;
  typedWord: string;
  isCurrentWord: boolean;
  letterIndex: number;
}

const Letter: React.FC<LetterProps> = ({
  letter,
  isCurrentLetter,
  isCorrectLetter,
  typedWord,
  isCurrentWord,
  letterIndex,
}) => {
  const color = isCurrentLetter
    ? "blue.500"
    : isCorrectLetter
    ? "green.500"
    : letterIndex < typedWord.length
    ? "red.500"
    : "white";
  return (
    <Text as="span" color={isCurrentWord ? color : ""}>
      {letter}
    </Text>
  );
};

export default Letter;
