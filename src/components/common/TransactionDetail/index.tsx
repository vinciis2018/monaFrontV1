import React from "react";
import { Box, Text, Stack, Divider } from "@chakra-ui/react";
import { convertIntoDateAndTime } from "utils/dateAndTime";

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
            {convertIntoDateAndTime(tranjection.createdAt)}
          </Text>
          {tranjection.method === "add" ? (
            <Text color="#747474" fontSize="20px">
              +{tranjection.amount}
            </Text>
          ) : (
            <Text color="#747474" fontSize="20px">
              -{tranjection.amount}
            </Text>
          )}
        </Stack>
        <Divider orientation="horizontal" />
      </Stack>{" "}
    </Box>
  );
}
