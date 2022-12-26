import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";

// import Axios from "axios";

export function SendMoney(props: any) {
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
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    }
    dispatch(getWalletDataAction());
  }, [dispatch, navigate, userInfo]);

  return (
    <Box pb="20">
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
            pb="20"
            pl="20"
            pr="20"
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
                Send
              </Text>
            </Stack>
            <Box
              mt="5"
              align="left"
              borderRadius="10px"
              border="1px"
              borderColor="rgba(33, 33, 33, 0.4)"
            >
              <Stack pt="10" pl="5">
                <Text color="#000000" fontSize="xl" fontWeight="semibold">
                  Enter Amount
                </Text>
                <Input
                  mt="5"
                  placeholder="Enter amount to send"
                  color="#000000"
                  width="50%"
                  justifyContent="flex-start"
                  borderRadius="5px"
                ></Input>
                <Text color="#000000" fontSize="lg" mt="5" pb="5">
                  {`Current balance $ ${
                    walletData.balances[Object.keys(walletData.balances)[0]]
                  }`}
                </Text>
              </Stack>
              <Divider />
              <Stack pl="5" pt="5" pb="10" pr="5">
                <Text color="#000000" fontSize="sm">
                  You are sending to
                </Text>
                <Input
                  placeholder="Enter Phone number, wallet ID, or name"
                  color="#000000"
                  width="100%"
                  justifyContent="flex-start"
                  borderRadius="5px"
                  border="1px"
                ></Input>
                <Button
                  p="5"
                  mt="5"
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
                  Proceed to payment
                </Button>
              </Stack>
            </Box>
          </Box>
        ) : null}
      </Center>
    </Box>
  );
}
