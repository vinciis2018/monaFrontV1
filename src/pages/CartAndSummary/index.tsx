import React, { useState } from "react";
import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import {
  IconButton as MiuiIconButton,
  InputAdornment,
} from "@material-ui/core";
import { BsCalendar2Date } from "react-icons/bs";

export function CartAndSummary(props: any) {
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  const [sliderValue, setSliderValue] = useState(50);
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
    <Box p="20" pt="20">
      <Stack>
        <Text
          color="#403F49"
          fontSize="xl"
          fontWeight="semibold"
          align="left"
          pt="5"
        >
          Order summary
        </Text>
        <Stack pt="10" direction="row" align="center">
          <Text
            color="#333333"
            fontSize="lg"
            fontWeight="semibold"
            align="left"
          >
            Screen selected
          </Text>
          <Stack pl="10">
            <Text
              border="1px"
              borderColor="#0EBCF5"
              color="#000000"
              fontSize="md"
              fontWeight="semibold"
              p="2"
            >
              Varanasi 1
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" pt="5">
        <Stack width="60%">
          <Box border="1px" borderRadius="md" borderColor="rgba(0, 0, 0, 0.5)">
            <Stack width="" borderBottom="1px" borderColor="rgba(0, 0, 0, 0.5)">
              <Text
                color="#28282E"
                fontSize="2xl"
                fontWeight="semibold"
                align="left"
                p="3"
              >
                Campaign details
              </Text>
            </Stack>
            <Stack p="3">
              <Stack direction="row" pt="3">
                <FormControl width="60%" spac>
                  <FormLabel htmlFor="share" fontSize="lg" color="#333333">
                    Campaign name
                  </FormLabel>
                  <InputGroup pt="2">
                    <Input
                      name="share"
                      id="share"
                      size="lg"
                      color="#888888"
                      placeholder="Puma snicks"
                    />
                    <Stack align="center" justifyContent="center" width="40%">
                      <Text
                        color="#333333"
                        fontSize="sm"
                        fontWeight="semibold"
                        type="Button"
                      >
                        Change
                      </Text>
                    </Stack>
                  </InputGroup>
                </FormControl>
              </Stack>
              <Stack direction="row" pt="3">
                <FormControl width="60%" spac>
                  <FormLabel htmlFor="share" fontSize="lg" color="#333333">
                    Video content
                  </FormLabel>
                  <InputGroup pt="2">
                    <Input
                      name="share"
                      id="share"
                      size="lg"
                      color="#888888"
                      placeholder="#awareness"
                    />
                    <Stack align="center" justifyContent="center" width="40%">
                      <Text
                        color="#333333"
                        fontSize="sm"
                        fontWeight="semibold"
                        type="Button"
                      >
                        Preview
                      </Text>
                    </Stack>
                  </InputGroup>
                </FormControl>
              </Stack>
              <Stack pt="3" direction="row" pb="5">
                <Text
                  color="#000000"
                  fontSize="md"
                  fontWeight="reguler"
                  align="left"
                  pr="30"
                >
                  Suggesions
                </Text>
                <Flex>
                  <Text
                    color="#888888"
                    fontSize="md"
                    fontWeight="reguler"
                    align="left"
                    pr="3"
                  >
                    #awareness
                  </Text>
                  <Text
                    color="#888888"
                    fontSize="md"
                    fontWeight="reguler"
                    align="left"
                    pr="3"
                  >
                    #Merrage
                  </Text>
                  <Text
                    color="#888888"
                    fontSize="md"
                    fontWeight="reguler"
                    align="left"
                    pr="3"
                  >
                    #Trafic
                  </Text>
                  <Text
                    color="#888888"
                    fontSize="md"
                    fontWeight="reguler"
                    align="left"
                    pr="3"
                  >
                    #sexuality
                  </Text>
                </Flex>
              </Stack>
            </Stack>
          </Box>
          <Box border="1px" borderRadius="md" borderColor="rgba(0, 0, 0, 0.5)">
            <Stack width="" borderBottom="1px" borderColor="rgba(0, 0, 0, 0.5)">
              <Text
                color="#28282E"
                fontSize="2xl"
                fontWeight="semibold"
                align="left"
                p="3"
              >
                Schedule
              </Text>
            </Stack>
            <Stack p="3">
              <FormControl width="60%" spac>
                <FormLabel htmlFor="share" fontSize="lg" color="#333333">
                  Start time
                </FormLabel>
                <InputGroup pt="2">
                  <Flex>
                    <FormControl id="startDateHere" width="50%">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          inputVariant="outlined"
                          value={endTime}
                          onChange={handleEndTime}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <MiuiIconButton>
                                  <BsCalendar2Date />
                                </MiuiIconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                    <FormControl id="startDateHere" width="30%" pl="5">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                          inputVariant="outlined"
                          value={endTime}
                          onChange={handleEndTime}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Flex>
                </InputGroup>
              </FormControl>
              <FormControl width="60%" spac>
                <FormLabel htmlFor="share" fontSize="lg" color="#333333">
                  End time
                </FormLabel>
                <InputGroup pt="2">
                  <Flex>
                    <FormControl id="startDateHere" width="50%">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          inputVariant="outlined"
                          value={endTime}
                          onChange={handleEndTime}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <MiuiIconButton>
                                  <BsCalendar2Date />
                                </MiuiIconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                    <FormControl id="startDateHere" width="30%" pl="5">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                          inputVariant="outlined"
                          value={endTime}
                          onChange={handleEndTime}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Flex>
                </InputGroup>
              </FormControl>
            </Stack>
          </Box>
          <Box border="1px" borderRadius="md" borderColor="rgba(0, 0, 0, 0.5)">
            <Stack width="" borderBottom="1px" borderColor="rgba(0, 0, 0, 0.5)">
              <Text
                color="#28282E"
                fontSize="2xl"
                fontWeight="semibold"
                align="left"
                p="3"
              >
                Schedule and budget
              </Text>
            </Stack>
            <Stack p="3">
              <Flex justifyContent="space-between" pt="3" columns={[1, 1, 2]}>
                <Text
                  color="#333333"
                  fontSize="lg"
                  fontWeight="semibold"
                  align="left"
                >
                  No of slots on screen 1
                </Text>
                <Text
                  color="#333333"
                  fontSize="md"
                  fontWeight="semibold"
                  pr="5"
                >
                  Available: 2143
                </Text>
              </Flex>
              <Flex justifyContent="space-between" pt="3">
                <Stack pt="5" width="70%">
                  <Slider
                    defaultValue={60}
                    min={0}
                    max={300}
                    step={1}
                    aria-label="slider-ex-1"
                    size="xl"
                    onChange={(val) => setSliderValue(val)}
                  >
                    <SliderMark
                      value={sliderValue}
                      textAlign="center"
                      bg="#0EBCF5"
                      color="white"
                      mt="-7"
                      ml="-5"
                      pr="5"
                      fontSize="xs"
                      borderRadius="sm"
                    >
                      {sliderValue}
                    </SliderMark>
                    <SliderTrack bg="#D6D6D6">
                      <Box position="relative" right={10} />
                      <SliderFilledTrack bg="#0EBCF5" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                  </Slider>
                </Stack>
                <Stack pr="5">
                  <Box
                    border="1px"
                    borderColor="#0EBCF5"
                    color="#333333"
                    fontSize="md"
                    fontWeight="semibold"
                  >
                    <Text p="3">Selected: {sliderValue}</Text>
                  </Box>
                </Stack>
              </Flex>
              <Divider pt="5" />
              <Flex justifyContent="space-between" pt="2" pb="2">
                <Text color="#28282E" fontSize="lg" fontWeight="semibold">
                  Total Cost for screen 1
                </Text>
                <Text
                  color="#28282E"
                  fontSize="lg"
                  fontWeight="semibold"
                  pr="20"
                >
                  $2124.00
                </Text>
              </Flex>
            </Stack>
          </Box>
        </Stack>
        <Stack width="40%" pl="5">
          <Box border="1px" borderRadius="md" borderColor="rgba(0, 0, 0, 0.5)">
            <Stack width="" borderBottom="1px" borderColor="rgba(0, 0, 0, 0.5)">
              <Text
                color="#28282E"
                fontSize="2xl"
                fontWeight="semibold"
                align="left"
                p="3"
              >
                Location and preview
              </Text>
            </Stack>
            <Stack p="3">
              <Text color="#000000" fontSize="lg" align="left">
                Varanasi 1
              </Text>
              <Text color="#000000" fontSize="sm" align="left">
                Airport road, varsanasi
              </Text>
              <Box pt="2" height={{ height: 50, lg: "200px" }}>
                <Image
                  borderRadius="10px"
                  height="240px"
                  width="100%"
                  src="https://bafybeid7zb5iw4oy7jvj7emoenrdrhmsfhh5smph3ce4u5ew4oayaw5uje.ipfs.w3s.link/pepsi.png"
                  alt=""
                />
              </Box>
            </Stack>
          </Box>
          <Box
            border="1px"
            borderRadius="md"
            borderColor="rgba(0, 0, 0, 0.5)"
            p="3"
          >
            <Flex justifyContent="space-between" pt="5">
              <Text color="#28282E" fontSize="lg" fontWeight="semibold">
                Total no of slots
              </Text>
              <Text color="#28282E" fontSize="lg" fontWeight="semibold" pr="20">
                {sliderValue}
              </Text>
            </Flex>
            <Divider pt="5" />
            <Flex justifyContent="space-between" pt="5">
              <Text color="#28282E" fontSize="lg" fontWeight="semibold">
                Total cost
              </Text>
              <Text color="#28282E" fontSize="lg" fontWeight="semibold" pr="20">
                $2124.00
              </Text>
            </Flex>
            <Divider pt="5" />
            <Stack pt="5">
              <Button
                color="#FFFFFF"
                fontSize="xl"
                fontWeight="semibold"
                bgColor="#D7380E"
                p="3"
              >
                Proceed to pay
              </Button>
            </Stack>
            <Divider pt="5" />
            <Text color="#888888" fontSize="lg" align="left" pt="3">
              Your available wallet balance:
            </Text>
            <Text color="#888888" fontSize="lg" align="left" pt="3" pb="3">
              $1212
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
