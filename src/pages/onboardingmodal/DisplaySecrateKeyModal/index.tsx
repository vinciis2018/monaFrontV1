import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Box, Text, Flex, Button, Stack, IconButton } from "@chakra-ui/react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { VerticalLabels } from "../VerticalLabels";

import { splitArrayIntoHalf } from "utils/util";
import { KeyPhraseItem } from "pages/onboarding/KeyConfirm/components/KeyPhraseItem";
import MessageBox from "components/atoms/MessageBox";

import { useNavigate } from "react-router-dom";
import { useWallet } from "components/contexts";
import HLoading from "components/atoms/HLoading";

export function DisplaySecrateKeyModal(props: any) {
  const navigate = useNavigate();
  const { mnemonics, isLoading } = useWallet();

  const [mnemonicsArray, setMnemonicsArray] = useState<string[]>([]);
  const [error, setErr] = useState("");

  useEffect(() => {
    const mnemonic =
      "blossom race card chaos box always eye cluster hazard throw there involve";

    if (mnemonics) {
      setMnemonicsArray(mnemonics.split(" "));
    }
    // else {
    //   setMnemonicsArray(mnemonic.split(" "));
    // }
  }, [mnemonics]);

  const onConfirm = async () => {};

  const { firstHalf: leftRowMnemonics, secondHalf: rightRowMnemonics } =
    useMemo(() => splitArrayIntoHalf(mnemonicsArray), [mnemonicsArray]);

  const renderKeyPhrase = (keyword: string, index: number) => {
    const isInput = false;
    const inputValue = "";
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      console.log(e.target.value);
    return (
      <KeyPhraseItem
        key={keyword}
        keyword={keyword}
        isInput={isInput}
        label={`${index + 1}`}
        inputValue={inputValue}
        onInputChange={handleInputChange}
      />
    );
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
        <VerticalLabels />
        <Stack align="center" justifyContent="center" px="">
          <Box align="center" justifyContent="center" marginBottom="" p="15">
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
            {isLoading && <HLoading loading={isLoading} />}
            {error !== "" && <MessageBox variant="danger">{error}</MessageBox>}

            <Box
              bgColor="#3C3C3C"
              alignItems="center"
              color="#EFEFEF"
              justifyContent="center"
              mt="10"
              width="80%"
              borderRadius="8px"
              fontSize="14px"
            >
              <Flex direction="row" justifyContent="space-between" p="10">
                <Box flex={1}>
                  {leftRowMnemonics.map((keyword, index) => {
                    return renderKeyPhrase(keyword, index);
                  })}
                </Box>
                <Box flex={1}>
                  {rightRowMnemonics.map((keyword, index) => {
                    // moving 6 positions, as this is second half of the array
                    index = index + 6;
                    return renderKeyPhrase(keyword, index);
                  })}
                </Box>
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
  );
}
