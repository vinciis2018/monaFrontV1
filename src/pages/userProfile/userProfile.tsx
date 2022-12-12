import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Image,
  FormControl,
  Select,
  FormLabel,
  Input,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Button,
  IconButton,
  Center,
} from "@chakra-ui/react";
import {
  // AiOutlineFundProjectionScreen,
  AiOutlineArrowLeft,
  // AiOutlineEdit,
  // AiOutlineNotification,
  // s,
  // AiOutlineRightCircle,
  // AiOutlineUpload,
  AiOutlinePartition,
} from "react-icons/ai";

import { RiFileUploadLine } from "react-icons/ri";
import background from "../../assets/svgs/upload/backgroundImage.jpeg";

import { detailsUser, updateUserProfile } from "../../Actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../Constants/userConstants";

// import { CopyableAddress } from "components/ui";
import { ThumbnailCard } from "components/cards";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";
import { getMyMedia } from "Actions/mediaActions";

export function UserProfile1(props: any) {
  const navigate = useNavigate();

  const [name, setName] = React.useState<any>("");
  const [avatar, setAvatar] = React.useState<any>("");
  const [phone, setPhone] = React.useState<any>("");
  const [email, setEmail] = React.useState<any>("");

  const [address, setAddress] = React.useState<any>("");
  const [districtCity, setDistrictCity] = React.useState<any>("");
  const [stateUt, setStateUt] = React.useState<any>("");
  const [country, setCountry] = React.useState<any>("");
  const [pincode, setPincode] = React.useState<any>("");

  const [profileModal, setProfileModal] = React.useState<boolean>(false);
  const [addressModal, setAddressModal] = React.useState<boolean>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading: loadingDetails, error: errorDetails, user } = userDetails;

  const userUpdateProfile = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateProfile;

  const myMedia = useSelector((state: any) => state.myMedia);
  const { loading: loadingMyMedia, error: errorMyMedia, medias } = myMedia;

  const redirect = props?.location?.search
    ? props?.location?.search.split("=")[1]
    : "/signin";

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (successUpdate) {
      window.alert("Profile updated successfully");
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }

    if (!user) {
      dispatch(
        detailsUser({
          userId: userInfo?._id,
          walletAddress: userInfo.defaultWallet,
        })
      );
    } else {
      setName(user?.user?.name);
      setEmail(user?.user?.email);
      setPhone(user?.user?.phone);
      setAvatar(user?.user?.avatar);
      setAddress(user?.user?.address);
      setDistrictCity(user?.user?.districtCity);
      setStateUt(user?.user?.stateUt);
      setCountry(user?.user?.country);
      setPincode(user?.user?.pincode);
    }

    if (!userInfo) {
      navigate(redirect);
    } else {
      dispatch(getMyMedia());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo, user, successUpdate, navigate, redirect, avatar]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        userId: userInfo._id,
        name,
        avatar,
        phone,
        email,
        address,
        districtCity,
        stateUt,
        country,
        pincode,
      })
    );
    setProfileModal(false);
    setAddressModal(false);
  };

  const userProfileEditOpen = () => {
    setAddressModal(false);
    setProfileModal(!profileModal);
  };

  const userAddressEditOpen = () => {
    setProfileModal(false);
    setAddressModal(!addressModal);
  };

  return (
    <Box px="2" pt="20" color="black.500">
      {/* Container */}
      <Box maxW="container.lg" mx="auto" pb="8">
        <Center maxW="container.lg" mx="auto" pb="8">
          <Stack p="2">
            <Stack align="center" p="2" direction="row" justify="space-between">
              <AiOutlineArrowLeft onClick={() => navigate(-1)} />
              <Text fontWeight="600">User Profile</Text>
              {userInfo.isItanimulli ? (
                <AiOutlinePartition
                  onClick={() => navigate(`/customCreation/admin`)}
                />
              ) : (
                <AiOutlinePartition color="white" />
              )}
            </Stack>
            {loadingDetails || loadingMyMedia || loadingUpdate ? (
              <HLoading
                loading={loadingDetails || loadingMyMedia || loadingUpdate}
              />
            ) : errorDetails || errorMyMedia || errorUpdate ? (
              <MessageBox variant="danger">
                {errorDetails || errorMyMedia || errorUpdate}
              </MessageBox>
            ) : (
              <Stack p="2" backgroundColor="#EAEAEA">
                {profileModal ? (
                  <Box m="" p="2" rounded="lg" shadow="card">
                    <Text align="center" fontWeight="600" p="2" fontSize="md">
                      Edit Profile
                    </Text>
                    <Flex align="" justify="space-between">
                      <Box p="2" align="center" width="">
                        <Image
                          p="2"
                          border="1px"
                          borderColor="gray.100"
                          rounded="full"
                          height="100px"
                          src={avatar}
                        />
                      </Box>
                      <Box width="75%">
                        <FormControl p="2" id="name">
                          <Stack direction="row" align="center">
                            <Input
                              id="name"
                              onChange={(e) => setName(e.target.value)}
                              placeholder={name}
                              value={name}
                              type="text"
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">
                            Change your name here...
                          </FormLabel>
                        </FormControl>
                        <FormControl p="2" id="phone">
                          <Stack direction="row" align="center">
                            <Input
                              id="phone"
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder={phone}
                              value={phone}
                              type="phone"
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">
                            Change your contact number here...
                          </FormLabel>
                        </FormControl>
                        <FormControl p="2" id="email">
                          <Stack direction="row" align="center">
                            <Input
                              id="email"
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={email}
                              value={email}
                              type="email"
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">
                            Change your email here...
                          </FormLabel>
                        </FormControl>

                        <FormControl p="2" id="avatar">
                          <Select
                            id="avatar"
                            placeholder={avatar}
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                          >
                            {medias?.map((nft: Record<string, any>) => (
                              <option
                                style={{ color: "black" }}
                                key={nft?.id}
                                value={`https://ipfs.io/ipfs/${nft?.cid}`}
                              >
                                https://ipfs.io/ipfs/{nft?.cid}
                              </option>
                            ))}
                          </Select>
                          <FormLabel px="1" htmlFor="avatar" fontSize="xs">
                            This is your profile pic...
                          </FormLabel>
                        </FormControl>
                      </Box>
                    </Flex>
                    <SimpleGrid p="2" gap="4" columns={[2]}>
                      <Button
                        onClick={submitHandler}
                        bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => setProfileModal(false)}
                        bgColor="white"
                        color="violet.500"
                        border="1px"
                        borderColor="violet.500"
                      >
                        Go back
                      </Button>
                    </SimpleGrid>
                  </Box>
                ) : (
                  <Box
                    backgroundColor="#F1F1F1"
                    m=""
                    p="0"
                    rounded="lg"
                    shadow="card"
                  >
                    <Box
                      align="center"
                      display="inline-block"
                      backgroundImage={background}
                      backgroundRepeat="no-repeat"
                      backgroundAttachment="fixed"
                      backgroundSize="auto 100%"
                      position="relative"
                      borderRadius="5"
                      width="100%"
                      height="100px"
                    >
                      <Image
                        p="0"
                        display="inline-block"
                        marginBottom="-130px"
                        border="1px"
                        borderColor="gray.100"
                        rounded="full"
                        height="100px"
                        src={user?.user?.avatar}
                      />
                    </Box>
                    <Flex
                      px="2"
                      align="flex-start"
                      direction="column"
                      marginTop="10%"
                    >
                      <Text px="2" fontSize="160x" fontWeight="600">
                        {user?.user?.name}
                      </Text>
                      <Text
                        px="2"
                        fontWeight="40px"
                        fontSize="12px"
                        color="#593FFC"
                      >
                        {user?.user?.email}
                      </Text>
                      <Text px="2" fontWeight="" fontSize="12px">
                        +91-{user?.user?.phone}{" "}
                      </Text>
                      <Text
                        p="2"
                        fontSize="13px"
                        color="#747474"
                        fontWeight="light"
                      >
                        {user?.user?.address}, {user?.user?.districtCity},{" "}
                        {user?.user?.stateUt}, {user?.user?.country}, Pincode-
                        {user?.user?.pincode}
                        {""}
                      </Text>
                      <Button
                        p="4"
                        width="100%"
                        variant="outline"
                        backgroundColor="#E8E8E8"
                        fontWeight="11px"
                        marginEnd="30px"
                        onClick={() => navigate("/upload")}
                      >
                        Edit Profile
                      </Button>
                    </Flex>
                  </Box>
                )}
                <Button
                  p="10"
                  color="#313131"
                  marginTop="30px"
                  backgroundColor="#F1F1F1"
                  fontWeight="bold"
                  fontSize="16px"
                  onClick={() => navigate("/upload")}
                >
                  Upload NFT{" "}
                  <IconButton
                    onClick={userProfileEditOpen}
                    bg="none"
                    icon={<RiFileUploadLine size="20px" color="black" />}
                    aria-label="Edit user details"
                  ></IconButton>
                </Button>
                <Box p="">
                  <Flex p="2" align="center" justify="space-between">
                    <Text fontSize="lg" fontWeight="600">
                      Collections
                    </Text>
                  </Flex>
                </Box>
                <SimpleGrid
                  p="2"
                  w="100%"
                  minW="0"
                  minH="0"
                  gap="2"
                  columns={[2, 4]}
                >
                  {medias.map((media: any, index: number) => (
                    <Box
                      align="center"
                      p=""
                      key={index}
                      rounded="md"
                      shadow="card"
                      onClick={() => navigate(`/nft/${media.cid}`)}
                    >
                      <ThumbnailCard nft={media} />
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            )}
          </Stack>
        </Center>
      </Box>
    </Box>
  );
}
