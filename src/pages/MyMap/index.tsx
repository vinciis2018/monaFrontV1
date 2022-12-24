import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Axios from "axios";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import Map, { Marker, Popup } from "react-map-gl";

export function MyMap(props: any) {
  // const [data, setData] = useState(props.data);
  console.log("MyMap : ", props.data);
  console.log("gepmetry : ", props.geometry);
  const [viewState, setViewState] = useState({
    longitude: props.geometry.coordinates[2] || 84,
    latitude: props.geometry.coordinates[1] || 25,
    zoom: 7,
  });
  const [screenData, setScreenData] = useState<any>(null);
  const [viewSingleScreen, setViewSingleScreen] = useState<any>(false);

  const getSingleScreenData = async (e: any, screenId: any, pinData: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}`
      );
      setScreenData(data);
      setViewSingleScreen(pinData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Map
      initialViewState={viewState}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onMove={(e) => setViewState(e.viewState)}
    >
      {props.data.features.map((singleData: any) => (
        <Marker
          key={singleData.properties.pin}
          latitude={singleData.geometry.coordinates[1]}
          longitude={singleData.geometry.coordinates[0]}
        >
          <Button
            borderRadius="100px"
            bgColor="#D7380E"
            width="40px"
            height="40px"
            align="center"
            onClick={(e) => {
              getSingleScreenData(e, singleData.properties.screen, singleData);
            }}
          >
            <FiMapPin size="30px" color="" />
          </Button>
        </Marker>
      ))}
      {viewSingleScreen && screenData ? (
        <Popup
          latitude={viewSingleScreen.geometry.coordinates[1]}
          longitude={viewSingleScreen.geometry.coordinates[0]}
          onClose={() => setViewSingleScreen(null)}
        >
          <Box
            bgColor="#F7F7F7"
            borderColor="#2BB3E0"
            border="1px"
            width="307px"
            height="390px"
            borderRadius="16px"
            bgGradient={["linear-gradient(to right, #FFFDE9, #FFFFFF)"]}
            p="1"
          >
            <Box>
              <Image
                height="168px"
                width="291px"
                src={screenData.image}
                alt="screen image"
                borderRadius="15px"
              />
            </Box>
            {/* details of screem */}
            <Box align="left" pt="">
              <Text
                p="1"
                pl="2"
                borderRadius="25px"
                width="50%"
                color="#403F49"
                fontSize="sm"
                fontWeight="semibold"
                justifyContent="flex-start"
                bgColor="#D6ECDB"
              >
                2120 slots available
              </Text>
              <Flex align="center" pt="2">
                <Text
                  color="#403F49"
                  fontSize="lg"
                  fontWeight="bold"
                  align="left"
                  width="85%"
                >
                  {screenData.name}
                </Text>
                <Flex>
                  <AiFillStar size="16px" color="#403F49" />

                  <Text
                    pl="1"
                    color="#403F49"
                    fontSize="sm"
                    fontWeight="semibold"
                    align="left"
                  >
                    4.5
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center" pt="2">
                <Text
                  color="#666666"
                  fontSize="sm"
                  fontWeight="semibold"
                  align="left"
                >
                  {`${screenData.screenAddress} ${screenData.districtCity} ${screenData.country}`}
                </Text>
              </Flex>
              <Flex align="center" pt="2">
                <Text
                  color="#403F49"
                  fontSize="sm"
                  fontWeight="semibold"
                  align="left"
                >
                  {`₹ ${screenData.rentPerSlot}per slot`}
                </Text>
                <Text
                  as="s"
                  color="#787878"
                  fontSize="sm"
                  fontWeight="semibold"
                  align="left"
                >
                  ₹250 per slot
                </Text>
                <Text
                  pl="1"
                  color="#F86E6E"
                  fontSize="lg"
                  fontWeight="semibold"
                  align="left"
                >
                  ( 50% OFF)
                </Text>
              </Flex>
              <Stack p="3">
                <Button
                  mt="3"
                  color="#D7380E"
                  variant="outline"
                  borderRadius="8px"
                  width="100%"
                >
                  see screen details
                </Button>
              </Stack>
            </Box>
          </Box>
        </Popup>
      ) : null}
    </Map>
  );
}
