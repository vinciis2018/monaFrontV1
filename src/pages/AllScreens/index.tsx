import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Center,
  Stack,
  Text,
  Button,
  SimpleGrid,
  InputLeftElement,
  InputGroup,
  Input,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { listScreens } from "../../Actions/screenActions";

import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { ContactUs, Screen } from "components/common";
import { IoSearchOutline } from "react-icons/io5";
import { FiMap } from "react-icons/fi";
import { BsSliders } from "react-icons/bs";
import { MyMap } from "pages/MyMap";
import { getPinJson } from "Actions/pinActions";

export function AllScreens() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<any>("1");

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens } = screenList;

  const jsonPins = useSelector((state: any) => state.jsonPins);
  const { loading: loadingAllPins, error: errorAllPins, jsonData } = jsonPins;

  const dispatch = useDispatch<any>();

  const loadMore = () => {
    setPageNumber(Number(pageNumber) + 1);
    dispatch(listScreens({ pageNumber }));
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    dispatch(listScreens({ pageNumber }));
    dispatch(getPinJson());
  }, [dispatch, navigate, userInfo, pageNumber]);

  return (
    <Box color="black.500" align="center" py="20">
      {loadingScreens ? (
        <HLoading loading={loadingScreens} />
      ) : errorScreens ? (
        <MessageBox variant="danger">{errorScreens}</MessageBox>
      ) : (
        <Stack>
          <Center px="10" mb="10">
            <Stack>
              <Stack py="5" align="center">
                <InputGroup size="lg" width="40%">
                  <InputLeftElement
                    p="3"
                    pointerEvents="none"
                    children={<IoSearchOutline color="#3E3D48" />}
                  />
                  <Input
                    placeholder="Loaction"
                    size="lg"
                    borderRadius="25px"
                    borderColor="#3F3E49"
                    fontSize="lg"
                    py="2"
                  />
                </InputGroup>
              </Stack>
              <Stack fontSize="3xl" fontWeight="bold" direction="row" pt="">
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
                    <TagLabel fontSize="lg">Indoor</TagLabel>
                  </Tag>
                  <Tag
                    p="3"
                    size="lg"
                    fontSize="xl"
                    variant="outline"
                    color="#3E3D48"
                    borderRadius="full"
                  >
                    <TagLabel fontSize="lg">Railway Station</TagLabel>
                  </Tag>
                  <Tag
                    p="3"
                    size="lg"
                    fontSize="xl"
                    variant="outline"
                    color="#3E3D48"
                    borderRadius="full"
                  >
                    <TagLabel fontSize="lg">Highway</TagLabel>
                  </Tag>
                  <Tag
                    p="3"
                    size="lg"
                    fontSize="xl"
                    variant="outline"
                    color="#3E3D48"
                    borderRadius="full"
                  >
                    <TagLeftIcon as={BsSliders} />
                    <TagLabel fontSize="lg">Filter</TagLabel>
                  </Tag>
                </Stack>
                <Tag
                  p="3"
                  size="lg"
                  fontSize="xl"
                  variant="outline"
                  color="#3E3D48"
                  borderRadius="full"
                >
                  <TagLeftIcon as={FiMap} />
                  <TagLabel fontSize="lg">Map View</TagLabel>
                </Tag>
              </Stack>

              <SimpleGrid columns={[1, 2, 3]} spacing="4">
                {screens.map((eachScreen: any) => (
                  <Screen eachScreen={eachScreen} key={eachScreen._id} />
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
                  onClick={loadMore}
                >
                  See All
                </Button>
              </Flex>
            </Stack>
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
        </Stack>
      )}
    </Box>
  );
}
