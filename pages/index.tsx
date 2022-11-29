import {
  Box,
  Button,
  DarkMode,
  Flex,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import MainCTA from "../components/GameOver";
import Stats from "../components/Stats";
import Title from "../components/Title";
import Word from "../components/Word";
import wordBank from "../lib/wordBank";

const Home: React.FC = () => {
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState(wordList[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [lastTypedWords, setLastTypedWords] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [totalKeysPressed, setTotalKeysPressed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const correctKeysPressed = totalKeysPressed - mistakes;
  const accuracy = (correctKeysPressed / totalKeysPressed) * 100 || 0.0;
  const wpm = correctKeysPressed / 5 / 1 || 0.0;

  const scrambleWords = useCallback(() => {
    const scrambledWords = wordBank.sort(() => Math.random() - 0.5);
    setWordList(scrambledWords);
    setCurrentWord(scrambledWords[0]);
  }, []);

  useEffect(() => {
    // Randomize words in array
    scrambleWords();
  }, []);

  const handleGameStart = useCallback(() => {
    setIsGameStarted(true);
    scrambleWords();
    setCurrentWord(wordList[0]);
    setTimeRemaining(60);
    setWordIndex(0);
    setLetterIndex(0);
    setTypedWord("");
    setLastTypedWords([]);
    setMistakes(0);
    setTotalKeysPressed(0);
    setGameOver(false);
  }, []);

  const endGame = () => {
    setIsGameStarted(false);
    setGameOver(true);
  };

  useEffect(() => {
    if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining]);

  useEffect(() => {
    let interval = null;
    if (isGameStarted) {
      interval = setInterval(() => {
        setTimeRemaining((seconds) => seconds - 1);
      }, 1000);
    } else if (!isGameStarted && timeRemaining !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isGameStarted, timeRemaining]);

  const handleChange = (e: KeyboardEvent<HTMLElement>) => {
    const keyPressed = e.code;
    const isSpacebar = keyPressed === "Space";
    const isBackspace = keyPressed === "Backspace";
    const isKey = keyPressed.startsWith("Key");
    const keyString = e.key;
    const isFirstLetter = letterIndex === 0;
    const isFirstWord = wordIndex === 0;
    const previousWord = wordList[wordIndex - 1];
    const nextWord = wordList[wordIndex + 1];
    const lastTypedWord = lastTypedWords[wordIndex - 1];

    // If user intends to move to the next word
    if (isSpacebar) {
      // If the user has typed the wrong word
      setTotalKeysPressed((prev) => prev + 1);
      if (typedWord !== currentWord) {
        setMistakes((mistakes) => mistakes + 1);
      }
      setWordIndex((prev) => prev + 1);
      setCurrentWord(nextWord);
      setLetterIndex(0);
      // Set history of typed words regardless of being correct or not
      setLastTypedWords((prev) => {
        const tempArr = [...prev];
        tempArr[wordIndex] = typedWord;
        return tempArr;
      });
      setTypedWord("");
      // If user intends to delete a letter or go back to the previous word
    } else if (isBackspace) {
      setTotalKeysPressed((prev) => prev + 1);
      // If the user is deleting the first letter of the first word
      if (!isFirstWord && isFirstLetter) {
        setWordIndex((prev) => prev - 1);
        setCurrentWord(previousWord);
        setLetterIndex(lastTypedWord.length);
        setTypedWord(lastTypedWord);
        setLastTypedWords((prev) => {
          const tempArr = [...prev];
          tempArr.pop();
          return tempArr;
        });
      } else if (letterIndex > 0) {
        // If the user is deleting a letter in the middle of a word
        setLetterIndex((prev) => prev - 1);
        setTypedWord((prev) => prev.slice(0, -1));
      }
    } else if (isKey) {
      // If the user is typing a letter
      const isCorrectLetter = keyString === currentWord[letterIndex];
      if (!isCorrectLetter) {
        setMistakes((prev) => prev + 1);
      }
      setLetterIndex((prev) => prev + 1);
      setTotalKeysPressed((prev) => prev + 1);
      setTypedWord((prev) => prev + keyString);
    }
  };

  return (
    <DarkMode>
      <Box h="100vh" w="100vw">
        <Head>
          <title>Doorloop Typeracer</title>
        </Head>
        <Flex w="full" h="full" justifyContent="center">
          <Flex
            bg="gray.700"
            rounded="xl"
            p={4}
            my="auto"
            maxW="container.lg"
            flexGrow={1}
            minH="container.sm"
            direction="column"
            gap={4}
          >
            <Title />
            <MainCTA
              gameOver={gameOver}
              isGameStarted={isGameStarted}
              timeRemaining={timeRemaining}
            />
            <Stats accuracy={accuracy} wpm={wpm} />
            <SimpleGrid w="full" columns={[4]}>
              {wordBank.map((word, idx) => (
                <Word
                  key={word}
                  word={word}
                  isCurrentWord={word === currentWord}
                  currentLetterIndex={letterIndex}
                  typedWord={typedWord}
                  lastTypedWords={lastTypedWords}
                  wordList={wordList}
                  wordIndex={idx}
                />
              ))}
            </SimpleGrid>
            <Input
              value={typedWord}
              placeholder="Type the words given here"
              onKeyDown={handleChange}
              onChange={() => {}}
              disabled={!isGameStarted}
            />
            <Button onClick={handleGameStart} disabled={isGameStarted}>
              {gameOver ? "Restart Game" : "Start Game"}
            </Button>
            <Text textAlign="center">Made by Mariano Fuentes</Text>
          </Flex>
        </Flex>
      </Box>
    </DarkMode>
  );
};

export default Home;
