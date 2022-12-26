import React from "react";
import {
  Box,
  Flex,
  Center,
  Stack,
  Text,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  IconButton,
  Image,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";

import { IoSearchCircleSharp } from "react-icons/io5";
import { GrDown } from "react-icons/gr";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { listScreens } from "../../Actions/screenActions";
import { listAllVideos } from "../../Actions/advertActions";
// import { triggerPort } from "services/utils";

// import { TopNftsContent } from "components/widgets";
// import { TimeFilter } from "components/filters";

import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
//image
import homeScreen from "../../assets/image/homescreen.png";
import railway from "../../assets/image/raily.png";
import indor from "../../assets/image/indor.png";
import outdor from "../../assets/image/outdore.png";
import appartment from "../../assets/image/appartment.png";
import rectangle from "../../assets/image/Rectangle86.png";
import girl2 from "../../assets/image/girl2.png";
import { Screen } from "components/common";
import { AtvertiseBox } from "components/common/AtvertiseBox";

export function HomePage() {
  const navigate = useNavigate();

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens } = screenList;

  const videoListAll = useSelector((state: any) => state.videoListAll);

  const {
    loading: loadingVideos,
    error: errorVideos,
    allVideos,
  } = videoListAll;
  let topThreeVideos = [];
  if (allVideos !== undefined) {
    topThreeVideos = allVideos.slice(allVideos.length - 3, allVideos.length);
  }

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    }
    dispatch(listScreens({}));
    dispatch(listAllVideos());
  }, [dispatch, navigate, userInfo]);

  const categorys = [
    {
      image: appartment,
      category: "APPARTMENTS",
    },
    {
      image: railway,
      category: "RAILWAY PLATFORMS",
    },
    {
      image: indor,
      category: "INDOOR",
    },
    {
      image: outdor,
      category: "OUTDOORS",
    },
  ];

  return (
    <Box
      color="black.500"
      align="center"
      bgGradient={["linear-gradient(to right, #FFFDE9, #FFFFFF)"]}
      pl="20"
      pr="20"
    >
      <Center mb="10">
        {loadingScreens || loadingVideos ? (
          <HLoading loading={loadingScreens || loadingVideos} />
        ) : errorScreens || errorVideos ? (
          <MessageBox variant="danger">
            {errorScreens || errorVideos}
          </MessageBox>
        ) : (
          <Stack>
            <Box
              backgroundImage={homeScreen}
              display="inline-block"
              backgroundRepeat="no-repeat"
              // backgroundAttachment="fixed"
              backgroundSize="100%"
              borderRadius="24px"
              height="700px"
              fontFamily="Sans"
            >
              <Box align="center" p="20">
                <Text fontSize="5xl" color="#FFFFFF" width="70%">
                  Enter the new age of advertising
                </Text>
                <InputGroup size="lg" width="70%" mt="20">
                  <Input
                    pr="4.5rem"
                    type="text"
                    p="9"
                    heigth=""
                    bgColor="#FCFCFC"
                    borderRadius="70px"
                    fontSize="lg"
                    placeholder="Search by place, by location, by screen names"
                  />
                  <InputRightElement width="4.5rem" pt="5">
                    <IconButton
                      bg="none"
                      icon={<IoSearchCircleSharp size="50px" color="#D7380E" />}
                      aria-label="Edit user details"
                    ></IconButton>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Box>
            <Text
              color="#403F49"
              pt="5"
              pb="5"
              fontSize="4xl"
              fontWeight="700"
              align="left"
            >
              Categories
            </Text>
            <Flex
              align="center"
              direction="row"
              justifyContent="space-between"
              mt="10"
            >
              {categorys.map((eachCategory, index) => (
                <Box
                  width="23%"
                  height="200px"
                  bgColor="#F6F5F5"
                  borderRadius="12px"
                  boxShadow="2xl"
                  key={index + 1}
                >
                  <Image src={eachCategory.image} alt=""></Image>
                  <Text color="#3E3D48" p="5" fontSize="xl" fontWeight="600">
                    {eachCategory.category}
                  </Text>
                </Box>
              ))}
            </Flex>
            <Text
              color="#403F49"
              pt="10"
              pb="10"
              fontSize="4xl"
              fontWeight="700"
              align="left"
            >
              Popular screens
            </Text>
            <SimpleGrid columns={[2, null, 3]} spacing="10">
              {screens.map((eachScreen: any) => (
                <Screen eachScreen={eachScreen} key={eachScreen._id} />
              ))}
            </SimpleGrid>
            <Flex align="center" justifyContent="center">
              <Button
                width="250px"
                p="7"
                variant="outline"
                borderColor="black"
                color="#D7380E"
                fontSize="xl"
                fontWeight="semibold"
                mt="20"
                mb="20"
                onClick={() => navigate("/all-screens")}
              >
                See All
              </Button>
            </Flex>
            <Text
              color="#403F49"
              mt="10"
              fontSize="4xl"
              fontWeight="bold"
              align="left"
            >
              Ads playing
            </Text>
            <SimpleGrid columns={[1, null, 3]} spacing="10">
              {topThreeVideos &&
                topThreeVideos.map((eachVideo: any) => (
                  <AtvertiseBox video={eachVideo} key={eachVideo._id} />
                ))}
            </SimpleGrid>
            <Flex align="center" justifyContent="center">
              <Button
                width="250px"
                p="7"
                variant="outline"
                borderColor="black"
                color="#D7380E"
                fontSize="xl"
                fontWeight="semibold"
                mt="20"
                mb="20"
              >
                See All
              </Button>
            </Flex>
            <Box
              backgroundImage={rectangle}
              // display="inline-block"
              backgroundRepeat="no-repeat"
              // backgroundAttachment="fixed"
              backgroundSize="100%"
              borderRadius="67px"
              height="521px"
            >
              <Flex>
                <Box
                  height="204px"
                  color="#EBEBEB"
                  align="left"
                  p="20"
                  left="180px"
                >
                  <Text
                    fontSize="4xl"
                    fontWeight="bold"
                    align="left"
                    mt="2"
                    width="780px"
                  >
                    Need help or want to know how it works?
                  </Text>
                  <Text
                    fontSize="4xl"
                    fontWeight="bold"
                    align="left"
                    mt="2"
                    width="702px"
                  >
                    Our industry expersts are here to help you.
                  </Text>
                  <Button
                    mt="10"
                    width="251px"
                    height="54px"
                    bgColor="#D7380E"
                    color="#FFFFFF"
                    fontSize="xl"
                    fontWeight="semibold"
                    p="5"
                  >
                    {" "}
                    Contact us
                  </Button>
                </Box>
                <Image
                  src={girl2}
                  alt=""
                  p=""
                  height="540px"
                  width="580px"
                  mt="-50"
                  ml="20"
                ></Image>
              </Flex>
            </Box>
            <Divider pt="10" />
            <Flex align="center" justifyContent="space-between">
              <Text color="#403F49" fontSize="xl" fontWeight="700" align="left">
                All destinations
              </Text>
              <IconButton
                bg="none"
                mr="10"
                icon={<GrDown color="#9A9A9A" height="14px" width="27px" />}
                aria-label="Star"
              ></IconButton>
            </Flex>
            <Divider pb="" />
          </Stack>
        )}
      </Center>
    </Box>
  );
}
