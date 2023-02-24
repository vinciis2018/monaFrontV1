import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Text,
  Stack,
  Center,
  Input,
  Divider,
  Button,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getWalletDataAction } from "Actions/walletActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

export function RequestMoney(props: any) {
  const navigate = useNavigate();
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const getWalletData = useSelector((state: any) => state.getWalletData);
  const dispatch = useDispatch<any>();
  const {
    walletData,
    loading: walletLoading,
    error: walletdataError,
  } = getWalletData;

  useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      console.log("userInfo RequestMoney : ", userInfo);
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    }
    dispatch(getWalletDataAction());
  }, [dispatch, navigate, userInfo]);

  return (
    <Box>
      <Center>
        {walletLoading ? (
          <HLoading loading={walletLoading} />
        ) : walletdataError ? (
          <MessageBox variant="danger">{walletdataError}</MessageBox>
        ) : walletData ? (
          <Box
            border="1px"
            boxShadow="lg"
            borderRadius="20"
            height=""
            width="858px"
            fontFamily="Sans"
            borderColor="rgba(33, 33, 33, 0.4)"
            p="20"
          >
            <Stack
              align="center"
              justifyContent="flex-start"
              direction="row"
              mt="10"
            >
              <Stack ml="-10">
                <AiOutlineArrowLeft
                  size="25px"
                  color="#403F49"
                  onClick={() => navigate("/walletPage")}
                />
              </Stack>
              <Text
                pl="10"
                color="#403F49"
                fontSize="3xl"
                fontWeight="semibold"
                align="left"
              >
                Request
              </Text>
            </Stack>
            <Box
              align="left"
              borderRadius="10px"
              border="1px"
              borderColor="rgba(33, 33, 33, 0.4)"
            >
              <Stack pt="10" pl="5" spacing="5">
                <Text color="#323234" fontSize="xl" fontWeight="semibold">
                  Enter Amount
                </Text>
                <Input
                  size="lg"
                  variant="flushed"
                  placeholder="Enter amount to send"
                  color="#000000"
                  width="50%"
                  borderColor="#000000"
                  justifyContent="flex-start"
                  borderRadius="5px"
                ></Input>
                <Text color="rgba(64, 63, 73, 0.8)" fontSize="lg" pb="5">
                  {`Current balance $ ${
                    walletData.balances[Object.keys(walletData.balances)[0]]
                  }`}
                </Text>
              </Stack>
              <Divider />
              <Stack pl="5" pt="5" pb="10" pr="5" spacing="5">
                <Text color="#000000" fontSize="sm">
                  You are requesting from
                </Text>
                <Input
                  p="3"
                  placeholder="Enter Phone number, wallet ID, or name"
                  color="#000000"
                  width="100%"
                  justifyContent="flex-start"
                  borderRadius="5px"
                  border="1px"
                  borderColor="#878787"
                ></Input>

                <Button
                  p="5"
                  color="#D7380E"
                  width="100%"
                  borderRadius="4px"
                  variant="outline"
                  align="center"
                  borderColor="#403F49"
                  border="2px"
                  fontWeight="semibold"
                  fontSize="xl"
                >
                  Send Request
                </Button>
              </Stack>
            </Box>
          </Box>
        ) : null}
      </Center>
    </Box>
  );
}
