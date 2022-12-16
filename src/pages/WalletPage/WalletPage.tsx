import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTranjectionDataAction,
  getWalletDataAction,
} from "../../Actions/walletActions";
import {
  Box,
  Text,
  Stack,
  Center,
  Flex,
  IconButton,
  Divider,
  FormControl,
  FormLabel,
  Button,
  Input,
} from "@chakra-ui/react";
import {
  BsArrowUpRightCircle,
  BsArrowDownLeftCircle,
  BsArrowUp,
  BsArrowDown,
} from "react-icons/bs";
import { Modal } from "react-bootstrap";
import { BiWalletAlt } from "react-icons/bi";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import post from "utils/payment";
import Axios from "axios";
export function WalletPage(props: any) {
  const navigate = useNavigate();

  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [amount, setAmount] = useState(0);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const getWalletData = useSelector((state: any) => state.getWalletData);
  const {
    walletData,
    loading: walletLoading,
    error: walletdataError,
  } = getWalletData;
  console.log("wallet data : ", walletData);

  const getTranjectionData = useSelector(
    (state: any) => state.getTranjectionData
  );
  const {
    loading: tranjectionLoading,
    topUpData,
    error: tranjectionError,
  } = getTranjectionData;

  console.log("getTranjectionData  : ", getTranjectionData);

  const dispatch = useDispatch<any>();

  const handlePaymentModal = () => {
    setPaymentModalShow(false);
  };

  const setAmountValue = (value: any) => {
    setAmount(parseFloat(value));
  };
  const paymentHandler = async () => {
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/credit/add`,
        { amount: amount },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      //it will give you a pop or patym topup page
      var information = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: data,
      };
      post(information);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    dispatch(getWalletDataAction());
    dispatch(getTranjectionDataAction());
  }, [navigate, userInfo]);

  return (
    <Box px="2" pt="0" color="black.500">
      {/* Container */}
      <Modal
        show={paymentModalShow}
        onHide={handlePaymentModal}
        size="sm"
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="popup">
          <Box bgGradient="linear(to-t, #fffad9, #ffffff)" p="5">
            <FormControl id="amount" p="5">
              <FormLabel fontSize="xs">Enter Amount</FormLabel>
              <Stack direction="column" align="left">
                <Input
                  id="amount"
                  onChange={(e) => setAmountValue(e?.target?.value)}
                  placeholder="2000"
                  value={amount}
                  required
                  type="number"
                />
              </Stack>
            </FormControl>
            <Stack
              direction="row"
              align="center"
              justifyContent="space-between"
              p="5"
            >
              <Button onClick={handlePaymentModal}>Cancle</Button>
              <Button onClick={paymentHandler}>Ok</Button>
            </Stack>
          </Box>
        </Modal.Body>
      </Modal>
      {tranjectionLoading || walletLoading ? (
        <HLoading loading={tranjectionLoading || walletLoading} />
      ) : tranjectionError || walletdataError ? (
        <MessageBox variant="danger">
          {tranjectionError || walletdataError}
        </MessageBox>
      ) : walletData && topUpData ? (
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
                  <Text color="#000000" fontSize="5xl" fontWeight="600">
                    Wallet
                  </Text>
                </Box>
                <Box justifyContent="center" align="center" p="70">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    align="center"
                    fontSize="4xl"
                    fontWeight="bold"
                    color="#403F49"
                  >
                    <Text>Total Balance </Text>
                    <Text>
                      $
                      {walletData.balances[Object.keys(walletData.balances)[0]]}
                    </Text>
                  </Stack>
                  <Stack
                    fontSize="xl"
                    fontWeight="400"
                    color="#747474"
                    align="flex-start"
                    mt="10"
                  >
                    <Text>Wallet ID: {walletData.walletId}</Text>
                    <Text>
                      Wallet address : {Object.keys(walletData.balances)[0]}
                    </Text>
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
                        onClick={() => setPaymentModalShow(true)}
                      >
                        <IconButton
                          bg="none"
                          icon={
                            <BiWalletAlt
                              size="20px"
                              fontWeight=""
                              color="#575757"
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
                      fontSize="2xl"
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
                    {topUpData &&
                      topUpData.map((eachTranjection: any) => (
                        <Stack direction="column" key={eachTranjection._id}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            align="flex-start"
                            alignContent="flex-start"
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
                                fontSize="md"
                                width="180px"
                                height="40px"
                                align="left"
                                ml="10"
                              >
                                {eachTranjection.reason}
                              </Text>
                            </Stack>
                            <Text color="#747474" fontSize="14px">
                              {eachTranjection.createdAt}
                            </Text>
                            {eachTranjection.method === "add" ? (
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
      ) : null}
    </Box>
  );
}
