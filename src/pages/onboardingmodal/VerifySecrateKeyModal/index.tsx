import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Box, Text, Flex, Button, Stack, IconButton } from "@chakra-ui/react";

import { VerticalLabels } from "../VerticalLabels";

import { useNavigate } from "react-router-dom";

import { useLogin, useWallet } from "components/contexts";
import HLoading from "components/atoms/HLoading";
import { getUniqueRandomNumbersArray, splitArrayIntoHalf } from "utils/util";

import { AiOutlineCloseCircle } from "react-icons/ai";

import { KeyPhraseItem } from "pages/onboarding/KeyConfirm/components/KeyPhraseItem";
import MessageBox from "components/atoms/MessageBox";

const hiddenKeyPhrasesKeys = getUniqueRandomNumbersArray(3, 11);

export function VerifySecrateKeyModal(props: any) {
  const { mnemonics, isLoading } = useWallet();
  const navigate = useNavigate();
  const { setSeedPhraseSaved } = useLogin();
  const [mnemonicsArray, setMnemonicsArray] = useState<string[]>([]);
  const [error, setErr] = useState("");
  const [hiddenPhrasesValues, setHiddenPhrasesValues] = useState(
    hiddenKeyPhrasesKeys.reduce<Record<string, string>>(
      (acc, hiddenWordIndex) => ({ ...acc, [hiddenWordIndex]: "" }),
      {}
    )
  );

  useEffect(() => {
    if (mnemonics) {
      setMnemonicsArray(mnemonics.split(" "));
    }
  }, [mnemonics]);

  const phrasesPairsMatches = useCallback(() => {
    const withMatchedPhrases = mnemonicsArray.map((mnemonic, index) => {
      if (hiddenKeyPhrasesKeys.includes(index)) {
        return hiddenPhrasesValues[index];
      }
      return mnemonic;
    });

    return withMatchedPhrases.join(" ") === mnemonics;
  }, [mnemonicsArray, mnemonics, hiddenPhrasesValues]);

  const onConfirm = async () => {
    if (phrasesPairsMatches()) {
      setSeedPhraseSaved();
      window.alert("Key Phrase Saved");
      navigate("/");
    } else {
      setErr("Please input matched characters");
    }
  };

  const { firstHalf: leftRowMnemonics, secondHalf: rightRowMnemonics } =
    useMemo(() => splitArrayIntoHalf(mnemonicsArray), [mnemonicsArray]);

  const renderKeyPhrase = (keyword: string, index: number) => {
    const isInput = hiddenKeyPhrasesKeys.includes(index);
    const inputValue = hiddenPhrasesValues[index];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setHiddenPhrasesValues({
        ...hiddenPhrasesValues,
        [index]: e.target.value,
      });

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
        <Box bgColor="#FFFFFF">
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
                Please confirm your Secret Recovery Phase to continue to wallet
              </Text>
              {isLoading && <HLoading loading={isLoading} />}
              {error !== "" && (
                <MessageBox variant="danger">{error}</MessageBox>
              )}
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
                  p="3"
                  onClick={onConfirm}
                >
                  Continue
                </Button>
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Modal.Body>
    </Modal>
  );
}
