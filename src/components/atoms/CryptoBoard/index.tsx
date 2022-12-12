import { Box, SimpleGrid, Text } from "@chakra-ui/react";

interface Props {
  mnemonics: string;
  sx?: any;
}

export default function CryptoBoard({ mnemonics, sx }: Props) {
  const items = mnemonics.split(" ");

  return (
    <SimpleGrid gap={4} columns={[2]}>
      <Box align="center" flex={1}>
        {items
          .filter((_item, _i) => _i < 6)
          .map((keyword, i) => (
            <Item key={i} label={`${i + 1}`} title={keyword} />
          ))}
      </Box>
      <Box flex={1}>
        {items
          .filter((_item, _i) => _i >= 6)
          .map((keyword, i) => (
            <Item key={i} label={`${i + 7}`} title={keyword} />
          ))}
      </Box>
    </SimpleGrid>
  );
}

export const Item = ({
  label,
  title,
}: {
  label: string;
  title: string | number;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      marginBottom="10px"
      bgColor="#F3F3F3"
      color="#000000"
      width="80%"
      p="2"
      borderRadius="4px"
      height="38px"
    >
      <Text>{label}.</Text>
      <Text ml="2">{title}</Text>
    </Box>
  );
};
