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
  SimpleGrid,
} from "@chakra-ui/react";
import emailImage from "../../../assets/email.png";
import { Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import mylogo from "../../../assets/mylogo.png";
import logo from "../../../assets/logo.png";
import name from "../../../assets/name.png";
import HLoading from "components/atoms/HLoading";
import { signout, signup } from "../../../Actions/userActions";

export function ReSendEmailModal(props: any) {
  const dispatch = useDispatch<any>();
  const userSignup = useSelector((state: any) => state.userSignup);
  const { userInfo, loading, error } = userSignup;

  const redirect = props?.location?.search.split("=")[1]
    ? props?.location?.search.split("=")[1]
    : "/";

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
      <Modal.Body className="popup">
        <Box bgColor="#FFFFFF">
          <SimpleGrid columns={[1, 2]} gap="0">
            <Stack width="90%" bgColor="rgba(244, 86, 0, 0.3)">
              {/* backgroundImage={rectangle} backgroundPosition="center" backgroundRepeat="no-repeat" */}

              <Flex align="center" m="5">
                <Image src={logo} height="" width="15%" />
                <Image
                  src={name}
                  height=""
                  width="40%"
                  marginLeft="5"
                  marginTop="4"
                />
              </Flex>
              <Text
                p="5"
                align="left"
                fontWeight="600"
                fontSize="md"
                width="80%"
                color="#141414"
              >
                We are exited to offer free ads for first 100 brands
              </Text>
              <Stack rounded="lg" justifyContent="flex-end">
                <Image
                  src={mylogo}
                  pt={{ base: "60", lg: "20" }}
                  width="100%"
                />
              </Stack>
            </Stack>
            <Stack width="100%">
              <Stack p="2" align="end" justifyContent="flex-end" mt="0">
                <IconButton
                  bg="none"
                  icon={
                    <AiOutlineCloseCircle
                      size="30px"
                      color="gray"
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
                  fontSize="13"
                  textAlign="left"
                  fontWeight="10"
                  color="#4A4A4A"
                >
                  You will need to verify your emaill to complete registration
                </Text>
                {loading && <HLoading loading={loading} />}
                <Box align="center" justifyContent="center">
                  <Image
                    src={emailImage}
                    height="80%"
                    width="70%"
                    pt={{ base: "10", lg: "5" }}
                  />
                </Box>
                <Text
                  fontSize="13"
                  textAlign="left"
                  fontWeight="10"
                  color="#4A4A4A"
                >
                  To confirm your email address, tap the verify button in the
                  email we sent to your email
                </Text>
                <Stack pt="2" align="center" pb="2">
                  <Button
                    py="3"
                    width="100%"
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
