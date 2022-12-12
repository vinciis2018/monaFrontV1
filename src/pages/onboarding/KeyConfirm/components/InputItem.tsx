import { Box, Text, Input } from "@chakra-ui/react";

export const InputItem = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      <Input
        value={value}
        onChange={onChange}
        ml="2"
        align="left"
        size="sm"
        height="28px"
        // variant="unstyled"
        variant="flushed"
      />
    </Box>
  );
};
