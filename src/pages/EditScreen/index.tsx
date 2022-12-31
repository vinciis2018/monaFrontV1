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
  Textarea,
  FormControl,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MyMap } from "pages/MyMap";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import {
  IconButton as MiuiIconButton,
  InputAdornment,
} from "@material-ui/core";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsClock } from "react-icons/bs";

const steps = [
  { label: "Location" },
  { label: "Schedule" },
  { label: "Schedule" },
];

export const EditScreen = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const data = { features: [] };
  const text = (value: string) => (
    <Text fontSize="sm" color="#383838">
      {value}
    </Text>
  );
  const [tag, setTag] = useState<any>("");
  const [tags, setTags] = useState<any>([]);
  const [startDateHere, setStartDateHere] = React.useState<any>(new Date());
  const [endDateHere, setEndDateHere] = React.useState<any>(new Date());
  const [value, setValue] = React.useState<any>();

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };
  const handleAddTags = (event: any) => {
    if (event.which == 13) {
      setTags([...tags, tag]);
      setTag("");
    }
  };
  const deleteTags = (tag: any) => {
    const newTags = tags.filter((eachtag: any) => eachtag !== tag);
    setTags(newTags);
  };
  return (
    <Box pl="20" pr="20" pt="20">
      <Stack p="10" boxShadow="2xl" borderRadius="lg">
        <Flex align="center">
          <AiOutlineArrowLeft size="20px" color="#333333" onClick={prevStep} />
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
          Screen 1
        </Text>
        <Flex flexDir="column" width="50%" pt="5">
          <Steps activeStep={activeStep}>
            {steps.map(({ label }, index) => (
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
              >
                Outdores
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
              <FormControl id="startDateHere" width="30%">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    inputVariant="outlined"
                    disablePast={true}
                    format="dd/MM/yyyy"
                    value={startDateHere}
                    onChange={setStartDateHere}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <MiuiIconButton>
                            <AiOutlineCalendar />
                          </MiuiIconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
              <FormControl id="startDateHere" width="25%">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <TimePicker
                    inputVariant="outlined"
                    format="hh:mm"
                    value={startDateHere}
                    onChange={setStartDateHere}
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
              <FormControl id="startDateHere" width="30%">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    inputVariant="outlined"
                    disablePast={true}
                    format="dd/MM/yyyy"
                    value={startDateHere}
                    onChange={setStartDateHere}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <MiuiIconButton>
                            <AiOutlineCalendar />
                          </MiuiIconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
              <FormControl id="startDateHere" width="25%">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <TimePicker
                    inputVariant="outlined"
                    format="hh:mm"
                    value={startDateHere}
                    onChange={setStartDateHere}
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
              />
            </InputGroup>
          </HStack>
          <HStack justifyContent="flex-end" pr="30" pb="30">
            <Text
              type="Button"
              color="#313131"
              fontSize="sm"
              pr="10"
              onClick={nextStep}
            >
              Skip
            </Text>
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
              <Text color="#393939" fontWeight="semibold" align="left" pt="10">
                New screen location
              </Text>
              <Text color="#4D4D4D" align="left">
                Enter your screen name here
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
                />
              </InputGroup>
              <Text color="#393939" fontWeight="semibold" align="left" pt="10">
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
                />
              </InputGroup>
              <HStack justifyContent="flex-end" pr="30" pb="30" pt="30">
                <Text
                  type="Button"
                  color="#313131"
                  fontSize="sm"
                  pr="10"
                  onClick={nextStep}
                >
                  Skip
                </Text>
                <Button
                  variant="outline"
                  color="#515151"
                  bgColor="#FAFAFA"
                  fontSize="sm"
                  borderColor="#0EBCF5"
                  p="4"
                  _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#674780" }}
                  onClick={nextStep}
                >
                  Save & next
                </Button>
              </HStack>
            </VStack>
            <Box width="70%" color="black.500" height="700px">
              <MyMap data={data} />
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
                tags & nearby
              </Text>
              <Text color="#4D4D4D" align="left">
                Enter the hashtags for
              </Text>
            </VStack>
            <InputGroup size="lg" width="20%">
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
              {tags &&
                tags.map((tag: any, index: number) => (
                  <InputGroup key={index + 1}>
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
            <InputGroup size="lg" width="30%" color="#555555">
              <Textarea placeholder="Enter your text here" size="lg" />
            </InputGroup>
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
            >
              Finish
            </Button>
          </HStack>
        </Stack>
      ) : null}
    </Box>
  );
};
