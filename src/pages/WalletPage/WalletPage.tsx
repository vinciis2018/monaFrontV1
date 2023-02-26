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
  HStack,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Button,
  Input,
} from "@chakra-ui/react";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import { BiWalletAlt } from "react-icons/bi";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import post from "utils/payment";
import Axios from "axios";
import { TransactionDetail } from "components/common/TransactionDetail";
import { LoginModal } from "pages/onboardingmodal/LoginModal";
import { PaymentReceiptPopup } from "./PaymentReceiptPopup";
export function WalletPage(props: any) {
  const navigate = useNavigate();

  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(true);
  const [paymentReceiptModalShow, setPaymentReceiptModalShow] = useState(false);
  const [selectedTranjection, setSelectedTranjection] = useState<any>();
  const [amount, setAmount] = useState(0);
  const [selectValue, setSelectedValue] = useState<any>("All");

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const getWalletData = useSelector((state: any) => state.getWalletData);
  const {
    walletData,
    loading: walletLoading,
    error: walletdataError,
  } = getWalletData;

  const getTranjectionData = useSelector(
    (state: any) => state.getTranjectionData
  );
  const {
    loading: tranjectionLoading,
    topUpData,
    error: tranjectionError,
  } = getTranjectionData;

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
  const handalOpenPaymentReceipt = (id: any) => {
    setSelectedTranjection(id);
    setPaymentReceiptModalShow(true);
  };

  useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      console.log("userInfo  page : ", userInfo);
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    }
    dispatch(getWalletDataAction());
    dispatch(getTranjectionDataAction());
  }, [dispatch, navigate, userInfo]);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
  };

  return (
    <Box px="2" pt="20" color="black.500">
      {/* Container */}
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
      <PaymentReceiptPopup
        tranjctionData={selectedTranjection}
        show={paymentReceiptModalShow}
        onHide={() => setPaymentReceiptModalShow(false)}
      />
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
          <Box p="5">
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
                boxShadow="lg"
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
                      {walletData.balances}
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
                    <Text>Wallet address : {userInfo.defaultWallet}</Text>
                  </Stack>
                  <HStack pt="10" spacing="10">
                    <HStack
                      border="1px"
                      borderRadius="30px"
                      p="2"
                      align="center"
                      boxShadow="xl"
                      onClick={() => navigate("/send-money")}
                    >
                      <Stack pl="3">
                        <BsArrowUpRight
                          size="16px"
                          color="#575757"
                          onClick={() => navigate("/send-money")}
                        />
                      </Stack>

                      <Text color="#313131" fontSize="sm" pr="3">
                        Send
                      </Text>
                    </HStack>
                    <HStack
                      border="1px"
                      borderRadius="30px"
                      boxShadow="xl"
                      p="2"
                      align="center"
                      onClick={() => navigate("/request-money")}
                    >
                      <Stack pl="3">
                        <BsArrowDownLeft
                          size="16px"
                          color="#575757"
                          onClick={() => navigate("/request-money")}
                        />
                      </Stack>

                      <Text color="#313131" fontSize="sm" pr="3">
                        Receive
                      </Text>
                    </HStack>
                    <HStack
                      border="1px"
                      borderRadius="30px"
                      p="2"
                      align="center"
                      boxShadow="xl"
                      onClick={() => setPaymentModalShow(true)}
                    >
                      <Stack pl="3">
                        <BiWalletAlt
                          size="16px"
                          color="#575757"
                          onClick={() => navigate("/request-money")}
                        />
                      </Stack>

                      <Text color="#313131" fontSize="sm" pr="3">
                        Top up
                      </Text>
                    </HStack>
                  </HStack>
                  <Box
                    borderBottom="1px"
                    height="0"
                    mt="5"
                    borderColor="rgba(33, 33, 33, 0.4)"
                  ></Box>
                  <Flex justifyContent="space-between">
                    <Text
                      fontSize="2xl"
                      // fontFamily="manrope"
                      color="#000000"
                      p="5"
                      pl="0"
                      fontWeight="bold"
                      align="left"
                    >
                      Transations
                    </Text>
                    <HStack spacing="3">
                      <Text
                        fontSize="sm"
                        color={selectValue === "All" ? "#000000" : "#8B8B8B"}
                        p="5"
                        pl="0"
                        type="Button"
                        onClick={() => handleSelect("All")}
                      >
                        All
                      </Text>
                      <Text
                        fontSize="sm"
                        color={selectValue === "Sent" ? "#000000" : "#8B8B8B"}
                        p="5"
                        pl="0"
                        type="Button"
                        onClick={() => handleSelect("Sent")}
                      >
                        Sent
                      </Text>
                      <Text
                        fontSize="sm"
                        type="Button"
                        color={
                          selectValue === "Received" ? "#000000" : "#8B8B8B"
                        }
                        p="5"
                        pl="0"
                        onClick={() => handleSelect("Received")}
                      >
                        Received
                      </Text>
                    </HStack>
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
                        <TransactionDetail
                          key={eachTranjection._id}
                          tranjection={eachTranjection}
                          handalOpenPaymentReceipt={handalOpenPaymentReceipt}
                        />
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
