import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Stack,
  Text,
  Button,
  IconButton,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
// IoIosCloseCircleOutline
// import {IoIosCloseCircleOutline }from "react-icons/io"
import emailImage from "../../../assets/emailImg.jpg";

import { Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import mylogo from "../../../assets/mylogo.png";
import logo from "../../../assets/logo.png";
import name from "../../../assets/name.png";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { signout, signup } from "../../../Actions/userActions";

export function ReSendEmailModal(props: any) {
  const dispatch = useDispatch<any>();
  const userSignup = useSelector((state: any) => state.userSignup);
  const { userInfo, loading, error } = userSignup;

  const redirect = props?.location?.search.split("=")[1]
    ? props?.location?.search.split("=")[1]
    : "/welcome";

  const submitHandler = async (e: any) => {
    e.preventDefault();
    dispatch(signup(props.name, props.email, ""));
  };

  useEffect(() => {
    if (userInfo) {
      props?.history?.push(redirect);
    }

    dispatch(signout());
  }, [dispatch, props?.history, redirect, userInfo]);

  return (
    <Modal
      {...props}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <Box bg="#ffffff">
          <SimpleGrid columns={[1, 2]} gap="0">
            <Stack width="80%" bgColor="rgba(244, 86, 0, 0.3)">
              {/* backgroundImage={rectangle} backgroundPosition="center" backgroundRepeat="no-repeat" */}

              <Flex direction="row" margin="5">
                <Image src={logo} height="46px" width="46px" />
                <Image
                  src={name}
                  height="27px"
                  width="100px"
                  marginLeft="5"
                  marginTop="4"
                />
              </Flex>
              <Text
                p="3"
                marginLeft="20"
                align="left"
                fontWeight="600"
                fontSize="16.33px"
                height="90px"
                width="250px"
                color="#141414"
              >
                We are exited to offer free ads for first 100 brands
              </Text>
              <Stack rounded="lg" bg="#ffffff" mt="10">
                <Image
                  src={mylogo}
                  width="350px"
                  bgColor="rgba(244, 86, 0, 0.3)"
                />
              </Stack>
            </Stack>
            <Stack width="100%" bg="#ffffff">
              <Stack align="end" justifyContent="flex-end" mt="0">
                <IconButton
                  bg="none"
                  icon={
                    <AiOutlineCloseCircle
                      size="40px"
                      color="black"
                      onClick={props.onHide}
                    />
                  }
                  aria-label="Close"
                />
              </Stack>
              <Stack pr="10">
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
                  To confirm your email address, tap the verify button in the
                  email we sent to abc@xyz.com
                </Text>
                <Stack p="1" pt="2" align="center" mt="2">
                  <Button
                    width="50%"
                    //   bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                    bgColor="#D7380E"
                    size="md"
                    type="submit"
                    onClick={submitHandler}
                  >
                    Resend Email
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Box>
      </Modal.Body>
    </Modal>
  );
}