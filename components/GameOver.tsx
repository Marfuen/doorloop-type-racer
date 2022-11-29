import { Heading } from "@chakra-ui/react";

interface MainCTAProps {
  gameOver: boolean;
  isGameStarted: boolean;
  timeRemaining: number;
}

const MainCTA: React.FC<MainCTAProps> = ({
  gameOver,
  isGameStarted,
  timeRemaining,
}) => {
  return gameOver ? (
    <Heading
      alignSelf="center"
      justifySelf="center"
      textAlign="center"
      w="full"
      color="red.500"
    >
      Game Over!
    </Heading>
  ) : isGameStarted ? (
    <Heading
      alignSelf="center"
      justifySelf="center"
      textAlign="center"
      w="full"
      color="green.500"
    >
      {timeRemaining} seconds left
    </Heading>
  ) : (
    <Heading
      alignSelf="center"
      justifySelf="center"
      textAlign="center"
      w="full"
      color="green.500"
    >
      Press start to being challenge
    </Heading>
  );
};

export default MainCTA;
