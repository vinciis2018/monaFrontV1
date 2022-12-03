import React from "react";
import { Modal } from "react-bootstrap";
import { Box, Text, Button, Stack, IconButton } from "@chakra-ui/react";
import "./style.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useWallet } from "components/contexts";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";

export function WelcomeModal(props: any) {
  const navigate = useNavigate();

  const { hasEncryptedData } = useWallet();

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  useEffect(() => {
    hasEncryptedData().then((hasData) => {
      console.log(hasData);
      if (hasData) {
        navigate("/login");
      }
      if (!userInfo) {
        //navigate("/signin");
      }
    });
  }, [hasEncryptedData, navigate, userInfo]);

  const onClick = () => {
    navigate("/pin-create");
  };
  return (
    <div>
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
          <Stack align="center" justifyContent="center">
            {loading && <HLoading loading={loading} />}
            {error && <MessageBox>{error}</MessageBox>}
            <Box alignItems="center" justifyContent="center" marginBottom="100">
              <Text
                color="#000000"
                fontSize="36px"
                fontStyle="semiBold"
                align="center"
                justifyContent="center"
                fontWeight="bold"
              >
                Wallet setup
              </Text>
              <Text
                color="#6C6C6C"
                fontSize="20px"
                align="center"
                justifyContent="center"
                fontStyle="regular"
              >
                Import a existing wallet or create a new wallet
              </Text>
            </Box>
            <Box alignItems="center" justifyContent="center" marginBottom="100">
              <Text
                color="#403F49"
                fontSize="20px"
                fontStyle="semiBold"
                align="center"
                justifyContent="center"
              >
                Import using secret recovery phrase
              </Text>
              <Button
                bgColor="#403F49"
                color="#EEEEEE"
                marginTop="3"
                width="100%"
                marginBottom="176"
                onClick={(e) => props.onClick(e)}
              >
                Create a new wallet
              </Button>
            </Box>
          </Stack>
        </Modal.Body>
      </Modal>
    </div>
  );
}
