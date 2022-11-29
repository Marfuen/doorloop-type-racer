import { Box, Text } from "@chakra-ui/react";

interface StatsProps {
  wpm: number;
  accuracy: number;
}

const Stats: React.FC<StatsProps> = ({ accuracy, wpm }) => {
  const adjustedWpm = wpm * (accuracy / 100);
  return (
    <Box>
      <Text>Accuracy: {accuracy.toFixed(2)}%</Text>
      <Text>Words Per Minute: {wpm}</Text>
      <Text>Adjusted Words Per Minute: {Math.floor(adjustedWpm)}</Text>
    </Box>
  );
};

export default Stats;
