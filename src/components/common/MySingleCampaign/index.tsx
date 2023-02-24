import { Box, Text, SimpleGrid, Image, VStack, Flex } from "@chakra-ui/react";
import { getScreenCalender } from "Actions/calendarActions";
import { detailsScreen } from "Actions/screenActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { useEffect } from "react";
import { BsDot } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertIntoDateAndTime } from "utils/dateAndTime";
export function MySingleCampaign(props: any) {
  const { campaign } = props;
  const screenId = campaign.screen;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const { loading: loadingScreen, error: errorScreen, screen } = screenDetails;
  // console.log("screen : ", JSON.stringify(screen));
  // console.log("screenCategory: ", screenCategory);
  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender,
  } = screenCalender;
  // console.log("screen calender : ", JSON.stringify(calender));
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(detailsScreen(screenId));
    dispatch(getScreenCalender(screenId));
  }, [dispatch]);

  return (
    <Box
      boxShadow="2xl"
      p="5"
      onClick={() => navigate(`/campaignDetails/${campaign._id}`)}
      _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#674780" }}
    >
      {loadingScreenCalender || loadingScreen ? (
        <HLoading loading={loadingScreen || loadingScreenCalender} />
      ) : errorScreen || errorScreenCalender ? (
        <MessageBox variant="danger">
          {errorScreen || errorScreenCalender}
        </MessageBox>
      ) : (
        <Box>
          <SimpleGrid columns={[1, 2, 4]} spacing="4">
            <Image
              borderRadius="sm"
              width="50%"
              height="70%"
              src={campaign.thumbnail}
            ></Image>
            <VStack align="left">
              <Text
                color="#0D0D0D"
                fontSize="lg"
                fontWeight="semibold"
                align="left"
              >
                {campaign.campaignName}
              </Text>
              <Text
                color="#0D0D0D"
                fontSize="md"
                fontWeight="semibold"
                align="left"
              >
                {`${screen.districtCity}, ${screen.country}`}
              </Text>
              {}
              <Text color="#575757" fontSize="md" align="left">
                {convertIntoDateAndTime(campaign.startDate)?.split(",")[0]},
                {convertIntoDateAndTime(campaign.startDate)?.split(",")[1]}
              </Text>
              <Text color="#575757" fontSize="md" align="left">
                {convertIntoDateAndTime(campaign.startDate)?.split(",")[2]}
              </Text>
            </VStack>
            <VStack align="left">
              <Text
                color="#0D0D0D"
                fontSize="md"
                fontWeight="semibold"
                align="left"
              >
                Rent per slot: {screen.rentPerSlot}
              </Text>
              <Text
                color="#0D0D0D"
                fontSize="md"
                fontWeight="semibold"
                align="left"
              >
                Total number of slots: {campaign.totalSlotBooked}
              </Text>
              <Text
                color="#0D0D0D"
                fontSize="md"
                fontWeight="semibold"
                align="left"
              >
                Amount paid: ₹ {campaign.totalAmount}
              </Text>
            </VStack>
            {campaign.paidForSlot ? (
              <Flex>
                <BsDot color="#00D615" size="20px" />
                <Text color="#403F45" fontSize="sm" pl="2">
                  Active
                </Text>
              </Flex>
            ) : (
              <Flex>
                <BsDot size="20px" color="#E93A03" />
                <Text color="#403F45" fontSize="sm" pl="2">
                  Pending
                </Text>
              </Flex>
            )}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
}
