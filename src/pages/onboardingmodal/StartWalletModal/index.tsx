import React from "react";
import { Modal } from "react-bootstrap";
import { Box, Text, Flex, Button, Stack, IconButton } from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { VerticalLabels } from "../VerticalLabels";
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// hooks
import { useLogin, useWallet } from "components/contexts";
import { useNavigate } from "react-router-dom";

// import { isPWA } from "utils/util";
import { createWallet, editWallet } from "../../../Actions/walletActions";
// import { signout } from "Actions/userActions";
// import MessageBox from "components/atoms/MessageBox";
// import HLoading from "components/atoms/HLoading";

export function StartWalletModal(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { register } = useLogin();

  const {
    setupPin,
    generateAndSave,
    getTempSavedPin,
    wipeTempSavedPin,
    getArweavePublicAddress,
  } = useWallet();

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  // let deferredPrompt: Event;

  const registerUser = () => {
    const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
    register(expired);

    getTempSavedPin().then((pin: string | null) => {
      if (pin) {
        setupPin(pin)
          .then(() => wipeTempSavedPin())
          .then(() => generateAndSave(pin));
        const defWallet = getArweavePublicAddress();
        if (userInfo?.defaultWallet === undefined || null || "") {
          dispatch(createWallet(defWallet));
        }
        if (userInfo?.defaultWallet !== defWallet) {
          dispatch(
            editWallet({
              defWallet,
            })
          );
        }
        navigate("/view-secrate-key");
      } else {
        navigate("/pin-create");
      }
    });
  };

  const onClick = async () => {
    registerUser();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}

      // centered
    >
      <Modal.Body>
        <Stack align="end" justifyContent="flex-end">
          <IconButton
            bg="none"
            icon={
              <AiOutlineCloseCircle
                size="40px"
                fontWeight="10"
                color="black"
                onClick={props.onHide}
              />
            }
            aria-label="Close"
          />
        </Stack>
        <VerticalLabels />
        <Stack align="center" justifyContent="center" px="">
          <Box
            alignItems="center"
            justifyContent="center"
            marginBottom=""
            p="15"
          >
            <Text
              color="#000000"
              fontSize="18px"
              width="635px"
              height="50px"
              top="158px"
              left="110px"
              mt="10"
            >
              Don’t risk your funds. Protect your wallet by saving your Secret
              Recovery Phrase in a place you trust
            </Text>
            <Text
              color="#000000"
              fontSize="18px"
              width="635px"
              height="50px"
              top="158px"
              left="110px"
              mt="5"
            >
              It is the only way to recover the wallet if you get locked out of
              the app or get a new device
            </Text>
            <Flex
              direction="column"
              alignItems="center"
              mt="100"
              justifyContent="center"
            >
              <Button
                bgColor="#403F49"
                color="#EEEEEE"
                height="54px"
                width="254px"
                fontSize="24px"
                borderRadius="4px"
                onClick={onClick}
              >
                Start
              </Button>
              <Text fontSize="24px" left="100px" mt="4" mb="10">
                Remind me latter
              </Text>
            </Flex>
          </Box>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
