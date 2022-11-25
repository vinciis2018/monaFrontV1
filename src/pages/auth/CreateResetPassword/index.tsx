import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  FormControl,
  FormLabel,
  Input,
  // Center,
  Stack,
  // SimpleGrid,
  Text,
  Button,
  IconButton,
  Flex,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import mylogo from "../../../assets/mylogo.png";
import logo from "../../../assets/logo.png";
import name from "../../../assets/name.png";
import { signout, signup } from "../../../Actions/userActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

export function CreateResetPassword(props: any) {
  const navigate = useNavigate();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [showPassword, setShowPassword] = useState<any>(false);
  const [showConformPassword, setShowConformPassword] = useState<any>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConformPassword = () =>
    setShowConformPassword(!showConformPassword);

  const redirect = props?.location?.search.split("=")[1]
    ? props?.location?.search.split("=")[1]
    : "/welcome";

  const userSignup = useSelector((state: any) => state.userSignup);
  const { userInfo, loading, error } = userSignup;

  const dispatch = useDispatch<any>();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password donot match");
    } else {
      dispatch(signup("abc", email, password));
      alert("user created, please create a wallet to proceed");
      navigate("/welcome");
    }
  };

  useEffect(() => {
    if (userInfo) {
      props?.history?.push(redirect);
    }
    const url = window.location.pathname;
    const email = url.split("/");
    console.log("email : ", email[2]);
    setEmail(email[2]);
    dispatch(signout());
  }, [dispatch, props?.history, redirect, userInfo]);

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
                height="27px"
                width="100px"
                marginLeft="5"
                marginTop="4"
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
          <Box p="20" pt="0" bg="#ffffff">
            <Text
              p="0"
              fontSize="20"
              textAlign="left"
              fontWeight="600"
              color="#333333"
            >
              Create new password
            </Text>
            <Text
              p="2"
              fontSize="13"
              textAlign="left"
              fontWeight="10"
              color="#333333"
            >
              Passwords must be atleast 6 characters long and can't be things
              like "password", "123456" or "abcdef"
            </Text>
            {loading && <HLoading loading={loading} />}
            {error && <MessageBox variant="danger">{error}</MessageBox>}

            <FormControl p="1" id="password">
              <FormLabel px="1" fontSize="s">
                New Password
              </FormLabel>
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
            </FormControl>
            <FormControl p="1" id="confirmPassword">
              <FormLabel px="1" fontSize="s">
                Confirm New Password
              </FormLabel>
              <Stack direction="row" align="center">
                <InputGroup size="md">
                  <Input
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e?.target?.value)}
                    value={confirmPassword}
                    required
                    type={showConformPassword ? "text" : "password"}
                    placeholder="Conform password"
                  />
                  <InputRightElement width="4.5rem">
                    {showConformPassword ? (
                      <IconButton
                        bg="none"
                        onClick={handleShowConformPassword}
                        icon={<AiOutlineEye size="20px" color="black" />}
                        aria-label="Close"
                      />
                    ) : (
                      <IconButton
                        bg="none"
                        onClick={handleShowConformPassword}
                        icon={
                          <AiOutlineEyeInvisible size="20px" color="black" />
                        }
                        aria-label="Close"
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </FormControl>

            <Stack p="1" pt="2" align="center" mt="2">
              <Button
                width="100%"
                //   bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                bgColor="#D7380E"
                size="md"
                type="submit"
                onClick={submitHandler}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
