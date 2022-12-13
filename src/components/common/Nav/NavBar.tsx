import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Image,
  useDisclosure,
  Text,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Center,
  Button,
} from "@chakra-ui/react";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineSetting,
  AiOutlineWallet,
  AiOutlineAim,
  AiOutlinePicture,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlinePoweroff,
  AiOutlineLogout,
} from "react-icons/ai";
import { TbUser, TbBell, TbWallet } from "react-icons/tb";
import Logo from "assets/logo.png";
import Name from "assets/name.png";
// import { isPWA } from "utils/util";
import { editWallet } from "../../../Actions/walletActions";
import { useLogin, useWallet } from "components/contexts";
import { useWindowSize } from "utils";
import { BsChevronDown } from "react-icons/bs";

import { signout } from "../../../Actions/userActions";

export const NavBar = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const style = {
    bgColor: "gray.100",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    position: "fixed",
    left: "0",
    top: "0",
    width: "100%",
    zIndex: "10",
  };
  const [walletBalance, setWalletBalance] = React.useState({
    ar: 0,
    koii: 0,
    ratData: 0,
  });
  const btnRef = React.useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenSignin, setisOPenSignin] = React.useState<any>(false);
  const [onOpenSignin, setonOpenSignin] = React.useState<any>(false);
  const [onCloseSignin, setonCloseSignin] = React.useState<any>();
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
    console.log("calling signout from nav bar page");

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
    <Box>
      <Stack
        align="center"
        direction="row"
        justifyContent="space-around"
        width="90%"
        pl="50"
      >
        <Stack as={RouterLink} to="/" direction="row" align="center">
          <Image width={{ base: 30, lg: "50px" }} src={Logo} />
          <Image width={{ base: 70, lg: "100px" }} src={Name} />
        </Stack>
        {!userInfo ? (
          <>
            <Button
              bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
              as={RouterLink}
              to={`/signin`}
              size="sm"
              fontSize="xs"
              onClick={() => navigate("/signin")}
              ref={btnRef}
            >
              Please Signin
            </Button>
          </>
        ) : (
          <Stack
            align="center"
            justifyContent="flex-end"
            justifyItems=""
            direction="row"
            width="80%"
            mt="1px"
          >
            <Text color="#3E3D48" fontSize="20px">
              Screan Owners
            </Text>
            <Text color="#3E3D48" fontSize="20px" p="5">
              My Screan
            </Text>

            <Box borderRadius="100%" border="2px" height="40px" width="40px">
              <IconButton
                bg="none"
                mt="1"
                icon={<TbWallet size="20px" fontWeight="1" color="black" />}
                aria-label="Send Money"
              />
            </Box>

            <Box borderRadius="100%" border="2px" height="40px" width="40px">
              <IconButton
                bg="none"
                mt="1"
                icon={<TbBell size="20px" fontWeight="1" color="black" />}
                aria-label="Send Money"
              />
            </Box>

            <Box borderRadius="100%" border="1px" height="40px" width="40px">
              <IconButton
                bg="none"
                mt="1"
                icon={<TbUser size="20px" fontWeight="10" color="black" />}
                aria-label="profile"
              />
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
                    <Icon
                      bg="none"
                      icon={
                        <BsChevronDown
                          size="20px"
                          fontWeight="10"
                          color="black"
                        />
                      }
                      aria-label="see profile"
                    />
                  </Center>
                </Tooltip>
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={RouterLink}
                  to={`/mapbox`}
                  color="black"
                  icon={<AiOutlineAim size="20px" />}
                >
                  Explore
                </MenuItem>
                <MenuItem
                  as={RouterLink}
                  to={`/screens`}
                  color="black"
                  icon={<AiOutlineFundProjectionScreen size="20px" />}
                >
                  Screens
                </MenuItem>
                <MenuItem
                  as={RouterLink}
                  to={`/adverts`}
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
    </Box>
  );
};
