import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Stack,
  Center,
  Flex,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import {
  BsArrowUpRightCircle,
  BsArrowDownLeftCircle,
  BsArrowUp,
  BsArrowDown,
  // BsCircle,
} from "react-icons/bs";
import { BiWalletAlt } from "react-icons/bi";
export function WalletPage(props: any) {
  const navigate = useNavigate();
  const tranjections = [
    {
      status: "Cradit balance top up",
      data: "12-11-2022",
      amount: "1000",
      type: "recieve",
    },
    {
      status: "Cradit balance top up",
      data: "12-11-2022",
      amount: "1000",
      type: "recieve",
    },

    {
      status: "Repail",
      data: "12-11-2022",
      amount: "1000",
      type: "send",
    },
    {
      status: "Repail",
      data: "12-11-2022",
      amount: "1000",
      type: "send",
    },
    {
      status: "Repail",
      data: "12-11-2022",
      amount: "1000",
      type: "recieve",
    },
  ];
  return (
    <Box px="2" pt="0" color="black.500">
      {/* Container */}

      <Box maxW="container.lg" mx="auto" pb="8">
        <Center maxW="container.lg" mx="auto" pb="8">
          <Stack p="2">
            <Box
              border="1px"
              borderRadius="20"
              height=""
              width="858px"
              fontFamily="Sans"
              borderColor="rgba(33, 33, 33, 0.4)"
            >
              <Box
                borderTopRadius="20"
                borderBottom="1px"
                borderColor="rgba(33, 33, 33, 0.4)"
              >
                <Text color="#000000" fontSize="40px" fontWeight="600">
                  Wallet
                </Text>
              </Box>
              <Box justifyContent="center" align="center" p="70">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  align="center"
                  fontSize="32px"
                  color="#403F49"
                >
                  <Text fontSize="SemiBold">Total Balance </Text>
                  <Text>$ 11111</Text>
                </Stack>
                <Stack
                  fontSize="20px"
                  fontWeight="400"
                  color=""
                  align="flex-start"
                  mt="10"
                >
                  <Text>Wallet ID: 122665TYH</Text>
                  <Text>Wallet address : 122665256547624652734</Text>
                </Stack>
                <Flex mt="10" color="#313131" fontSize="14px">
                  <Stack>
                    <IconButton
                      bg="none"
                      icon={
                        <BsArrowUpRightCircle
                          size="40px"
                          fontWeight="10"
                          color="#575757"
                          onClick={props.onHide}
                        />
                      }
                      aria-label="Send Money"
                    />
                    <Text>Send</Text>
                  </Stack>
                  <Stack ml="10">
                    <IconButton
                      bg="none"
                      icon={
                        <BsArrowDownLeftCircle
                          size="40px"
                          fontWeight="10"
                          color="#575757"
                          onClick={props.onHide}
                        />
                      }
                      aria-label="Send Money"
                    />
                    <Text>Receive</Text>
                  </Stack>
                  <Stack ml="10" align="center">
                    <Box
                      borderRadius="100%"
                      border="4px"
                      height="40px"
                      width="40px"
                      borderColor="#575757"
                    >
                      <IconButton
                        bg="none"
                        icon={
                          <BiWalletAlt
                            size="20px"
                            fontWeight=""
                            color="#575757"
                            onClick={props.onHide}
                          />
                        }
                        aria-label="Send Money"
                      />
                    </Box>
                    <Text>Top up</Text>
                  </Stack>
                </Flex>
                <Box
                  borderBottom="1px"
                  height="0"
                  mt="5"
                  borderColor="rgba(33, 33, 33, 0.4)"
                ></Box>
                <Flex>
                  <Text
                    fontSize="20px"
                    // fontFamily="manrope"
                    color="#000000"
                    p="5"
                    pl="0"
                    fontWeight="bold"
                  >
                    Tranjection
                  </Text>
                </Flex>
                <Box
                  borderBottom="1px"
                  height="0"
                  borderColor="rgba(33, 33, 33, 0.4)"
                ></Box>
                {/* tranjections content */}
                <Box>
                  {tranjections.map((eachTranjection, index) => (
                    <Stack direction="column">
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        align="flex-start"
                        alignContent="flex-start"
                        key={index}
                        p="5"
                        pl="0"
                      >
                        <Stack direction="row">
                          <Box
                            height="46px"
                            width="86px"
                            bgColor="#FF2F0C"
                          ></Box>
                          <Text
                            color="#313131"
                            fontSize="20px"
                            width="180px"
                            height="40px"
                            align="left"
                            ml="10"
                          >
                            {eachTranjection.status}
                          </Text>
                        </Stack>
                        <Text color="#747474" fontSize="14px">
                          {eachTranjection.data}
                        </Text>
                        {eachTranjection.type === "send" ? (
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
                        ) : (
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
                        )}
                        <Text color="#747474" fontSize="20px">
                          {eachTranjection.amount}
                        </Text>
                      </Stack>
                      <Divider orientation="horizontal" />
                    </Stack>
                  ))}
                </Box>
              </Box>
            </Box>
          </Stack>
        </Center>
      </Box>
    </Box>
  );
}
