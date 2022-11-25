import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";

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
import { EmailVerification } from "../EmailVerification";

export function Signup(props: any) {
  const navigate = useNavigate();
  const btnRef = React.useRef(null);
  const clientId =
    "829203424949-dkctdksnijr38djuoa2mm3i7m1b979ih.apps.googleusercontent.com";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [showPassword, setShowPassword] = useState<any>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const emailError = email === "";
  const passwordError = password === "";

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch<any>();

  const redirect = props?.location?.search.split("=")[1]
    ? props?.location?.search.split("=")[1]
    : "/welcome";

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
  }, [props?.history, redirect, userInfo, navigate]);

  const onSuccess = async (res: any) => {
    setEmail(res.profileObj.email);
  };
  const onFailure = (err: any) => {
    console.log("failed:", err);
    alert(`onFailure:  ${err}`);
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <Box p="4%" pl="25%" width="100%">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        scrollBehavior="inside"
        size="full"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box p="0">
              <ModalCloseButton />
            </Box>
          </ModalHeader>
          <ModalBody>
            <Box p="50" align="center" justifyContent="center">
              <EmailVerification />
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Flex direction="row" columns={[1, 2]}>
        <Box
          direction="column"
          bgColor="rgba(244, 88, 0, 0.3)"
          width="350px"
          p="0"
          height="550"
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
        <Box width="40%">
          <Box align="end" mt="5">
            <IconButton
              bg="none"
              icon={
                <AiOutlineCloseCircle
                  size="40px"
                  fontWeight="10"
                  color="black"
                  onClick={onClose}
                />
              }
              aria-label="Close"
            />
          </Box>
          <Box ml="20" bg="#ffffff">
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
            <FormControl id="email" mt="3" isInvalid={emailError}>
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
                  <FormErrorMessage>
                    Please include ‘@’ in your email.
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
            <FormControl id="password" mt="3" isInvalid={passwordError}>
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
                          icon={<AiOutlineEye size="20px" color="black" />}
                          aria-label="Close"
                        />
                      ) : (
                        <IconButton
                          bg="none"
                          onClick={handleShowPassword}
                          icon={
                            <AiOutlineEyeInvisible size="20px" color="black" />
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
                  <FormErrorMessage>
                    Please enter a valid password
                  </FormErrorMessage>
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
                size="md"
                type="submit"
                onClick={submitHandler}
              >
                Login
              </Button>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mt="2">
              <Text type="button" onClick={onOpen} ref={btnRef}>
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
            <Text fontSize="10" textAlign="left" mt="4">
              By signing in, I agree to Monad’s Terms of Use and Privacy Policy.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
