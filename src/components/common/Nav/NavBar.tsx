import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Center,
  Button,
  Collapse,
  useDisclosure,
  useColorModeValue,
  Flex,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineSetting,
  AiOutlineWallet,
  // AiOutlineAim,
  AiOutlinePicture,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlinePoweroff,
  AiOutlineLogout,
  AiOutlineClose,
} from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { TbUser, TbBell, TbWallet } from "react-icons/tb";
import Logo from "assets/logo.png";
import Name from "assets/name.png";
// import { isPWA } from "utils/util";
import { editWallet } from "../../../Actions/walletActions";
import { useLogin, useWallet } from "components/contexts";
import { BsChevronDown } from "react-icons/bs";

import { signout } from "../../../Actions/userActions";

export const NavBar = () => {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const style = {
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    // position: "fixed",
    left: "0",
    top: "0",
    width: "100%",
    zIndex: "1",
    backgroundColor: "#ffffff80",
  };
  const [walletBalance, setWalletBalance] = React.useState({
    ar: 0,
    koii: 0,
    ratData: 0,
  });
  const btnRef = React.useRef(null);

  const [modalOpen, setModalOpen] = React.useState<Boolean>(false);

  const { isUnlocked, lock, getArweavePublicAddress, isLoading } = useWallet();

  const { logout: logoutUser, lock: lockUser } = useLogin();

  const dispatch = useDispatch<any>();
  const userSignin = useSelector((state: any) => state.userSignin);
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    userInfo,
  } = userSignin;

  React.useEffect(() => {
    if (userInfo && getArweavePublicAddress() !== userInfo.defaultWallet) {
      dispatch(editWallet({ walletAdd: getArweavePublicAddress() }));
    }

    if (!isLoading) {
      setModalOpen(false);
      // getBalances(getArweavePublicAddress()).then((res: any) => {
      setWalletBalance(walletBalance);
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo, isLoading, getArweavePublicAddress, walletBalance]);

  const signoutHandler = () => {
    lockUser();
    logoutUser();
    lock();
    dispatch(signout());
    navigate("/signin");
  };

  const lockWallet = () => {
    lockUser();
    logoutUser();
    lock();
    navigate("/login");
  };

  return (
    <Box __css={style}>
      <Center>
        <Stack
          align="center"
          direction="row"
          justifyContent="space-around"
          width="100%"
          px="10"
        >
          {userInfo ? (
            <Flex
              //justifyContent="flex-start"
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              pt={{ base: "5" }}
              display={{ base: "flex", md: "none" }}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <AiOutlineClose size="20px" color="#000000" />
                  ) : (
                    <IoMdMenu size="20px" color="#000000" />
                  )
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex>
          ) : null}
          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
          <Stack
            as={RouterLink}
            to="/"
            direction="row"
            align="center"
            pt={{ base: 5 }}
          >
            <Image width={{ base: 30, lg: "50px" }} src={Logo} />
            <Image width={{ base: 70, lg: "100px" }} src={Name} />
          </Stack>
          {!userInfo ? (
            <Stack pt={{ base: 5 }}>
              <Button
                bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                as={RouterLink}
                to={`/signin`}
                size="sm"
                fontSize="xs"
                onClick={() => navigate("/signin")}
                ref={btnRef}
                p="2"
              >
                Please Signin
              </Button>
            </Stack>
          ) : (
            <Stack
              align="center"
              justifyContent="flex-end"
              direction="row"
              width="80%"
              mt="1px"
              p="3"
              display={{ base: "none", md: "flex" }}
            >
              <Text
                color="#3E3D48"
                fontSize={{ base: "sm", lg: "md" }}
                fontWeight="semibold"
                type="Button"
                _hover={{ color: "teal.600" }}
                onClick={() => navigate("/screen-owner")}
              >
                My Screens
              </Text>
              <Text
                color="#3E3D48"
                fontSize={{ base: "sm", lg: "md" }}
                pl="5"
                pr="5"
                type="Button"
                _hover={{ color: "teal.600" }}
                fontWeight="semibold"
                onClick={() => navigate("/myCampaignList")}
              >
                My Campaigns
              </Text>

              <Box
                borderRadius="100%"
                border="2px"
                height="40px"
                width="40px"
                borderColor="#403F49"
                color="#403F49"
                _hover={{ color: "teal.600", borderColor: "teal.600" }}
              >
                <Stack mt="2" ml="2">
                  <TbWallet
                    size="20px"
                    fontWeight="1"
                    onClick={() => navigate("/walletPage")}
                  />
                </Stack>
              </Box>
              <Box
                borderRadius="100%"
                border="2px"
                height="40px"
                width="40px"
                borderColor="#403F49"
                align="center"
                color="#403F49"
                _hover={{ color: "teal.600", borderColor: "teal.600" }}
              >
                <Stack mt="2" ml="2">
                  <TbBell size="20px" fontWeight="1" />
                </Stack>
              </Box>
              <Box
                borderRadius="100%"
                border="2px"
                height="40px"
                width="40px"
                borderColor="#403F49"
                color="#403F49"
                _hover={{ color: "teal.600", borderColor: "teal.600" }}
              >
                <Stack mt="2" ml="2">
                  <HiOutlineShoppingCart size="20px" fontWeight="1" />
                </Stack>
              </Box>
              <Box
                borderRadius="100%"
                border="2px"
                height="40px"
                width="40px"
                borderColor="#403F49"
                color="#403F49"
                _hover={{ color: "teal.600", borderColor: "teal.600" }}
              >
                <Stack mt="2" ml="2">
                  <TbUser
                    size="20px"
                    fontWeight="1"
                    onClick={() => navigate("/userprofile")}
                  />
                </Stack>
              </Box>

              <Menu>
                <MenuButton>
                  <Tooltip
                    bg="violet.500"
                    color="white"
                    hasArrow
                    placement="bottom"
                    label="Click for Menu"
                  >
                    <Center
                      as={RouterLink}
                      to="/"
                      bg="gray.100"
                      border="1px solid white"
                      shadow="card"
                      mx="auto"
                      rounded="full"
                      color="blue.100"
                      boxSize="50px"
                      flexBasis="50px"
                      flexShrink="0"
                    >
                      <BsChevronDown
                        size="20px"
                        fontWeight="1"
                        color="#403F49"
                      />
                    </Center>
                  </Tooltip>
                </MenuButton>
                <MenuList>
                  {/* <MenuItem
                    as={RouterLink}
                    to={`/mapbox`}
                    color="black"
                    icon={<AiOutlineAim size="20px" />}
                  >
                    Explore
                  </MenuItem> */}
                  <MenuItem
                    as={RouterLink}
                    to={`/all-screens`}
                    color="black"
                    icon={<AiOutlineFundProjectionScreen size="20px" />}
                  >
                    Screens
                  </MenuItem>
                  <MenuItem
                    as={RouterLink}
                    to={`/allads`}
                    color="black"
                    icon={<AiOutlinePicture size="20px" />}
                  >
                    Adverts
                  </MenuItem>
                  <MenuItem
                    as={RouterLink}
                    to={`/pleaBucket`}
                    color="black"
                    icon={<AiOutlineBell size="20px" />}
                  >
                    Notifications
                  </MenuItem>
                  <MenuItem
                    as={RouterLink}
                    to={`/userProfile/${
                      userInfo._id
                    }/${getArweavePublicAddress()}`}
                    color="black"
                    icon={<AiOutlineUser size="20px" />}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    as={RouterLink}
                    to={`/wallet/${userInfo._id}/${userInfo.defaultWallet}`}
                    color="black"
                    icon={<AiOutlineWallet size="20px" />}
                  >
                    Wallet
                  </MenuItem>
                  {/* <MenuItem as={RouterLink} to={`/upload-camera`} color="black" icon={<AiOutlineCamera size="20px" />}>
                          Camera
                        </MenuItem> */}
                  <MenuItem
                    as={RouterLink}
                    to={`/setting`}
                    color="black"
                    icon={<AiOutlineSetting size="20px" />}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem
                    onClick={lockWallet}
                    color="black"
                    icon={<AiOutlinePoweroff size="20px" />}
                  >
                    Disconnect
                  </MenuItem>
                  <MenuItem
                    onClick={signoutHandler}
                    color="black"
                    icon={<AiOutlineLogout size="20px" />}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          )}
        </Stack>
      </Center>
    </Box>
  );
};

const MobileNav = () => {
  const navigate = useNavigate();
  return (
    <Stack
      pt="10"
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      <VStack width="100%" align="left" justifyContent="flex-start">
        <Text
          color="#000000"
          fontSize="md"
          type="Button"
          ailgn="left"
          bgColor="#ECF2FF"
          _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#674780" }}
          onClick={() => navigate("/screen-owner")}
        >
          My Screen
        </Text>
        <Text
          color="#000000"
          fontSize="md"
          type="Button"
          ailgn="left"
          bgColor="#ECF2FF"
          _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#674780" }}
          onClick={() => navigate("/myCampaignList")}
        >
          My Campaign
        </Text>
        <Text
          color="#000000"
          fontSize="md"
          type="Button"
          ailgn="left"
          bgColor="#ECF2FF"
          _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#674780" }}
          onClick={() => navigate("/walletPage")}
        >
          Wallet
        </Text>
        <Text
          color="#000000"
          fontSize="md"
          type="Button"
          ailgn="left"
          bgColor="#ECF2FF"
          _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#674780" }}
          onClick={() => navigate("/userprofile")}
        >
          Profile
        </Text>
      </VStack>
    </Stack>
  );
};
