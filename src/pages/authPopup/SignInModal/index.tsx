import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Button,
  IconButton,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Checkbox,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Modal } from "react-bootstrap";

import {
  AiOutlineCloseCircle,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import mylogo from "../../../assets/mylogo.png";
import logo from "../../../assets/logo.png";
import name from "../../../assets/name.png";
import { signin } from "../../../Actions/userActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { EmailVerificationModal } from "pages";
import { EmailVerificationForForgetPassword } from "pages/auth/EmailVerificationForForgetPassword";

export function SignInModal(props: any) {
  const [emailVerificationShow, setEmailVerificationShow] =
    useState<any>(false);
  const [
    emailVerificationForForgetPassword,
    setEmailVerificationForForgetPassword,
  ] = useState<any>(false);
  const navigate = useNavigate();
  const btnRef = React.useRef(null);
  const clientId =
    "829203424949-dkctdksnijr38djuoa2mm3i7m1b979ih.apps.googleusercontent.com";

  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [showPassword, setShowPassword] = useState<any>(false);
  const [emailErrorStatus, setEmailErrorStatus] = useState<any>(false);
  const [emailError, setEmailError] = useState<any>("");
  const [passwordError, setPasswordError] = useState<any>("");
  const [passwordErrorStatus, setPasswordErrorStatus] = useState<any>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch<any>();

  const redirect = props?.location?.search
    ? props?.location?.search.split("=")[1]
    : "/";

  const handleShowPassword = () => setShowPassword(!showPassword);

  function validateEmail(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    setEmailErrorStatus(true);
    setEmailError("Please enter valid email");
    return false;
  }
  function validatePassword(pass: string) {
    if (pass.length === 0) {
      setPasswordError("Please enter password");
      setPasswordErrorStatus(true);
      return false;
    }
    return true;
  }
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, [props?.history, redirect, userInfo, navigate, error]);

  const onSuccess = async (res: any) => {
    setEmail(res.profileObj.email);
  };
  const onFailure = (err: any) => {};
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      dispatch(signin(email, password));
      props.onHide();
      navigate("/");
    }
  };
  const handleSignInModal = () => {
    props.onHide();
    navigate("/signup");
  };
  const handleForgetPasswordModal = () => {
    props.onHide();
    navigate("/forgetPassword");
  };

  return (
    <>
      {emailVerificationShow && (
        <EmailVerificationModal
          show={emailVerificationShow}
          onHide={() => setEmailVerificationShow(false)}
        />
      )}
      {emailVerificationForForgetPassword && (
        <EmailVerificationForForgetPassword
          show={emailVerificationForForgetPassword}
          onHide={() => setEmailVerificationForForgetPassword(false)}
        />
      )}
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
                  fontSize="lg"
                  width="80%"
                  color="#141414"
                >
                  We are exited to offer free ads for first 100 brands
                </Text>
                <Stack>
                  <Image
                    src={mylogo}
                    width="100%"
                    // bgColor="rgba(244, 86, 0, 0.3)"
                    pt={{ base: "60", lg: "20" }}
                  />
                </Stack>
              </Stack>
              <Stack>
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
                    Sign in to see our top picks for you!
                  </Text>
                  <Text
                    fontSize="xs"
                    textAlign="left"
                    fontWeight="10"
                    color="#4A4A4A"
                  >
                    For security, please sign in to access your information
                  </Text>
                  {loading && <HLoading loading={loading} />}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                  <FormControl id="email" pt="3" isInvalid={emailErrorStatus}>
                    <FormLabel fontSize="sm">Enter email</FormLabel>
                    <Stack direction="column" align="left">
                      <Input
                        id="email"
                        onChange={(e) => setEmail(e?.target?.value)}
                        placeholder="rodrigo@flight.co.uk"
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
                  <FormControl
                    id="password"
                    mt="3"
                    isInvalid={passwordErrorStatus}
                  >
                    <FormLabel fontSize="sm">Enter password</FormLabel>
                    <Stack direction="column">
                      <Stack direction="row" align="center">
                        <InputGroup size="md">
                          <Input
                            id="password"
                            onChange={(e) => setPassword(e?.target?.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="At least 6 characters"
                            value={password}
                            required
                            py="3"
                          />
                          <InputRightElement width="4.5rem" p="3">
                            {showPassword ? (
                              <IconButton
                                bg="none"
                                onClick={handleShowPassword}
                                icon={
                                  <AiOutlineEye size="25px" color="black" />
                                }
                                aria-label="Close"
                              />
                            ) : (
                              <IconButton
                                bg="none"
                                onClick={handleShowPassword}
                                icon={
                                  <AiOutlineEyeInvisible
                                    size="20px"
                                    color="black"
                                  />
                                }
                                aria-label="Close"
                              />
                            )}
                          </InputRightElement>
                        </InputGroup>
                      </Stack>
                      {!passwordError ? (
                        <FormHelperText></FormHelperText>
                      ) : (
                        <FormErrorMessage>{passwordError}</FormErrorMessage>
                      )}
                    </Stack>
                  </FormControl>
                  <Stack direction="row" align="center" mt="2">
                    <Checkbox defaultChecked size="sm">
                      Remember me
                    </Checkbox>
                  </Stack>
                  <Stack align="center">
                    <Button
                      py="3"
                      width="100%"
                      bgColor="#D7380E"
                      color="#ffff"
                      size="md"
                      type="submit"
                      onClick={submitHandler}
                    >
                      Login
                    </Button>
                    <Text
                      fontSize="sm"
                      type="button"
                      color="#333333"
                      onClick={handleForgetPasswordModal}
                      ref={btnRef}
                    >
                      Forget password ?
                    </Text>
                  </Stack>
                  <Text p="2" textAlign="center" fontSize="sm" width="100%">
                    ---------------------- or sign in with ---------------------
                  </Text>
                  <Stack
                    direction="row"
                    align="center"
                    justifyContent="center"
                    pt="3"
                  >
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="Login with Google"
                      render={(renderProps) => (
                        <Box
                          width="100%"
                          border="1px solid #000050"
                          borderRadius="md"
                          onClick={renderProps.onClick}
                          align="center"
                          py="3"
                          fontSize="md"
                          color="#333333"
                          bgColor="#FFFFFF"
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
                  <Stack>
                    <Button
                      py="3"
                      width="100%"
                      bgColor="#FFFFFF"
                      color="#333333"
                      type="submit"
                      fontSize="md"
                      onClick={handleSignInModal}
                      border="1px"
                    >
                      Create a new account
                    </Button>
                  </Stack>
                  <Text fontSize="xs" textAlign="left" mt="4" pb="10">
                    By signing in, I agree to Monad’s Terms of Use and Privacy
                    Policy.
                  </Text>
                </Stack>
              </Stack>
            </SimpleGrid>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
}
