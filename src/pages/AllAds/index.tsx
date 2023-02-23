import React, { useState } from "react";
import {
  Box,
  Flex,
  Center,
  Stack,
  Text,
  Button,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

import { AtvertiseBox } from "components/common/AtvertiseBox";
import { ContactUs } from "components/common";
import { getPinJson } from "Actions/pinActions";
import { MyMap } from "pages/MyMap";
import { IoSearchOutline } from "react-icons/io5";
import { getCampaignList } from "Actions/campaignAction";

export function AllAds() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const jsonPins = useSelector((state: any) => state.jsonPins);
  const { loading: loadingAllPins, error: errorAllPins, jsonData } = jsonPins;

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const campaignListAll = useSelector((state: any) => state.campaignListAll);

  const {
    loading: loadingVideos,
    error: errorVideos,
    allCampaign,
  } = campaignListAll;

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    // if (userInfo && !userInfo.defaultWallet) {
    //   navigate("/welcome");
    // } else if (!userInfo) {
    //   navigate("/signin");
    // }
    dispatch(getPinJson());
    dispatch(getCampaignList());
  }, [dispatch, navigate, userInfo]);

  const onClickSeeAll = () => {
    setCount(count + 1);
  };

  return (
    <Box
      color="black.500"
      align="center"
      py="20"
      // border="1px solid black"
    >
      <Center px="10">
        {loadingVideos ? (
          <HLoading loading={loadingVideos} />
        ) : errorVideos ? (
          <MessageBox variant="danger">{errorVideos}</MessageBox>
        ) : (
          <Stack>
            <Stack py="5" align="center">
              <InputGroup size="lg" width="40%">
                <InputLeftElement
                  p="3"
                  pointerEvents="none"
                  children={<IoSearchOutline color="#3E3D48" />}
                />
                <Input
                  placeholder="Search by brands"
                  size="lg"
                  borderRadius="25px"
                  borderColor="#3F3E49"
                  fontSize="lg"
                  py="2"
                />
              </InputGroup>
            </Stack>
            <Text
              color="#403F49"
              mt="10"
              fontSize="4xl"
              fontWeight="bold"
              align="left"
            >
              Ads playing
            </Text>
            <SimpleGrid columns={[1, 3]} spacing="10">
              {allCampaign &&
                allCampaign
                  .slice(0, count * 6)
                  .map((eachVideo: any) => (
                    <AtvertiseBox video={eachVideo} key={eachVideo._id} />
                  ))}
            </SimpleGrid>
            <Flex align="center" justifyContent="center">
              <Button
                width="250px"
                p="3"
                variant="outline"
                borderColor="black"
                color="#D7380E"
                fontSize="xl"
                fontWeight="semibold"
                mt="20"
                mb="20"
                onClick={onClickSeeAll}
              >
                See All
              </Button>
            </Flex>
          </Stack>
        )}
      </Center>
      <Box zIndex="1" width="100%" height="550px" color="black.500" pb="10">
        {loadingAllPins ? (
          <HLoading loading={loadingAllPins} />
        ) : errorAllPins ? (
          <MessageBox variant="danger">{errorAllPins}</MessageBox>
        ) : (
          <MyMap data={jsonData} />
        )}
      </Box>
      <ContactUs />
    </Box>
  );
}
