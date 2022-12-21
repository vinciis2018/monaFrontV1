import React, { useState } from "react";
import {
  Box,
  Flex,
  Center,
  Stack,
  Text,
  Button,
  IconButton,
  Image,
  SimpleGrid,
  Divider,
  Select,
  InputLeftElement,
  InputGroup,
  Input,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";

import { GrDown } from "react-icons/gr";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { listScreens } from "../../Actions/screenActions";
import { listAllVideos } from "../../Actions/advertActions";
// import { triggerPort } from "services/utils";

// import { TopNftsContent } from "components/widgets";
// import { TimeFilter } from "components/filters";

import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
//image
import railway from "../../assets/image/raily.png";
import indor from "../../assets/image/indor.png";
import outdor from "../../assets/image/outdore.png";
import appartment from "../../assets/image/appartment.png";
import rectangle from "../../assets/image/Rectangle86.png";
import girl2 from "../../assets/image/girl2.png";
import { Screen } from "components/common";
import { IoSearchOutline } from "react-icons/io5";
import { FiMap } from "react-icons/fi";

export function AllScreens() {
  const navigate = useNavigate();
  const MotionFlex = motion(Flex);
  const [allScreens, setAllScreens] = useState<any>([]);
  const [visible, setVisible] = useState<any>(3);

  const [screensModal, setScreensModal] = React.useState(false);
  const [nftsModal, setNftModal] = React.useState(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens } = screenList;

  const dispatch = useDispatch<any>();

  const loadMore = () => {
    setVisible(visible + 3);
  };
  React.useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      console.log("go to welcome page");
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    }
    dispatch(listScreens({}));
    dispatch(listAllVideos());
  }, [dispatch, navigate, userInfo]);

  const modalHandler = () => {
    setNftModal(false);
    setScreensModal(false);
  };

  const screensModalHandler = () => {
    setScreensModal(true);
    setNftModal(false);
  };

  const nftsModalHandler = () => {
    setScreensModal(false);
    setNftModal(true);
  };
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
      align="center"
      // bgGradient={["linear-gradient(to right, #FFFDE9, #FFFFFF)"]}
    >
      <Flex
        p="5"
        bgColor="#FBFBFB"
        direction="row"
        align="center"
        justifyContent="center"
        boxShadow="2xl"
      >
        <Select
          placeholder="Date"
          size="md"
          borderRadius="25px"
          borderColor="#3F3E49"
          fontSixe="lg"
          width="10%"
          color="#3E3D48"
        />
        <InputGroup size="lg" width="70%" align="center" ml="10">
          <InputLeftElement>
            <IoSearchOutline color="#3E3D48" />
          </InputLeftElement>
          <Input
            placeholder="Loaction"
            size="md"
            borderRadius="25px"
            borderColor="#3F3E49"
            fontSixe="lg"
            width="25%"
          ></Input>
        </InputGroup>
      </Flex>

      {loadingScreens ? (
        <HLoading loading={loadingScreens} />
      ) : errorScreens ? (
        <MessageBox variant="danger">{errorScreens}</MessageBox>
      ) : (
        <Center>
          <Stack>
            <Stack fontSize="3xl" fontWeight="bold" direction="row" pt="10">
              <Text color="#403F49">Popular screens in </Text>
              <Text color="#2BB3E0"> Delhi</Text>
            </Stack>

            <Stack pt="5" direction="row" justifyContent="space-between">
              <Stack direction="row" justifyContent="space-between">
                <Tag
                  p="3"
                  size="lg"
                  fontSize="xl"
                  variant="outline"
                  color="#3E3D48"
                  borderRadius="full"
                >
                  <TagLabel>Indoor</TagLabel>
                </Tag>
                <Tag
                  size="lg"
                  fontSize="xl"
                  variant="outline"
                  color="#3E3D48"
                  borderRadius="full"
                >
                  <TagLabel>Railway Station</TagLabel>
                </Tag>
                <Tag
                  size="lg"
                  fontSize="xl"
                  variant="outline"
                  color="#3E3D48"
                  borderRadius="full"
                >
                  <TagLabel>Highway</TagLabel>
                </Tag>
                <Tag
                  size="lg"
                  fontSize="xl"
                  variant="outline"
                  color="#3E3D48"
                  borderRadius="full"
                >
                  <TagLeftIcon as={FiMap} />
                  <TagLabel>Filter</TagLabel>
                </Tag>
              </Stack>
              <Tag
                size="lg"
                fontSize="xl"
                variant="outline"
                color="#3E3D48"
                borderRadius="full"
              >
                <TagLeftIcon as={FiMap} />
                <TagLabel>Map View</TagLabel>
              </Tag>
            </Stack>

            <SimpleGrid columns={[2, null, 3]} spacing="10" pt="5">
              {screens.slice(0, visible).map((eachScreen: any) => (
                <Screen eachScreen={eachScreen} />
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
                onClick={loadMore}
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
        </Center>
      )}
    </Box>
  );
}
