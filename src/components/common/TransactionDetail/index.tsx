import React from "react";
import { Box, Text, IconButton, Stack, Divider } from "@chakra-ui/react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

export function TransactionDetail(props: any) {
  const { tranjection } = props;
  return (
    <Box
      type="Button"
      key={tranjection._id}
      onClick={() => props.handalOpenPaymentReceipt(tranjection)}
    >
      <Stack direction="column" key={tranjection._id}>
        <Stack
          direction="row"
          justifyContent="space-between"
          align="flex-start"
          alignContent="flex-start"
          p="5"
          pl="0"
        >
          <Stack direction="row">
            <Box height="46px" width="86px" bgColor="#FF2F0C"></Box>
            <Text
              color="#313131"
              fontSize="md"
              width="180px"
              height="40px"
              align="left"
              ml="10"
            >
              {tranjection.reason}
            </Text>
          </Stack>
          <Text color="#747474" fontSize="14px">
            {tranjection.createdAt}
          </Text>
          {tranjection.method === "add" ? (
            <IconButton
              bg="none"
              icon={
                <BsArrowDown
                  size="30px"
                  fontWeight="10"
                  color="#31A727"
                  onClick={props.onHide}
                />
              }
              aria-label="receive Money"
            />
          ) : (
            <IconButton
              bg="none"
              icon={
                <BsArrowUp
                  size="30px"
                  fontWeight="10"
                  color="#FF2F0C"
                  onClick={props.onHide}
                />
              }
              aria-label="Send Money"
            />
          )}
          <Text color="#747474" fontSize="20px">
            {tranjection.amount}
          </Text>
        </Stack>
        <Divider orientation="horizontal" />
      </Stack>{" "}
    </Box>
  );
}
