import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Box, Text, Flex, Button, Stack, IconButton } from "@chakra-ui/react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { VerticalLabels } from "../VerticalLabels";
import { useWallet } from "components/contexts";
import HLoading from "components/atoms/HLoading";

export function ViewSecrateKeyModal(props: any) {
  const navigate = useNavigate();
  const { isLoading } = useWallet();

  return (
    <div>
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
                This is your Secret Recovery Phrase. Write down on a paper and
                keep it in secure place. You’ll be asked to re enter this Phrase
                on the next step.
              </Text>
              <Box
                bgColor="#D9D9D9"
                alignItems="center"
                justifyContent="center"
                mt="10"
              >
                {isLoading && <HLoading loading={isLoading} />}
                <Flex align="center" direction="column">
                  <Text mt="5" fontSize="18px">
                    Tap to reveal your Secret Recovery Phrase
                  </Text>
                  <Text mt="5" fontSize="18px">
                    Make sure no one is watching you
                  </Text>
                  <Button
                    bgColor="#403F49"
                    color="#EEEEEE"
                    width=""
                    mt="5"
                    mb="10"
                    onClick={() => navigate("/key-phrase-save")}
                  >
                    View
                  </Button>
                </Flex>
              </Box>
              <Flex align="center" justifyContent="center">
                <Button
                  bgColor="#403F49"
                  color="#EEEEEE"
                  width="40"
                  mt="5"
                  mb=""
                  onClick={() => navigate("/key-confirm")}
                >
                  Continue
                </Button>
              </Flex>
            </Box>
          </Stack>
        </Modal.Body>
      </Modal>
    </div>
  );
}
