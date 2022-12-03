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
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import mylogo from "../../../assets/mylogo.png";
import logo from "../../../assets/logo.png";
import name from "../../../assets/name.png";
import { signout, signup } from "../../../Actions/userActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
// import { ReSendEmailModal } from "../ResendEmailModal";

export function EmailVerificationModal(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const userSignup = useSelector((state: any) => state.userSignup);
  const { userInfo, loading, error } = userSignup;
  // const [resendEmailModalShoe, setResendEmailModalShoe] = useState<any>(false);

  const [email, setEmail] = useState("");
  const [userName, setName] = useState("abc");
  const clientId =
    "829203424949-dkctdksnijr38djuoa2mm3i7m1b979ih.apps.googleusercontent.com";

  const redirect = props?.location?.search.split("=")[1]
    ? props?.location?.search.split("=")[1]
    : "/welcome";

  const submitHandler = async (e: any) => {
    e.preventDefault();
    dispatch(signup(userName, email, ""));
    // setResendEmailModalShoe(true);

    // navigate("/welcome");
  };

  const onSuccess = async (res: any) => {
    setEmail(res.profileObj.email);
    setName(res.profileObj.name);
  };
  const onFailure = (err: any) => {
    console.log("failed:", err);
    alert(err);
  };
  const handleAllReadyAccount = () => {
    console.log("handleAllReadyAccount");
  };

  useEffect(() => {
    if (userInfo) {
      props?.history?.push(redirect);
    }
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);

    dispatch(signout());
  }, [dispatch, props?.history, redirect, userInfo]);

  return (
    <Box>   
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
              <Stack width="100%" bg="#ffffff" pr="10">
                <Stack align="end" justifyContent="flex-end" mt="3">
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
                <Text
                  mt="0"
                  fontSize="20"
                  textAlign="left"
                  fontWeight="600"
                  color="#333333"
                >
                  Create your account and start building your brand!
                </Text>
                {loading && <HLoading loading={loading} />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <FormControl id="email" mt="10">
                  <FormLabel fontSize="s" mt="2">
                    Enter Email
                  </FormLabel>

                  <Stack direction="row" align="center">
                    <Input
                      id="email"
                      onChange={(e) => setEmail(e?.target?.value)}
                      placeholder="rrrrrrrrr@gmail.com"
                      value={email}
                      required
                      type="email"
                    />
                  </Stack>
                </FormControl>

                <Stack align="center" mt="2">
                  <Button
                    width="100%"
                    //   bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                    bgColor="#D7380E"
                    color="#FFFFFF"
                    size="md"
                    type="submit"
                    onClick={submitHandler}
                  >
                    Verify email
                  </Button>
                </Stack>
                <Stack p="2" textAlign="center" width="100%" mt="2">
                  <Text width="100%">
                    --------------- or continue with -------------
                  </Text>
                </Stack>
                <Stack
                  direction="row"
                  align="center"
                  justifyContent="center"
                  mt="2"
                >
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Log In with Google"
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
                <Stack mt="5">
                  <Button
                    width="100%"
                    variant="outline"
                    fontSize="14"
                    fontWeight="1"
                    type="submit"
                    onClick={handleAllReadyAccount}
                  >
                    Already have an account ? Sign in
                  </Button>
                </Stack>
                <Text fontSize="10" textAlign="left" mt="30">
                  By signing in, I agree to Monad’s Terms of Use and Privacy
                  Policy.
                </Text>
              </Stack>
            </SimpleGrid>
          </Box>
        </Modal.Body>
      </Modal>
    </Box>
  );
}
