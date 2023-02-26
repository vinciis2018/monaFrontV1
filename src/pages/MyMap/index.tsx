import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Axios from "axios";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useNavigate } from "react-router-dom";

export function MyMap(props: any) {
  const navigate = useNavigate();
  const listOfScreens = props?.data;
  console.log("listOfScreens : ", JSON.stringify(listOfScreens.features));
  console.log("geometry : ", props.geometry);
  const [viewState, setViewState] = useState({
    longitude: props?.geometry?.coordinates[1] || 85,
    latitude: props?.geometry?.coordinates[0] || 25,
    zoom: props.zoom || 5,
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
    <Box
      height="100%"
      width="100%"
      align="center"
      justifyContent="center"
      color="black.500"
    >
      <ReactMapGL
        initialViewState={viewState}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onMove={(e) => setViewState(e.viewState)}
        onDblClick={(e) => props?.setLocation(e)}
      >
        {listOfScreens &&
          listOfScreens?.features.map((singleData: any) => (
            <Marker
              key={singleData?.properties?.screen}
              latitude={singleData?.geometry?.coordinates[0]}
              longitude={singleData?.geometry?.coordinates[1]}
            >
              <Button
                borderRadius="100px"
                bgColor="#D7380E"
                width="40px"
                height="40px"
                align="center"
                onClick={(e) => {
                  getSingleScreenData(
                    e,
                    singleData.properties.screen,
                    singleData
                  );
                }}
              >
                <FiMapPin size="30px" color="" />
              </Button>
            </Marker>
          ))}
        {viewSingleScreen && screenData ? (
          <Popup
            className="map"
            latitude={viewSingleScreen.geometry.coordinates[0]}
            longitude={viewSingleScreen.geometry.coordinates[1]}
            onClose={() => setViewSingleScreen(null)}
            anchor="left"
            closeButton={false}
            focusAfterOpen={true}
          >
            <Box
              border="1px solid #2BB3E0"
              width="307px"
              height="390px"
              borderRadius="15px"
              bgGradient={[
                "linear-gradient(156.06deg, rgba(255, 255, 255) -1.7%, rgba(255, 255, 255) 102.25%)",
              ]}
              p="2"
              m="-4"
            >
              <Box>
                <Image
                  height="168px"
                  width="291px"
                  src={screenData?.image}
                  alt="screen image"
                  borderRadius="15px"
                />
              </Box>
              <Box align="left" pt="2">
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
                <Flex align="center" p="1">
                  <Text
                    color="#403F49"
                    fontSize="lg"
                    fontWeight="bold"
                    align="left"
                    width="85%"
                  >
                    {screenData?.name}
                  </Text>
                  <Flex align="center" p="">
                    <AiFillStar size="16px" color="#403F49" />
                    <Text
                      pl="1"
                      color="#403F49"
                      fontSize="sm"
                      fontWeight="semibold"
                      align="left"
                    >
                      4.5 || {screenData?.ratting}
                    </Text>
                  </Flex>
                </Flex>
                <Flex align="center" p="1">
                  <Text
                    color="#666666"
                    fontSize="sm"
                    fontWeight="semibold"
                    align="left"
                  >
                    {screenData?.screenAddress}
                  </Text>
                </Flex>
                <Flex align="center" p="1" justify="space-between">
                  <Text
                    color="#403F49"
                    fontSize="sm"
                    fontWeight="semibold"
                    align="left"
                  >
                    {`₹${screenData?.rentPerSlot} per slot`}
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
                <Stack p="2">
                  <Button
                    mt="3"
                    p="2"
                    colorScheme="red"
                    variant="outline"
                    borderRadius="15px"
                    width="100%"
                    onClick={() => navigate(`/screen/${screenData._id}`)}
                  >
                    See screen details
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Popup>
        ) : null}
      </ReactMapGL>
    </Box>
  );
}
