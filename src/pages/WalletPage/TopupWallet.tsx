import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Stack,
  Center,
  Input,
  Button,
  Divider,
  Flex,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import {
  BsArrowLeft,
  BsFillCheckCircleFill,
  BsFillXCircleFill,
} from "react-icons/bs";

export function TopupWallet(props: any) {
  const cardDetailt = [
    {
      image: "",
      cardNumber: "21244324343412",
      expairyDate: "07/23",
      cvv: "212",
    },
    {
      image: "",
      cardNumber: "21244324343412",
      expairyDate: "07/23",
      cvv: "212",
    },
    {
      image: "",
      cardNumber: "21244324343412",
      expairyDate: "07/23",
      cvv: "212",
    },
  ];
  const navigate = useNavigate();
  const [verifyUPIIDMessage, setVerifyUPIIDMessage] = useState<any>("");
  const [verifyUPIIDStatus, setVerifyUPIIDStatus] = useState<any>("");
  const [upiID, setUPIID] = useState<any>("");
  const verifyUPIID = () => {
    if (upiID) {
      setVerifyUPIIDStatus("success");
      setVerifyUPIIDMessage("Vishal kumar");
    } else {
      setVerifyUPIIDStatus("failed");
      setVerifyUPIIDMessage("Please enter valid UPI");
    }
  };
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
            >
              <Stack align="center" direction="row" p="5" ml="5">
                <BsArrowLeft
                  onClick={() => navigate(`/customCreation/admin`)}
                  size="30px"
                />
                <Text fontStyle="bold" fontSize="32px" color="#403F49" p="10">
                  Topup Wallet
                </Text>
              </Stack>
              <Box
                border="1px"
                width="70%"
                borderColor="rgba(33, 33, 33, 0.4)"
                borderRadius="8px"
                align="left"
                fontFamily="Sans"
              >
                <Box
                  border="1px"
                  width="100%"
                  borderColor="rgba(33, 33, 33, 0.4)"
                  p="5"
                >
                  <Text fontStyle="semiboid" fontSize="24px" color="#000000">
                    Add credit to your wallet
                  </Text>
                  <Text fontStyle="bold" fontSize="20px" color="##000000">
                    Current balance is $1234
                  </Text>
                </Box>
                <Box
                  border="1px"
                  width="100%"
                  borderColor="rgba(33, 33, 33, 0.4)"
                  p="5"
                >
                  {" "}
                  <Text fontStyle="bold" fontSize="16px" color="#000000">
                    Enter amount to add
                  </Text>
                  <Input width="467px" height="42px"></Input>
                </Box>
              </Box>
              <Box
                border="1px"
                width="70%"
                mt="5"
                borderColor="rgba(33, 33, 33, 0.4)"
                align="left"
                p="5"
                mb="10"
              >
                <Text fontStyle="bold" fontSize="20px" color="#000000">
                  Enter UPI ID
                </Text>
                <Stack direction="row">
                  <Input
                    placeholder="vagsnshetreghsto@upi"
                    width="80%"
                    onChange={(e) => setUPIID(e.target.value)}
                  ></Input>
                  <Button
                    color="#D7380E"
                    variant="outline"
                    width="20%"
                    onClick={verifyUPIID}
                  >
                    Verify
                  </Button>
                </Stack>
                {verifyUPIIDStatus === "success" ? (
                  <Stack direction="row" align="center" mt="2">
                    <IconButton
                      bg="none"
                      icon={
                        <BsFillCheckCircleFill
                          size="30px"
                          fontWeight="1"
                          color="#31A727"
                        />
                      }
                      aria-label="Send Money"
                    />
                    <Text color="#31A727" fontSize="20px">
                      {verifyUPIIDMessage}
                    </Text>
                  </Stack>
                ) : verifyUPIIDStatus === "failed" ? (
                  <Stack direction="row" align="center">
                    <IconButton
                      bg="none"
                      icon={
                        <BsFillXCircleFill
                          size="30px"
                          fontWeight="1"
                          color="#D7380E"
                        />
                      }
                      aria-label="Send Money"
                    />
                    <Text color="#D7380E" fontSize="20px">
                      {verifyUPIIDMessage}
                    </Text>
                  </Stack>
                ) : null}
                <Flex align="center">
                  <Divider />
                  <Text padding="2" color="#000000" fintSize="24px">
                    OR
                  </Text>
                  <Divider />
                </Flex>
                <Text color="#000000" fontStyle="regular" fontSize="20px">
                  Credit or debit card
                </Text>
                {/* Available or added cradit card or dabit card */}
                <Stack>
                  {cardDetailt.map((card, index) => (
                    <Stack
                      border="1px"
                      width="100%"
                      mt="1"
                      borderColor="rgba(33, 33, 33, 0.4)"
                      align="center"
                      direction="row"
                      justifyContent="space-between"
                      fontStyle="bold"
                      fontSize="20px"
                      color="#000000"
                      p="2"
                    >
                      <Box height="46px" width="86px" bgColor="#FF2F0C"></Box>
                      <Text>{card.cardNumber}</Text>
                      <Text>{card.expairyDate}</Text>
                      <Text>{card.cvv}</Text>
                      <Checkbox></Checkbox>
                    </Stack>
                  ))}
                </Stack>
                <Button width="100%" color="#244CD6" variant="outline" mt="2">
                  + New payment method
                </Button>
                <Button
                  width="100%"
                  color="#D7380E"
                  variant="outline"
                  mt="5"
                  mb="2"
                >
                  Proceed to payment
                </Button>
              </Box>
            </Box>
          </Stack>
        </Center>
      </Box>
    </Box>
  );
}
