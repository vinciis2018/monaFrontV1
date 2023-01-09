import React from "react";
import { Box, Text, Stack, Center, IconButton } from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { inWords } from "utils/inWords";
import { convertIntoDateAndTime } from "utils/dateAndTime";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-bootstrap";

export function PaymentReceiptPopup(props: any) {
  const { tranjctionData } = props;
  console.log("tranjctionData : ", tranjctionData);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <Stack align="end" justifyContent="flex-end">
          <IconButton
            bg="none"
            icon={
              <AiOutlineCloseCircle
                size="30px"
                fontWeight="10"
                color="#00000090"
                onClick={props.onHide}
              />
            }
            aria-label="Close"
          />
        </Stack>
        <Box px="2" color="black.500">
          {/* Container */}
          {tranjctionData ? (
            <Box maxW="container.lg" mx="auto" pb="8">
              <Center maxW="container.lg" mx="auto" pb="8">
                <Stack p="2">
                  <Box
                    // border="1px"
                    // borderRadius="40px"
                    width="858px"
                    // height="897px"
                    fontFamily="Sans"
                    borderColor="rgba(33, 33, 33, 0.4)"
                    align="center"
                  >
                    <Text fontStyle="bold" fontSize="32px" color="#313131">
                      Wallet top upu
                    </Text>
                    <IconButton
                      bg="none"
                      mt="5"
                      icon={
                        <BsFillCheckCircleFill
                          size="50px"
                          fontWeight="1"
                          color="#31A727"
                          onClick={props.onHide}
                        />
                      }
                      aria-label="Send Money"
                    />
                    <Text
                      mt="3"
                      fontStyle="semiBold"
                      fontSize="xl"
                      color="#000000"
                    >
                      Success
                    </Text>
                    <Text
                      mt="3"
                      fontStyle="semiBold"
                      fontSize="lg"
                      color="#313131"
                    >
                      Topup Amount
                    </Text>
                    <Text
                      mt="3"
                      fontStyle="semiBold"
                      fontSize="4xl"
                      color="#000000"
                    >
                      {`$${tranjctionData.amount}`}
                    </Text>
                    <Text
                      mt="3"
                      fontStyle="semiBold"
                      fontSize="lg"
                      color="#575757"
                    >
                      {inWords(tranjctionData.amount)}
                    </Text>
                    <Text
                      mt="3"
                      fontStyle="regular"
                      fontSize="md"
                      color="#2C2C2C"
                    >
                      {`Paid at ${convertIntoDateAndTime(
                        tranjctionData.createdAt
                      )}`}
                    </Text>
                    <Box
                      border="1px"
                      width="80%"
                      mt="5"
                      borderColor="rgba(33, 33, 33, 0.4)"
                    >
                      <Text
                        mt="3"
                        fontStyle="semiBold"
                        fontSize="lg"
                        color="#313131"
                      >
                        Paid using
                      </Text>
                      <Text
                        mt="3"
                        fontStyle="regular"
                        fontSize="lg"
                        color="#2C2C2C"
                      >
                        example@upi.com
                      </Text>
                      <Text
                        mt="3"
                        fontStyle="semiBold"
                        fontSize="lg"
                        color="#313131"
                      >
                        Referral ID
                      </Text>
                      <Text
                        mt="3"
                        mb="3"
                        fontStyle="regular"
                        fontSize="lg"
                        color="#2C2C2C"
                      >
                        1a1a1sa632s65sa6as6a
                      </Text>
                    </Box>
                    <Stack
                      align="center"
                      direction="row"
                      justifyContent="center"
                      mt="0"
                    >
                      <Text
                        fontStyle="regular"
                        fontSize="md"
                        color="#000000"
                        type="Button"
                        p="5"
                      >
                        Share
                      </Text>
                      <Text
                        fontStyle="regular"
                        fontSize="md"
                        color="#000000"
                        type="Button"
                      >
                        Help
                      </Text>
                    </Stack>
                  </Box>
                </Stack>
              </Center>
            </Box>
          ) : null}
        </Box>
      </Modal.Body>
    </Modal>
  );
}
