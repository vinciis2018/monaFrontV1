import { Flex, Text } from "@chakra-ui/react";

import { Step, Steps } from "chakra-ui-steps";
//useSteps
const steps = [
  { label: "Step 1", description: "Create PIN" },
  { label: "Step 2", description: "Secure your wallet" },
  { label: "Step 3", description: "Confirm secret recovery Phrase" },
];

const text = (value: string) => <Text fontSize="12">{value}</Text>;

export const VerticalLabels = (props: any) => {
  return (
    <Flex flexDir="column" width="100%" align="center" justifyContent="center">
      <Steps labelOrientation="vertical" activeStep={props.activeStep}>
        {steps.map(({ label, description }, index) => (
          <Step label={text(description)} key={label}></Step>
        ))}
      </Steps>
      {/* {activeStep === steps.length ? (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          <Heading fontSize="xl" textAlign="center">
            Woohoo! All steps completed!
          </Heading>
          <Button mx="auto" mt={6} size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )} */}
    </Flex>
  );
};
