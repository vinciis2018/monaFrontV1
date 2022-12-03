import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
  Box,
  Text,
  Flex,
  Button,
  Stack,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import ReactCodeInput from "react-code-input";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { VerticalLabels } from "../VerticalLabels";
// hooks
import { useWallet } from "components/contexts";
import { useNavigate } from "react-router-dom";
import HPasswordInput from "components/atoms/HPasswordInput";

import MessageBox from "components/atoms/MessageBox";

export function PinCreateModal(props: any) {
  const pinInputRef = useRef<ReactCodeInput>(null);
  const confirmInputRef = useRef<ReactCodeInput>(null);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [createPinFocus, setCreatePinFocus] = useState(true);
  const [createPincode, setCreatePin] = useState("");
  const [confirmPinFocus, setConfirmPinFocus] = useState(false);
  const [confirmPin, setConfirmPin] = useState("");

  const { tempSavePin } = useWallet();

  const onClick = async () => {
    if (createPincode === "" || confirmPin === "") {
      setErr("Please input PIN.");
    } else if (createPincode !== confirmPin) {
      setErr("Access PINs don't match, please try again.");
    } else {
      await tempSavePin(createPincode);
      props.onClick();
      props.nextSteps();
      //   navigate("/pin-success");
    }
  };

  const activeFocusArea = (element: string = "create") => {
    if (element === "create") {
      setCreatePinFocus(true);
      setConfirmPinFocus(false);
    } else {
      setCreatePinFocus(false);
      setConfirmPinFocus(true);
    }
  };

  const completedCreatePin = () => {
    // @ts-ignore
    confirmInputRef.current.textInput[0].focus();
  };

  useEffect(() => {
    // @ts-ignore
    // if (pinInputRef) {
    //   pinInputRef.current.textInput[0].focus();
    // }
  }, [pinInputRef]);

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
        <VerticalLabels activeStep={props.activeStep} />
        <Stack align="center" justifyContent="center">
          <Box alignItems="center" mt="10">
            {err !== "" ? (
              <MessageBox variant="danger">{err}</MessageBox>
            ) : (
              <span>&nbsp;</span>
            )}
            <Box align="center">
              <Text
                textAlign="center"
                px="4"
                pt="4"
                fontSize="xs"
                fontWeight="600"
              >
                Enter your 6 digit secret pin
              </Text>
              <HPasswordInput
                label="Create Access PIN"
                onChange={setCreatePin}
                onComplete={() => completedCreatePin()}
                focused={createPinFocus}
                ref={pinInputRef}
                onFocus={() => activeFocusArea("create")}
                labelAlign="left"
              />
            </Box>
            <Box align="center">
              <Text
                textAlign="center"
                px="4"
                pt="4"
                fontSize="xs"
                fontWeight="600"
              >
                Confirm your 6 digit secret pin
              </Text>
              <HPasswordInput
                label="Confirm Access PIN"
                onChange={setConfirmPin}
                focused={confirmPinFocus}
                onFocus={() => {
                  activeFocusArea("confirm");
                }}
                labelAlign="left"
                ref={confirmInputRef}
                autoFocus={false}
              />
            </Box>
            <Flex
              direction="column"
              alignItems="center"
              width="80"
              mt="5"
              justifyContent="center"
            >
              <Checkbox defaultChecked>
                I understand the wallet password cannot be recovered
              </Checkbox>
              <Button
                bgColor="#403F49"
                color="#EEEEEE"
                width="40"
                mt="5"
                mb="10"
                onClick={onClick}
              >
                Create Pin
              </Button>
            </Flex>
          </Box>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
