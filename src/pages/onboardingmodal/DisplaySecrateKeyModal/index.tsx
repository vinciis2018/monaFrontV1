import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Box, Text, Flex, Button, Stack, IconButton } from "@chakra-ui/react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { VerticalLabels } from "../VerticalLabels";
import { useWallet } from "components/contexts";

export function DisplaySecrateKeyModal(props: any) {
  const { mnemonics, isLoading } = useWallet();
  console.log(mnemonics);

  const [key, setKey] = useState<any>([]);

  useEffect(() => {
    const mnemonic =
      "blossom race card chaos box always eye cluster hazard throw there involve";
    if (mnemonics) {
      setKey(mnemonics.split(" "));
      console.log("mnemonics", mnemonics);
    } else {
      setKey(mnemonic.split(" "));
      console.log("mnemonic display secrate key", mnemonic);
    }
  }, []);
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
              bgColor="#3C3C3C"
              alignItems="center"
              color="#EFEFEF"
              justifyContent="center"
              mt="10"
            >
              <Flex direction="row" justifyContent="space-between" p="10">
                <Flex
                  align="flex-start"
                  direction="column"
                  justifyContent="space-between"
                >
                  {key.map((eachKey: string, index: number) => {
                    if (index <= 3) {
                      return (
                        <Text key={index + 1}>
                          {index + 1}. {eachKey}
                        </Text>
                      );
                    }
                  })}
                </Flex>
                <Flex
                  align="flex-start"
                  direction="column"
                  justifyContent="space-between"
                >
                  {key.map((eachKey: string, index: number) => {
                    if (index > 3 && index <= 7) {
                      return (
                        <Text key={index + 1}>
                          {index + 1}. {eachKey}
                        </Text>
                      );
                    }
                  })}
                </Flex>
                <Flex
                  align="flex-start"
                  direction="column"
                  justifyContent="space-between"
                >
                  {key.map((eachKey: string, index: number) => {
                    if (index > 7 && index < 12) {
                      return (
                        <Text key={index + 1}>
                          {index + 1}. {eachKey}
                        </Text>
                      );
                    }
                  })}
                </Flex>
              </Flex>
            </Box>
            <Flex align="center" justifyContent="center">
              <Button
                bgColor="#403F49"
                color="#EEEEEE"
                width="40"
                mt="5"
                mb=""
                onClick={props.onContinue}
              >
                Continue
              </Button>
            </Flex>
          </Box>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
