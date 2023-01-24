import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Box, Text, Flex, Button, Stack, IconButton } from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
// hooks
import { useWallet, useLogin } from "components/contexts";
import HPasswordInput from "components/atoms/HPasswordInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ERROR_IDS } from "utils/constants";
import MessageBox from "components/atoms/MessageBox";

export function LoginModal(props: any) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useLogin();
  const [err, setErr] = useState("");
  const [activeBtn, setActiveBtn] = useState(true);
  // const [pinFocus, setPinFocus] = useState(true);
  const [pin, setPin] = useState("");
  const target = searchParams.get("target");
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const {
    isLoading,
    unlock,
    checkAndTriggerSelfDestruct,
    generateAndSave,
    wipeTempSavedPin,
  } = useWallet();

  const checkPin = async () => {
    const pincode = pin;
    if (pincode !== "") {
      try {
        const cleared = await checkAndTriggerSelfDestruct(pincode);
        if (cleared) {
          navigate("/");
        } else {
          try {
            await unlock(pincode);
            const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
            await login(expired);
            props.onHide();
          } catch (error: any) {
            if (error?.message?.includes(ERROR_IDS.NO_CONTENT)) {
              wipeTempSavedPin().then(() => generateAndSave(pin));
              navigate("/walletPage");
            } else if (error?.message?.includes(ERROR_IDS.INCORRECT_PIN)) {
              setErr("PIN code is not match. Please try again.");
            } else {
              console.log(error);
            }
          }
        }
      } catch (error: any) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [navigate, userInfo]);

  const completedPin = (e: any) => {
    setActiveBtn(false);
    setErr("");
  };

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
        <Stack align="center" justifyContent="center">
          <Box alignItems="center" pt="30">
            <Box align="center" pt="10">
              <Text p="2" fontSize="2xl" fontWeight="semibold" color="#313131">
                Enter PIN to continue
              </Text>
              <Text p="2" fontSize="md" color="#403F49">
                Please enter PIN to contine
              </Text>
              <Stack pt="5">
                <HPasswordInput
                  label="Enter Access PIN"
                  onChange={setPin}
                  onComplete={completedPin}
                  labelAlign="center"
                />
              </Stack>
            </Box>
            <Flex
              direction="column"
              alignItems="center"
              mt="10"
              mb="40"
              justifyContent="center"
            >
              <Button
                bgColor="#403F49"
                color="#EEEEEE"
                width="80%"
                p="3"
                isDisabled={activeBtn}
                onClick={checkPin}
              >
                Continue
              </Button>
            </Flex>
          </Box>
          {err || error ? (
            <MessageBox variant="danger">{error || err}</MessageBox>
          ) : null}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
