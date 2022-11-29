import { Box, Heading, Text } from "@chakra-ui/react";

interface TitleProps {}

const Title: React.FC<TitleProps> = () => {
  return (
    <Box>
      <Heading>
        Doorloop Typeracer{" "}
        <Text as="span" fontSize="sm">
          (beta)
        </Text>
      </Heading>
      <Text fontSize="sm" color="gray.400">
        Type the words as fast as you can!
      </Text>
    </Box>
  );
};

export default Title;
