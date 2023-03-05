import React, { useState } from "react";
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
  SimpleGrid,
  Text,
  Button,
  IconButton,
  Flex,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import mylogo from "../../../assets/mylogo.png";
import logo from "../../../assets/logo.png";
import name from "../../../assets/name.png";
import { signup } from "../../../Actions/userActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

export function CreateAndResetPassword(props: any) {
  const navigate = useNavigate();
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [showPassword, setShowPassword] = useState<any>(false);
  const [showConformPassword, setShowConformPassword] = useState<any>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConformPassword = () =>
    setShowConformPassword(!showConformPassword);

  const userSignup = useSelector((state: any) => state.userSignup);
  const { userInfo, loading, error } = userSignup;

  const dispatch = useDispatch<any>();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Password and confirm password donot match");
      setPassword("");
      setConfirmPassword("");
    } else {
      dispatch(signup(props.name, props.email, password));
      setShowConformPassword(false); // conform password modal close
      navigate("/signin");
    }
  };

  return (
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
                  width="100%"
                  // bgColor="rgba(244, 86, 0, 0.3)"
                  mt="20"
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
                  p="1`  "
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
                  Passwords must be atleast 6 characters long and can't be
                  things like "password", "123456" or "abcdef"
                </Text>
                {loading && <HLoading loading={loading} />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}

                <FormControl p="1" id="password">
                  <FormLabel px="1" fontSize="s">
                    New Password
                  </FormLabel>
                  <Stack direction="row" align="center">
                    <InputGroup size="md" align="center">
                      <Input
                        id="password"
                        py="3"
                        onChange={(e) => setPassword(e?.target?.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        required
                      />
                      <InputRightElement width="4.5rem" align="center">
                        {showPassword ? (
                          <Stack mt="3">
                            <AiOutlineEye
                              size="20px"
                              color="black"
                              onClick={handleShowPassword}
                            />
                          </Stack>
                        ) : (
                          <Stack mt="3">
                            <AiOutlineEyeInvisible
                              size="20px"
                              color="black"
                              onClick={handleShowPassword}
                            />
                          </Stack>
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
                        py="3"
                        id="confirmPassword"
                        onChange={(e) => setConfirmPassword(e?.target?.value)}
                        value={confirmPassword}
                        required
                        type={showConformPassword ? "text" : "password"}
                        placeholder="Conform password"
                      />
                      <InputRightElement width="4.5rem">
                        {showConformPassword ? (
                          <Stack mt="3">
                            <AiOutlineEye
                              size="20px"
                              color="black"
                              onClick={handleShowConformPassword}
                            />
                          </Stack>
                        ) : (
                          <Stack mt="3">
                            <AiOutlineEyeInvisible
                              size="20px"
                              color="black"
                              onClick={handleShowConformPassword}
                            />
                          </Stack>
                        )}
                      </InputRightElement>
                    </InputGroup>
                  </Stack>
                </FormControl>

                <Stack p="1" pt="2" align="center" mt="2">
                  <Button
                    py="3"
                    width="100%"
                    bgColor="#D7380E"
                    size="md"
                    type="submit"
                    onClick={submitHandler}
                  >
                    Submit
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
