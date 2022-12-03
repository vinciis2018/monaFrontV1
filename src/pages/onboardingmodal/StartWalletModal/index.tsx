import React from "react";
import { Modal } from "react-bootstrap";
import { Box, Text, Flex, Button, Stack, IconButton } from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { VerticalLabels } from "../VerticalLabels";

export function StartWalletModal(props: any) {
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
                onClick={props.onClick}
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
