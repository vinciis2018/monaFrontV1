import { Step, Steps, useSteps } from "chakra-ui-steps";
import {
  Flex,
  Box,
  Text,
  Stack,
  HStack,
  VStack,
  InputGroup,
  Input,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MyMap } from "pages/MyMap";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import {
  IconButton as MiuiIconButton,
  InputAdornment,
} from "@material-ui/core";
import { BsClock } from "react-icons/bs";
import {
  detailsScreen,
  getScreenPinDetails,
  updateScreen,
} from "../../Actions/screenActions";
import { updatePin, getPinDetails } from "../../Actions/pinActions";
import { SCREEN_UPDATE_RESET } from "../../Constants/screenConstants";
import { PIN_UPDATE_RESET } from "../../Constants/pinConstants";
import { getScreenCalender } from "../../Actions/calendarActions";

// import { getMyNfts } from "api/hooks/useArtist";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const steps = [
  { label: "Location" },
  { label: "Schedule" },
  { label: "Screen highlights" },
];

export const EditScreen = (props: any) => {
  const screenId = window.location.pathname.split("/")[2];
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const text = (value: string) => (
    <Text fontSize="sm" color="#383838">
      {value}
    </Text>
  );
  const navigate = useNavigate();
  const [tag, setTag] = useState<any>("");
  const [highlight, setHighLight] = useState<any>("");
  const [screenHighlights, setHighLights] = useState<any>([]);
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  // const [category, setCategory] = useState<any>();
  // const [indoor, setIndoor] = useState<any>("");
  // const [outdoor, setIndoor] = useState<any>("");

  const [name, setName] = useState<any>("");
  const [rentPerSlot, setRentPerSlot] = useState<any>("");
  const [image, setImage] = useState<any>("");
  const [screenCategory, setScreenCategory] = useState<any>("");
  const [screenType, setScreenType] = useState<any>("");
  const [screenWorth, setScreenWorth] = useState<any>("");
  const [slotsTimePeriod, setSlotsTimePeriod] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [screenTags, setScreenTags] = useState<any>([]);
  const [screenAddress, setScreenAddress] = useState<any>("");
  const [districtCity, setDistrictCity] = useState<any>("");
  const [stateUT, setStateUT] = useState<any>("");
  const [country, setCountry] = useState<any>("India");
  const [screenLength, setScreenLength] = useState<any>("");
  const [screenWidth, setScreenWidth] = useState<any>("");
  const [measurementUnit, setMeasurementUnit] = useState<any>("ft");
  const [geometry, setGeometry] = useState<any>();
  const [jsonData, setJsonData] = useState<any>(null);

  const [lng, setLng] = useState<number | undefined>(25.52);
  const [lat, setLat] = useState<number | undefined>(82.33);
  const [mapProps, setMapProps] = useState<any>({
    lng: lng,
    lat: lat,
    zoom: 18,
    height: "360px",
  });
  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading: loadingUser, error: errorUser, userInfo } = userSignin;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const { loading: loadingScreen, error: errorScreen, screen } = screenDetails;
  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender,
  } = screenCalender;

  console.log("screenCalender : ", screenCalender);

  const screenPinDetails = useSelector((state: any) => state.screenPinDetails);
  const {
    loading: loadingScreenPin,
    error: errorScreenPin,
    screenPin,
  } = screenPinDetails;

  const pinDetails = useSelector((state: any) => state.pinDetails);
  const { loading: loadingPin, error: pinError, pin } = pinDetails;

  const screenUpdate = useSelector((state: any) => state.screenUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = screenUpdate;

  const pinUpdate = useSelector((state: any) => state.pinUpdate);
  const {
    loading: loadingPinUpdate,
    error: errorPinUpdate,
    success: successPinUpdate,
  } = pinUpdate;

  const redirect = props?.location?.search
    ? props?.location?.search.split("=")[1]
    : "/signin";

  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (!screen || screen._id !== screenId || successUpdate) {
      dispatch({
        type: SCREEN_UPDATE_RESET,
      });
      dispatch(detailsScreen(screenId));
      dispatch(getScreenPinDetails(screenId));
    } else {
      setName(screen.name);
      setRentPerSlot(screen.rentPerSlot);
      setImage(image || screen.image);
      setScreenCategory(screen.category);
      setScreenType(screen.screenType);
      setScreenWorth(screen.scWorth);
      setSlotsTimePeriod(screen.slotsTimePeriod);
      setDescription(screen.description);
      setScreenAddress(screen.screenAddress);
      setDistrictCity(screen.districtCity);
      setStateUT(screen.stateUT);
      setCountry(screen.country);
      setScreenTags(screen.screenTags);
      setScreenLength(screen.size.length);
      setScreenWidth(screen.size.width);
      setMeasurementUnit(screen.size.measurementUnit);
      setHighLights(screen.screenHighlights);
    }

    if (!screenPin || successPinUpdate) {
      dispatch({
        type: PIN_UPDATE_RESET,
      });
      dispatch(getScreenPinDetails(screenId));
    } else {
      setLng(screenPin.lng);
      setLat(screenPin.lat);
      dispatch(getPinDetails(screenPin._id));
      setGeometry({
        geometry: {
          coordinates: [lng, lat],
        },
      });
    }
    if (!loadingPin && pin) {
      setJsonData(pin);
    }

    if (successPinUpdate) {
      window.alert("Screen Pin Updated successfully");
    }

    if (!userInfo) {
      navigate("/signin");
    }

    dispatch(getScreenCalender(screenId));
  }, [
    dispatch,
    userInfo,
    screenId,
    successUpdate,
    image,
    successPinUpdate,
    screenPin,
    navigate,
    redirect,
    screen,
  ]);

  const submitScreenHandler = (e: any) => {
    dispatch(
      updateScreen({
        _id: screenId,
        name,
        rentPerSlot,
        image,
        screenCategory,
        screenType,
        screenWorth,
        slotsTimePeriod,
        description,
        screenAddress,
        districtCity,
        stateUT,
        country,
        screenTags,
        screenHighlights,
        screenLength,
        measurementUnit,
        screenWidth,
        startTime,
        endTime,
      })
    );
    dispatch(
      updatePin(screenId, {
        lng: lng,
        lat: lat,
      })
    );
  };

  const handleAddPinClick = (e: any) => {
    const { lng, lat } = e.lngLat;
    setLng(lng);
    setLat(lat);
    setGeometry({
      geometry: {
        coordinates: [lng, lat],
      },
    });
    setMapProps({
      lng: lng,
      lat: lat,
    });
  };

  const handleAddTags = (event: any) => {
    if (event.which == 13) {
      setScreenTags([...screenTags, tag]);
      setTag("");
    }
  };
  const deleteTags = (tag: any) => {
    const newTags = screenTags.filter((eachtag: any) => eachtag !== tag);
    setScreenTags(newTags);
  };
  const handleMapLocation = (e: any) => {
    let geometry = e.target.value.split(",").map((data: any) => data.trim());
    setLng(geometry[1]);
    setLat(geometry[0]);
    setGeometry({
      geometry: {
        coordinates: [lng, lat],
      },
    });
  };
  const handleAddHighlites = () => {
    setHighLights([...screenHighlights, highlight]);
    setHighLight("");
  };
  const handleEndTime = (value: any) => {
    // let time = value.toString().split(" "); // Wed Jan 04 2023 08:22:28 GMT+0530
    // time = time[4];
    // console.log("time : ", time);
    setEndTime(value);
  };
  const handleStartTime = (value: any) => {
    // let time = value.toString().split(" "); // Wed Jan 04 2023 08:22:28 GMT+0530
    // time = time[4];
    setStartTime(value);
  };
  return (
    <Box pl="20" pr="20" pt="20">
      {loadingScreen || loadingPin ? (
        <HLoading loading={loadingScreen || loadingPin} />
      ) : errorScreen || pinError ? (
        <MessageBox message={errorScreen || pinError}></MessageBox>
      ) : (
        <Box>
          <Stack p="10" boxShadow="2xl" borderRadius="lg">
            <Flex align="center">
              <AiOutlineArrowLeft
                size="20px"
                color="#333333"
                onClick={prevStep}
              />
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="#333333"
                align="left"
                pl="5"
              >
                Edit
              </Text>
            </Flex>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color="#383838"
              align="left"
              pt="5"
            >
              {name}
            </Text>
            <Flex flexDir="column" width="50%" pt="5">
              <Steps activeStep={activeStep}>
                {steps.map(({ label }) => (
                  <Step label={text(label)} key={label}></Step>
                ))}
              </Steps>
            </Flex>
          </Stack>
          {activeStep === 0 ? (
            <Stack boxShadow="2xl" p="5" borderRadius="lg" spacing="5">
              <Text
                pt="10"
                fontSize="lg"
                fontWeight="semibold"
                color="#383838"
                align="left"
              >
                Add new screen
              </Text>
              <HStack>
                <VStack fontSize="sm" spacing="2" width="30%" align="left">
                  <Text color="#393939" fontWeight="semibold" align="left">
                    New screen name
                  </Text>
                  <Text color="#4D4D4D" align="left">
                    Enter your screen name here
                  </Text>
                </VStack>
                <InputGroup size="lg" width="30%">
                  <Input
                    placeholder="Screen Name"
                    size="lg"
                    borderRadius="md"
                    fontSize="lg"
                    border="1px"
                    color="#555555"
                    py="2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </HStack>
              <HStack>
                <VStack fontSize="sm" spacing="2" width="30%" align="left">
                  <Text color="#393939" fontWeight="semibold" align="left">
                    Screen type
                  </Text>
                  <Text color="#4D4D4D" align="left">
                    Enter your screen name here
                  </Text>
                </VStack>
                <Button
                  variant="outline"
                  color="#515151"
                  bgColor="#FAFAFA"
                  fontSize="sm"
                  p="4"
                  _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#4C4C4C" }}
                  onClick={() => setScreenCategory("Indoor")}
                >
                  Indoors
                </Button>
                <Stack pl="10">
                  <Button
                    variant="outline"
                    color="#515151"
                    bgColor="#FAFAFA"
                    fontSize="sm"
                    p="4"
                    DateTimePicker
                    _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#4C4C4C" }}
                    onClick={() => setScreenCategory("OutDore")}
                  >
                    Outdores
                  </Button>
                </Stack>
                <Stack pl="10">
                  <Button
                    variant="outline"
                    color="#515151"
                    bgColor="#FAFAFA"
                    fontSize="sm"
                    p="4"
                    DateTimePicker
                    _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#4C4C4C" }}
                    onClick={() => setScreenCategory("RailWay Station")}
                  >
                    RailWay Station
                  </Button>
                </Stack>
                <Stack pl="10">
                  <Button
                    variant="outline"
                    color="#515151"
                    bgColor="#FAFAFA"
                    fontSize="sm"
                    p="4"
                    DateTimePicker
                    _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#4C4C4C" }}
                    onClick={() => setScreenCategory("Appartment")}
                  >
                    Appartment
                  </Button>
                </Stack>
              </HStack>
              <HStack>
                <VStack fontSize="sm" spacing="2" width="30%" align="left">
                  <Text color="#393939" fontWeight="semibold" align="left">
                    End time
                  </Text>
                  <Text color="#4D4D4D" align="left">
                    Enter the screen end time
                  </Text>
                </VStack>
                <Flex>
                  <FormControl id="startDateHere" width="50%">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <TimePicker
                        inputVariant="outlined"
                        format="hh:mm"
                        value={endTime}
                        onChange={handleEndTime}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <MiuiIconButton>
                                <BsClock />
                              </MiuiIconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Flex>
              </HStack>
              <HStack>
                <VStack fontSize="sm" spacing="2" width="30%" align="left">
                  <Text color="#393939" fontWeight="semibold" align="left">
                    Start time
                  </Text>
                  <Text color="#4D4D4D" align="left">
                    Enter the screen start time
                  </Text>
                </VStack>
                <Flex>
                  <FormControl id="startDateHere" width="50%">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <TimePicker
                        inputVariant="outlined"
                        format="hh:mm"
                        value={startTime}
                        onChange={handleStartTime}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <MiuiIconButton>
                                <BsClock />
                              </MiuiIconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Flex>
              </HStack>
              <HStack>
                <VStack fontSize="sm" spacing="2" width="30%" align="left">
                  <Text color="#393939" fontWeight="semibold" align="left">
                    Slot time (in seconds)
                  </Text>
                  <Text color="#4D4D4D" align="left">
                    Enter the slot time that the user may play per ad
                  </Text>
                </VStack>
                <InputGroup size="lg" width="10%">
                  <Input
                    placeholder="20 Second"
                    size="lg"
                    fontSize="md"
                    borderRadius="md"
                    border="1px"
                    color="#555555"
                    py="2"
                    type="number"
                    value={slotsTimePeriod}
                    onChange={(e) => setSlotsTimePeriod(e.target.value)}
                  />
                </InputGroup>
              </HStack>
              <HStack justifyContent="flex-end" pr="30" pb="30">
                <Button
                  variant="outline"
                  color="#515151"
                  bgColor="#FAFAFA"
                  fontSize="sm"
                  p="4"
                  borderColor="#0EBCF5"
                  _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#674780" }}
                  onClick={nextStep}
                >
                  Save & next
                </Button>
              </HStack>
            </Stack>
          ) : activeStep === 1 ? (
            <Stack boxShadow="2xl" borderRadius="lg" pt="3">
              <Stack direction="row">
                <VStack
                  fontSize="sm"
                  spacing="2"
                  width="30%"
                  align="left"
                  pt="10"
                  p="10"
                >
                  <Flex align="center">
                    <AiOutlineArrowLeft
                      size="20px"
                      color="#333333"
                      onClick={prevStep}
                    />
                    <Text
                      fontSize="lg"
                      fontWeight="semibold"
                      color="#333333"
                      align="left"
                      pl="5"
                    >
                      Pin your screen location
                    </Text>
                  </Flex>
                  <Text
                    color="#393939"
                    fontWeight="semibold"
                    align="left"
                    pt="10"
                  >
                    New screen location
                  </Text>
                  <Text color="#4D4D4D" align="left">
                    Enter your screen location here
                  </Text>
                  <InputGroup size="lg" width="100%" pt="2">
                    <Input
                      placeholder="Screen name"
                      size="lg"
                      borderRadius="md"
                      fontSize="lg"
                      border="1px"
                      color="#555555"
                      py="2"
                      value={screenAddress}
                      onChange={(e) => setScreenAddress(e.target.value)}
                    />
                  </InputGroup>
                  <Text
                    color="#393939"
                    fontWeight="semibold"
                    align="left"
                    pt="10"
                  >
                    Latitudes & Longitudes
                  </Text>
                  <Text color="#4D4D4D" align="left">
                    The latitudes and longitudes of the map is shown
                  </Text>
                  <InputGroup size="lg" width="100%" pt="2">
                    <Input
                      placeholder="Screen name"
                      size="lg"
                      borderRadius="md"
                      fontSize="lg"
                      border="1px"
                      color="#555555"
                      py="2"
                      value={`${lat} , ${lng}`}
                      onChange={handleMapLocation}
                    />
                  </InputGroup>
                  <HStack justifyContent="flex-end" pr="30" pb="30" pt="30">
                    <Button
                      variant="outline"
                      color="#515151"
                      bgColor="#FAFAFA"
                      fontSize="sm"
                      borderColor="#0EBCF5"
                      p="4"
                      _hover={{
                        bg: "rgba(14, 188, 245, 0.3)",
                        color: "#674780",
                      }}
                      onClick={nextStep}
                    >
                      Save & next
                    </Button>
                  </HStack>
                </VStack>
                <Box width="70%" color="black.500" height="700px">
                  <MyMap
                    data={jsonData}
                    setLocation={handleAddPinClick}
                    geometry={geometry}
                  />
                </Box>
              </Stack>
            </Stack>
          ) : activeStep === 2 ? (
            <Stack boxShadow="2xl" borderRadius="lg" pt="3" p="5">
              <Flex align="center" pt="10">
                <AiOutlineArrowLeft
                  size="20px"
                  color="#333333"
                  onClick={prevStep}
                />
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color="#333333"
                  align="left"
                  pl="5"
                >
                  Pin your screen location
                </Text>
              </Flex>
              <HStack pt="5">
                <VStack fontSize="sm" spacing="2" width="30%" align="left">
                  <Text color="#393939" fontWeight="semibold" align="left">
                    screenTags
                  </Text>
                  <Text color="#4D4D4D" align="left">
                    Enter the hashscreenTags for
                  </Text>
                </VStack>
                <InputGroup size="lg" width="15%">
                  <Input
                    placeholder="Enter tag"
                    size="lg"
                    borderRadius="md"
                    fontSize="lg"
                    border="1px"
                    color="#555555"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyPress={(e) => handleAddTags(e)}
                    py="2"
                  />
                </InputGroup>
                <Flex>
                  {screenTags &&
                    screenTags.map((tag: any, index: number) => (
                      <InputGroup key={index + 1} size="lg" pl="3">
                        <Button
                          variant="outline"
                          color="#515151"
                          bgColor="#FAFAFA"
                          fontSize="sm"
                          p="4"
                          borderColor="#555555"
                          _hover={{
                            bg: "rgba(14, 188, 245, 0.3)",
                            color: "#674780",
                          }}
                          onClick={() => {
                            deleteTags(tag);
                            return true;
                          }}
                        >
                          {`#${tag}`}
                          <Text type="Button" pl="2">{` X`}</Text>
                        </Button>
                      </InputGroup>
                    ))}
                </Flex>
              </HStack>
              <HStack pt="5">
                <VStack fontSize="sm" spacing="2" width="30%" align="left">
                  <Text color="#393939" fontWeight="semibold" align="left">
                    Enter screen hilights
                  </Text>
                  <Text color="#4D4D4D" align="left">
                    Enter your screen highlights here
                  </Text>
                </VStack>
                <VStack spacing="2" width="70%" align="left">
                  <InputGroup size="lg" width="70%" color="#555555">
                    <Input
                      placeholder="Enter tag"
                      size="lg"
                      borderRadius="md"
                      fontSize="lg"
                      border="1px"
                      color="#555555"
                      value={highlight}
                      onChange={(e) => setHighLight(e.target.value)}
                      py="2"
                    />
                  </InputGroup>
                  <Button
                    color="#555555"
                    borderColor="#C8C8C8"
                    variant="outline"
                    bgColor="#F5F5F5"
                    width="70%"
                    fontSize="xl"
                    fontWeight="semibold"
                    p="2"
                    onClick={handleAddHighlites}
                  >
                    + Add more
                  </Button>
                </VStack>
              </HStack>
              <HStack pt="5">
                <VStack width="30%"></VStack>
                <VStack spacing="2" width="70%" align="left">
                  {screenHighlights &&
                    screenHighlights.map((highLight: any, index: any) => (
                      <Stack key={index + 1}>
                        <Button
                          color="#555555"
                          borderColor="#C8C8C8"
                          variant="outline"
                          bgColor="#F5F5F5"
                          width="70%"
                          fontSize="xl"
                          fontWeight="semibold"
                          p="2"
                          onClick={handleAddHighlites}
                        >
                          {highLight}
                        </Button>
                      </Stack>
                    ))}
                </VStack>
              </HStack>
              <HStack justifyContent="flex-end" pr="30" pb="30" pt="30">
                <Button
                  variant="outline"
                  color="#515151"
                  bgColor="#FAFAFA"
                  fontSize="sm"
                  borderColor="#0EBCF5"
                  p="4"
                  _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#674780" }}
                  onClick={submitScreenHandler}
                >
                  Finish
                </Button>
              </HStack>
            </Stack>
          ) : null}
        </Box>
      )}
    </Box>
  );
};
