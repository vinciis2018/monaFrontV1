import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Box, Text, Flex, Button, Stack, IconButton } from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { VerticalLabels } from "../VerticalLabels";
import { useSelector } from "react-redux";
// hooks
import { useWallet, useLogin } from "components/contexts";
import HPasswordInput from "components/atoms/HPasswordInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ERROR_IDS } from "utils/constants";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

export function LoginModal(props: any) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useLogin();
  const [err, setErr] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);
  // const [pinFocus, setPinFocus] = useState(true);
  const [pin, setPin] = useState("");
  const target = searchParams.get("target");

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const {
    unlock,
    checkAndTriggerSelfDestruct,
    generateAndSave,
    wipeTempSavedPin,
  } = useWallet();

  const onClick = () => {
    checkPin(pin);
    console.log("Pin is correct");
    props.onClick();
  };

  const checkPin = (pincode: string) => {
    if (pincode !== "") {
      checkAndTriggerSelfDestruct(pincode).then((cleared) => {
        // console.log(cleared);
        if (cleared) {
          // TODO: On Self Destruct App should be populated with safe content
          navigate("/");
        } else {
          unlock(pincode)
            .then(async () => {
              const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
              await login(expired);
              if (target) {
                navigate("/" + target);
              } else {
                navigate("/setting");
              }
            })
            .catch((error: Error) => {
              if (error.message.includes(ERROR_IDS.NO_CONTENT)) {
                wipeTempSavedPin().then(() => generateAndSave(pin));
                navigate("/");
              }

              if (error.message.includes(ERROR_IDS.INCORRECT_PIN)) {
                setErr("PIN code is not match. Please try again.");
                setPin("");
              }
            });
        }
      });
    } else {
      setErr("Please input PIN.");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      //navigate("/signin");
    }
  }, [navigate, userInfo]);

  // const activeFocusArea = () => {
  //   setPinFocus(true);
  // };

  const completedPin = (value: string) => {
    setActiveBtn(true);
    checkPin(value);
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
          {loading ? (
            <HLoading loading={loading} />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : null}
          <Box alignItems="center" mt="30">
            <Box alignItems="center" mt="10">
              <Text textAlign="left" fontSize="xs" fontWeight="600">
                Enter PIN
              </Text>
              <HPasswordInput
                label="Enter Access PIN"
                onChange={setPin}
                onComplete={completedPin}
                labelAlign="center"
              />
            </Box>
            <Flex
              direction="column"
              alignItems="center"
              mt="10"
              mb="40"
              justifyContent="center"
            >
              <Button bgColor="#403F49" color="#EEEEEE" width="40" mt="3">
                Continue
              </Button>
            </Flex>
          </Box>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
