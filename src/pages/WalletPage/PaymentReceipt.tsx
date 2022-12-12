import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Stack, Center, IconButton } from "@chakra-ui/react";
import { BsArrowLeft, BsFillCheckCircleFill } from "react-icons/bs";
export function PaymentReceipt(props: any) {
  const navigate = useNavigate();
  return (
    <Box px="2" pt="20" color="black.500">
      {/* Container */}

      <Box maxW="container.lg" mx="auto" pb="8" mt="10">
        <Center maxW="container.lg" mx="auto" pb="8">
          <Stack p="2">
            <Box
              border="1px"
              borderRadius="40px"
              width="858px"
              // height="897px"
              fontFamily="Sans"
              borderColor="rgba(33, 33, 33, 0.4)"
              align="center"
              p="10"
            >
              <Stack align="left" mt="3">
                <BsArrowLeft
                  onClick={() => navigate(`/customCreation/admin`)}
                  size="30px"
                />
              </Stack>

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
              <Text mt="3" fontStyle="semiBold" fontSize="24px" color="#000000">
                Success
              </Text>
              <Text mt="3" fontStyle="semiBold" fontSize="20px" color="#313131">
                Topup Amount
              </Text>
              <Text mt="3" fontStyle="semiBold" fontSize="40px" color="#000000">
                $1234
              </Text>
              <Text mt="3" fontStyle="semiBold" fontSize="20px" color="#575757">
                Rupees two thousand ruppes Only
              </Text>
              <Text mt="3" fontStyle="regular" fontSize="16px" color="#2C2C2C">
                Paid at 10:00 AM, 24 December 2022
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
                  fontSize="20px"
                  color="#313131"
                >
                  Paid using
                </Text>
                <Text
                  mt="3"
                  fontStyle="regular"
                  fontSize="20px"
                  color="#2C2C2C"
                >
                  example@upi.com
                </Text>
                <Text
                  mt="3"
                  fontStyle="semiBold"
                  fontSize="20px"
                  color="#313131"
                >
                  Referral ID
                </Text>
                <Text
                  mt="3"
                  mb="3"
                  fontStyle="regular"
                  fontSize="20px"
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
                  fontSize="16px"
                  color="#000000"
                  type="Button"
                  p="5"
                >
                  Share
                </Text>
                <Text
                  fontStyle="regular"
                  fontSize="16px"
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
    </Box>
  );
}
