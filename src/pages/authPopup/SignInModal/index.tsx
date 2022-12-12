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

export function SignInModal(props: any) {
  const [emailVerificationShow, setEmailVerificationShow] =
    useState<any>(false);
  const navigate = useNavigate();
  const btnRef = React.useRef(null);
  const clientId =
    "829203424949-dkctdksnijr38djuoa2mm3i7m1b979ih.apps.googleusercontent.com";

  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [showPassword, setShowPassword] = useState<any>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [emailErrorStatus, setEmailErrorStatus] = useState<any>(false);
  const [emailError, setEmailError] = useState<any>("");
  const [passwordErrorStatus, setPasswordErrorStatus] = useState<any>(false);
  const [passwordError, setPasswordError] = useState<any>("");

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch<any>();

  const redirect = props?.location?.search
    ? props?.location?.search.split("=")[1]
    : "/";
  function validateEmail(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);

    if (userInfo) {
      if (userInfo.defaultWallet) {
        navigate(redirect);
      } else {
        navigate("/welcome");
      }
    }
  }, [props?.history, redirect, userInfo, navigate, error]);

  const onSuccess = async (res: any) => {
    setEmail(res.profileObj.email);
  };
  const onFailure = (err: any) => {
    console.log("failed:", err);
    alert(`onFailure:  ${err}`);
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log("signin called");
    if (validateEmail(email)) {
      dispatch(signin(email, password));
      props.onHide();
    } else {
      setEmailErrorStatus(true);
      setEmailError("Please enter valid email");
    }
  };
  const handleSignInModal = () => {
    props.onHide();
    navigate("/signup");
  };

  return (
    <Box>
      <EmailVerificationModal
        show={emailVerificationShow}
        onHide={() => setEmailVerificationShow(false)}
      />
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
                  pl="3"
                  pt="7"
                  ml="20"
                  align="left"
                  fontWeight="600"
                  fontSize="16.33px"
                  height="90px"
                  width="250px"
                  color="#141414"
                >
                  We are exited to offer free ads for first 100 brands
                </Text>
                <Stack rounded="lg" justifyContent="flex-end">
                  <Image
                    src={mylogo}
                    width="100%"
                    bgColor="rgba(244, 86, 0, 0.3)"
                    mt="20"
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
                    Sign in to see our top picks for you!
                  </Text>
                  <Text
                    fontSize="13"
                    textAlign="left"
                    fontWeight="10"
                    color="#4A4A4A"
                  >
                    For security, please sign in to access your information
                  </Text>
                  {loading && <HLoading loading={loading} />}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                  <FormControl id="email" mt="3" isInvalid={emailErrorStatus}>
                    <FormLabel fontSize="xs">Enter email</FormLabel>
                    <Stack direction="column" align="left">
                      <Input
                        id="email"
                        onChange={(e) => setEmail(e?.target?.value)}
                        placeholder="rrrrrrrr@gmail.com"
                        value={email}
                        required
                        type="email"
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
                    <FormLabel fontSize="xs">Password</FormLabel>
                    <Stack direction="column">
                      <Stack direction="row" align="center">
                        <InputGroup size="md">
                          <Input
                            id="password"
                            onChange={(e) => setPassword(e?.target?.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            required
                          />
                          <InputRightElement width="4.5rem">
                            {showPassword ? (
                              <IconButton
                                bg="none"
                                onClick={handleShowPassword}
                                icon={
                                  <AiOutlineEye size="20px" color="black" />
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
                      {!error ? (
                        <FormHelperText></FormHelperText>
                      ) : (
                        <FormErrorMessage>{error}</FormErrorMessage>
                      )}
                    </Stack>
                  </FormControl>
                  <Stack direction="row" align="center" mt="2">
                    <Checkbox defaultChecked size="sm">
                      Remember me
                    </Checkbox>
                  </Stack>
                  <Stack align="center" mt="2">
                    <Button
                      width="100%"
                      //   bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                      bgColor="#D7380E"
                      color="#ffff"
                      size="md"
                      type="submit"
                      onClick={submitHandler}
                    >
                      Login
                    </Button>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mt="2">
                    <Text
                      type="button"
                      onClick={handleSignInModal}
                      ref={btnRef}
                    >
                      Create account
                    </Text>
                    <Text>Forget password ?</Text>
                  </Stack>
                  <Stack textAlign="center" width="100%" mt="3">
                    <Text width="100%">
                      ---------------- or sign in with --------------
                    </Text>
                  </Stack>
                  <Stack
                    direction="row"
                    align="center"
                    justifyContent="center"
                    mt="3"
                  >
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="Login with Google"
                      render={(renderProps) => (
                        <Button
                          width="100%"
                          variant="outline"
                          fontSize="14"
                          fontWeight="1"
                          onClick={renderProps.onClick}
                        >
                          <IconButton
                            bg="none"
                            icon={<FcGoogle size="20px" color="black" />}
                            aria-label="Close"
                          />
                          Log In with Google
                        </Button>
                      )}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={true}
                    />
                  </Stack>
                  <Text fontSize="10" textAlign="left" mt="4" pb="10">
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
