import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Heading,
  Flex,
  Stack,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";

import mapboxgl from "mapbox-gl";

import { getPinJson } from "Actions/pinActions";
// import { detailsScreen } from '../../Actions/screenActions';
import { AiOutlineReload, AiFillStar } from "react-icons/ai";
import { refreshPage } from "utils/util";
import { detailsScreen } from "Actions/screenActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX}`;

export function Map(mapProps: any) {
  // const [mapFeatures, setMapFeatures] = React.useState<any>(
  //   mapProps?.mapProps?.features
  // );
  const [geojson, setGeojson] = React.useState<any>({
    type: "FeatureCollection",
    features: mapProps?.mapProps?.features,
  });
  const mapContainerRef = React.useRef<any>(null);

  // console.log(mapProps)
  const [lng, setLng] = React.useState<any>(null);
  const [lat, setLat] = React.useState<any>(null);

  const dispatch = useDispatch<any>();

  // initialize map when component mounts
  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.08, 28.47],
      zoom: 2,
    });

    const geoLocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(geoLocate);

    map.on("load", () => {
      geoLocate.trigger();
      geojson?.features?.forEach((marker: any) => {
        new mapboxgl.Marker({
          color: "red",
          // draggable: true,
        })
          .setLngLat(marker?.geometry?.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: -100 }) // add popups
              .setDOMContent(
                window.document.createElement(
                  `${(<PopUp screenId={marker?.properties?.screen} />)}`
                )
              )
          )
          .addTo(map);
      });
    });

    if (mapProps?.props) {
      setLat(mapProps?.props?.lat);
      setLng(mapProps?.props?.lng);
      new mapboxgl.Marker({
        color: "blue",
        // draggable: true
      })
        .setLngLat([lng, lat])
        .addTo(map);
    }

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      // setZoom(map.getZoom().toFixed(2));
    });

    // add popup when user clicks a points
    map.on("click", (event) => {
      // If the user clicked on one of your markers, get its information.
      new mapboxgl.Popup({ offset: [0, -100] })
        .setLngLat(event.lngLat)
        .setHTML(`<h3>${event.lngLat}</h3>`)
        .addTo(map);
    });

    // clean up on unmount
    return () => map.remove();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, geojson?.features, mapProps?.props]);

  const reloadOption = (e: any) => {
    e.preventDefault();
    // setMapFeatures(mapProps?.mapProps?.features);
    setGeojson({
      features: mapProps?.mapProps?.features,
    });

    dispatch(getPinJson());
    refreshPage();
  };

  return (
    <Stack color="black.500">
      <Flex p="2" justify="space-between">
        <Heading fontSize="15px">
          Longitude: {lng} | Latitude: {lat} |{/* Zoom: {zoom} */}
        </Heading>
        <AiOutlineReload fontSize="20" onClick={reloadOption} />
      </Flex>
      <Box px="1" mt="" rounded="md" width="100%" height="100%">
        <Box
          rounded="md"
          width="100%"
          height={mapProps?.props?.height || "540px"}
          ref={mapContainerRef}
        />
      </Box>
    </Stack>
  );
}

export function PopUp(screenId: any) {
  const screenDetails = useSelector((state: any) => state.screenDetails);
  const {
    loading: loadingScreen,
    error: errorScreen,
    screen: screenData,
  } = screenDetails;

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    dispatch(detailsScreen(screenId));
  }, [screenId, dispatch]);
  return (
    <Stack>
      {loadingScreen ? (
        <HLoading loading={loadingScreen} />
      ) : errorScreen ? (
        <MessageBox variant="danger">{errorScreen}</MessageBox>
      ) : (
        <Box
          border="1px solid #2BB3E0"
          width="307px"
          height="390px"
          borderRadius="15px"
          // bgGradient={[
          //   "linear-gradient(156.06deg, rgba(255, 255, 255, 0.4) -1.7%, rgba(255, 255, 255, 0.6) 102.25%)",
          // ]}
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
              >
                See screen details
              </Button>
            </Stack>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
