import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  Box,
  Image,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Button,
  IconButton,
  Flex,
  SimpleGrid,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import mylogo from "../../../assets/mylogo.png";
import logo from "../../../assets/logo.png";
import name from "../../../assets/name.png";
import { signup, signout } from "../../../Actions/userActions";
import HLoading from "components/atoms/HLoading";
import { ReSendEmailModal } from "../ResendEmailModal";

export function EmailVerificationForForgetPasswordModal(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const userSignup = useSelector((state: any) => state.userSignup);
  const [resendEmailModalShow, setResendEmailModalShow] = useState<any>(false);
  const { userInfo, loading, error } = userSignup;
  const [email, setEmail] = useState<any>("");
  const [userName, setName] = useState<any>("");
  const [emailErrorStatus, setEmailErrorStatus] = useState<any>(false);
  const [emailError, setEmailError] = useState<any>("");

  function ValidateEmail(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (ValidateEmail(email)) {
      dispatch(signup(userName, email, ""));
      props.onHide();
      setResendEmailModalShow(true);
    } else {
      setEmailErrorStatus(true);
      setEmailError("Please enter valid email");
    }
  };

  const onSuccess = async (res: any) => {
    setEmail(res.profileObj.email);
    setName(res.profileObj.name);
  };
  const onFailure = (err: any) => {};

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
    dispatch(signout());
  }, [dispatch, props?.history, userInfo]);

  return (
    <Box>
      <ReSendEmailModal
        show={resendEmailModalShow}
        onHide={() => setResendEmailModalShow(false)}
        email={email}
        name={userName || email.split("@")[0]}
      />
      <Modal
        {...props}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="popup">
          <Box bgColor="#FFFFFF">
            <SimpleGrid columns={[1, 2]} gap="0">
              <Stack width="90%" bgColor="rgba(244, 86, 0, 0.3)">
                {/* backgroundImage={rectangle} backgroundPosition="center" backgroundRepeat="no-repeat" */}

                <Flex align="center" p="5">
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
                    width="100%"
                    // bgColor="rgba(244, 86, 0, 0.3)"
                    pt={{ base: "60", lg: "20" }}
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
                    fontSize="lg"
                    textAlign="left"
                    fontWeight="600"
                    color="#333333"
                  >
                    Forget password
                  </Text>
                  {loading && <HLoading loading={loading} />}
                  <FormControl id="email" mt="10" isInvalid={emailErrorStatus}>
                    <FormLabel fontSize="xs" mt="2">
                      Enter Email
                    </FormLabel>

                    <Stack direction="column" align="left">
                      <Input
                        id="email"
                        onChange={(e) => setEmail(e?.target?.value)}
                        placeholder="rrrrrrrr@gmail.com"
                        value={email}
                        required
                        type="email"
                        py="3"
                        rounded="md"
                      />
                      {!emailError ? (
                        <FormHelperText></FormHelperText>
                      ) : (
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                      )}
                    </Stack>
                  </FormControl>

                  <Stack align="center" mt="2">
                    <Button
                      py="3"
                      width="100%"
                      bgColor="#D7380E"
                      color="#FFFFFF"
                      size="md"
                      type="submit"
                      onClick={submitHandler}
                    >
                      Verify email
                    </Button>
                  </Stack>
                  <Text p="2" textAlign="center" fontSize="sm" width="100%">
                    --------------- or continue with -------------
                  </Text>
                  <Stack
                    direction="row"
                    align="center"
                    justifyContent="center"
                    mt="2"
                  >
                    <GoogleLogin
                      clientId={`${process.env.GOOGLE_CLIENT_ID}`}
                      buttonText="Log In with Google"
                      render={(renderProps) => (
                        <Box
                          width="100%"
                          border="1px solid #000050"
                          borderRadius="md"
                          onClick={renderProps.onClick}
                          align="center"
                          py="3"
                        >
                          <IconButton
                            bg="none"
                            icon={<FcGoogle size="20px" color="black" />}
                            aria-label="Close"
                          />
                          Log In with Google
                        </Box>
                      )}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={true}
                    />
                  </Stack>
                  <Stack pt="2">
                    <Button
                      py="3"
                      width="100%"
                      variant="outline"
                      fontSize={{ base: "xs", lg: "md" }}
                      fontWeight="1"
                      type="submit"
                      onClick={() => navigate("/signin")}
                    >
                      Already have an account ? Sign in
                    </Button>
                  </Stack>
                  <Text fontSize="xs" textAlign="left" mt="30">
                    By signing in, I agree to Monad’s Terms of Use and Privacy
                    Policy.
                  </Text>
                </Stack>
              </Stack>
            </SimpleGrid>
          </Box>
        </Modal.Body>
      </Modal>
    </Box>
  );
}
