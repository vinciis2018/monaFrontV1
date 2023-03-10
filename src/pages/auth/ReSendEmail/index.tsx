import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Image,
  Stack,
  Text,
  Button,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import emailImage from "../../../assets/emailImg.jpg";

import { AiOutlineCloseCircle } from "react-icons/ai";
import mylogo from "../../../assets/mylogo.png";
import logo from "../../../assets/logo.png";
import name from "../../../assets/name.png";
import { signout } from "../../../Actions/userActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

export function ReSendEmail(props: any) {
  const userSignup = useSelector((state: any) => state.userSignup);
  const { userInfo, loading, error } = userSignup;

  const dispatch = useDispatch<any>();
  const submitHandler = async (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(signout());
  }, [dispatch, props?.history, userInfo]);

  return (
    <Box p="10%" pl="25%" width="100%">
      <Flex direction="row" columns={[1, 2]}>
        <Box
          direction="column"
          bgColor="rgba(244, 88, 0, 0.3)"
          width="350px"
          p="0"
          justifyContent="space-between"
          marginTop="0"
        >
          <Box>
            <Flex direction="row" margin="5">
              <Image src={logo} height="46px" width="46px" />
              <Image
                src={name}
                height="33px"
                width="100px"
                marginLeft="5"
                marginTop="3"
              />
            </Flex>
            <Text
              ml="10"
              mr="10"
              align="left"
              fontWeight="600"
              fontSize="15.33px"
              height="90px"
              width="250px"
              color="#141414"
            >
              We are exited to offer free ads for first 100 brands
            </Text>
          </Box>

          <Box rounded="lg" bg="#ffffff" mt="5">
            <Image src={mylogo} width="350px" bgColor="rgba(244, 88, 0, 0.3)" />
          </Box>
        </Box>
        <Box width="50%">
          <Box align="end" mt="5">
            <IconButton
              bg="none"
              icon={
                <AiOutlineCloseCircle
                  size="40px"
                  fontWeight="10"
                  color="black"
                />
              }
              aria-label="Close"
            />
          </Box>
          <Box p="20" pt="0" bg="#ffffff">
            <Text
              fontSize="20"
              textAlign="left"
              fontWeight="600"
              color="#333333"
            >
              Verify Your Email
            </Text>
            <Text
              p="2"
              fontSize="13"
              textAlign="left"
              fontWeight="10"
              color="#4A4A4A"
            >
              You will need to verify your emaill to complete registration
            </Text>
            {loading && <HLoading loading={loading} />}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <Box align="center" justifyContent="center" p="2">
              <Image src={emailImage} height="60%" width="60%" />
            </Box>
            <Text
              p="2"
              fontSize="13"
              textAlign="left"
              fontWeight="10"
              color="#4A4A4A"
            >
              To confirm your email address, tap the verify button in the email
              we sent to your email
            </Text>
            <Stack p="1" pt="2" align="center" mt="2">
              <Button
                width="50%"
                bgColor="#D7380E"
                size="md"
                type="submit"
                onClick={submitHandler}
              >
                {/* Resend Email */}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
