import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Button,
  Image,
  Divider,
  SimpleGrid,
  Progress,
  Textarea,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

import Axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { BsCheck2Circle, BsDot } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import { AtvertiseBox } from "components/common/AtvertiseBox";
import { MyMap } from "pages/MyMap";
import { GiRoundStar } from "react-icons/gi";
import { ContactUs, Review } from "components/common";
import { CreateNewCampaign } from "./CreateNewCampaign";
import { UploadCampaign } from "./UploadCampaign";
// import { generateVideoFromImages } from "Actions/mediaActions";
import { UploadThumbnail } from "./UploadThumbnail";
import { useIpfs } from "components/contexts";
import { createReview } from "Actions/screenActions";
import { UplaodCampaignThroughImage } from "./UplaodCampaignThroughImage";
import { userMediasList } from "Actions/userActions";

export function ScreenDetail(props: any) {
  const dispatch = useDispatch<any>();
  const screenId = window.location.pathname.split("/")[2];

  const navigate = useNavigate();
  const [userScreenRating, setUserScreenRating] = useState<any>(0);
  const [userReview, setUserReview] = useState<any>("");
  const [screen, setScreen] = useState<any>(null);
  const [screenLoading, setScreenLoading] = useState<any>(true);
  const [screenError, setScreenError] = useState<any>(null);
  const [pinLoading, setPinLoading] = useState<any>(true);
  const [pinError, setPinError] = useState<any>(null);
  const [jsonData, setJsonData] = useState<any>(null);
  const [videosList, setVideosList] = useState<any>([]);
  const [videosListError, setVideosListError] = useState<any>([]);
  const [videoLoading, setVideoLoading] = useState<any>(true);
  const [campaignModal, setCampaignModal] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [errorVideo, setErrorVideo] = useState<any>("");

  const [uploadCampaignModal, setUploadCampaignModal] = useState(false);
  const [uploadThumbnailModal, setUploadThumbnailModal] = useState<any>(false);
  const [
    uplaodCampaignThroughImageModalShow,
    setUplaodCampaignThroughImageModalShow,
  ] = useState<any>(false);

  const [isOldMedia, setIsOldMedia] = useState<any>(true);
  const [isOldThumbnail, setIsOldThumbnail] = useState<any>(true);
  const [mediaId, setMediaId] = useState<any>("");
  const [campaignName, setCampaignName] = useState("");
  const [fileUrl, setFileUrl] = useState<any>();
  const [thumbnailCid, setThumbnailCid] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [images, setImages] = useState<any>([]);
  const [loadingUploadMedia, setLoadingUploadMedia] = useState<any>();
  const [errorUploadMedia, setErrorUploadMedia] = useState<any>();
  const { addFile } = useIpfs();
  //console.log("Type of data buffer ----: ", typeof fileUrl, fileUrl);
  //console.log("screeen :::::::::::::", JSON.stringify(screen));
  const countEachRating = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  // const videoFromImages = useSelector((state: any) => state.videoFromImages);
  // const { loading: loadingVideo, error: errorVideo, video } = videoFromImages;

  const screenReviewCreate = useSelector(
    (state: any) => state.screenReviewCreate
  );
  const {
    loading: loadingCommnet,
    success: screenReviewCreateSuccess,
    error: errorComment,
    review,
  } = screenReviewCreate;
  //console.log("errorComment : ", errorComment);
  //console.log("videoFromImages : 331311-----", video);

  const myMedia = useSelector((state: any) => state.userMedia);
  const {
    loading: loadingMyMedia,
    error: errorMyMedia,
    success,
    medias,
  } = myMedia;
  // console.log("media  : ", JSON.stringify(medias));

  if (!screenLoading && screen) {
    screen.reviews.forEach((review: any) => {
      if (review.rating === 5) {
        countEachRating["5"] += 1;
      } else if (review.rating === 4) {
        countEachRating["4"] += 1;
      } else if (review.rating === 3) {
        countEachRating["3"] += 1;
      } else if (review.rating === 2) {
        countEachRating["2"] += 1;
      } else {
        countEachRating["1"] += 1;
      }
    });
  }
  const handlePost = () => {
    //console.log("handlepost called!");
    if (userScreenRating > 0 && userReview.length > 10) {
      dispatch(
        createReview(screenId, {
          rating: userScreenRating,
          comment: userReview,
        })
      );
      setUserScreenRating(0);
      setUserReview("");
    }
  };

  const generateVideoFromImages = async (
    images: any,
    duration: any,
    width: any,
    height: any
  ) => {
    try {
      setLoadingVideo(true);
      const { data } = await Axios.post(
        // `${process.env.REACT_APP_BLINDS_SERVER}/api/media/createVideoFromImages`,
        `https://www.server.vinciis.in/i2v`,
        { images, duration, width, height }
      );
      console.log("generateVideoFromImages called!", data);
      // console.log("images [0]", images[0]);
      setLoadingVideo(false);
      createMedia({
        title: campaignName,
        media: `${data.Video_Link_1}`,
        thumbnail: `${images[0]}`,
      });
    } catch (error: any) {
      // console.log("generateVideoFromImages called error!", error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log("error : ", message);
      setErrorVideo(message);
      setLoadingVideo(false);
    }
  };

  const getPinDetails = async (pinID: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/pins/${pinID}`
      );
      setJsonData(data);
      setPinLoading(false);
    } catch (error: any) {
      setPinError(
        error.response && error.response.data.message
          ? error.response.data.messages
          : error.message
      );
    }
  };
  const getCampaignListByScreenId = async (screenId: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/campaign/${screenId}/screen`
      );
      setVideosList(data);
      setVideoLoading(false);
    } catch (error: any) {
      setVideosListError(
        error.response && error.response.data.message
          ? error.response.data.messages
          : error.message
      );
    }
  };

  const getScreentDetail = async (screenId: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}`
      );
      setScreen(data);
      //console.log("screen details page screen : ", JSON.stringify(data));
      setScreenLoading(false);
      getPinDetails(data.locationPin);
      getCampaignListByScreenId(data._id);
    } catch (error: any) {
      setScreenError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messsetFileUrlage
      );
    }
  };
  const createMedia = async (body: any) => {
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/medias/create`,

        { userInfo, ...body },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log("created media : ", JSON.stringify(data));
      setCampaignName("");
      setImages([]);
      setFileUrl("");
      setThumbnailCid("");
      navigate(
        `/carts/${data._id}/${screenId}/${data.title}/${
          data.thumbnail.split("/")[4]
        }`
      );
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(message);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }

    if (screenReviewCreateSuccess) {
      alert("review Added SuccessFull!");
    }
    getScreentDetail(screenId);
    dispatch(userMediasList(userInfo));
  }, [dispatch, navigate, userInfo, loading]);

  const createCampaignFromOldMediaAndThumbnail = () => {
    navigate(`/carts/${mediaId}/${screenId}/${campaignName}/${thumbnailCid}`);
  };

  // console.log("fileurl : ", fileUrl);
  // console.log("thumnail : ", thumbnailCid);
  // console.log("campaign Name : ", campaignName);

  const videoUploadHandler = async (e: any) => {
    e.preventDefault();
    console.log("uplaod video fumction called!");
    // console.log("fileurl : ", fileUrl);
    // console.log("thumnail : ", thumbnailCid);
    // console.log("campaign Name : ", campaignName);
    // console.log("mediaId : ", mediaId);

    if (isOldMedia && isOldThumbnail) {
      console.log("Both are old");
      createCampaignFromOldMediaAndThumbnail();
    } else if (!isOldThumbnail && isOldMedia) {
      console.log("old media new thumbnail");
      setLoading(true);
      addFile(thumbnailCid).then(({ cid }) => {
        const strCid = cid.toString();
        setLoading(true);
        navigate(`/carts/${mediaId}/${screenId}/${campaignName}/${strCid}`);
      });
    } else if (!isOldMedia && !isOldThumbnail) {
      console.log("new media new thumbnail");
      setLoading(true);
      addFile(fileUrl)
        .then(({ cid }) => {
          const strCid = cid.toString();
          return strCid;
        })
        .then((media) => {
          addFile(thumbnailCid).then(async ({ cid }) => {
            const strCid = cid.toString();
            setThumbnailCid(strCid);
            createMedia({
              title: campaignName,
              media: `https://ipfs.io/ipfs/${media}`,
              thumbnail: `https://ipfs.io/ipfs/${strCid}`,
            });

            setLoading(false);
          });
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      console.log("new media old thumbnail");
      setLoading(true);
      addFile(fileUrl).then(({ cid }) => {
        const strCid = cid.toString();
        createMedia({
          title: campaignName,
          media: `https://ipfs.io/ipfs/${strCid}`,
          thumbnail: `https://ipfs.io/ipfs/${thumbnailCid}`,
        });
        setLoading(true);
      });
    }
  };
  // if (
  //   screenLoading ||
  //   videoLoading ||
  //   pinLoading ||
  //   loading ||
  //   loadingVideoSave ||
  //   loadingMyMedia
  // ) {
  //   console.log(
  //     `${screenLoading} ${videoLoading} ${pinLoading} ${loading} ${loadingVideoSave} ${loadingMyMedia}`
  //   );
  // }
  const sendImages = () => {
    if (images.length > 0) {
      console.log("images list for video create  : ", images);
      window.alert(`Sending ${images.length} images for creating video`);
      generateVideoFromImages(images, 10, 1280, 720);
    } else {
      window.alert(`Please select image for video create`);
      setUplaodCampaignThroughImageModalShow(true);
    }
  };

  return (
    <Box pt={{ base: "3", lg: "5" }}>
      <CreateNewCampaign
        show={campaignModal}
        onHide={() => setCampaignModal(false)}
        openUploadCampaignModal={() => setUploadCampaignModal(true)}
        setCampaignName={(e: any) => setCampaignName(e.target.value)}
        campaignName={campaignName}
        openUploadCampaignThrougnImages={() =>
          setUplaodCampaignThroughImageModalShow(true)
        }
      />
      <UploadCampaign
        show={uploadCampaignModal}
        onHide={() => setUploadCampaignModal(false)}
        openUploadThumbnailModal={() => setUploadThumbnailModal(true)}
        setFileUrl={(value: any) => setFileUrl(value)}
        setIsOldMedia={(value: any) => setIsOldMedia(value)}
        medias={medias}
        setMediaId={(value: any) => setMediaId(value)}
      />
      <UploadThumbnail
        show={uploadThumbnailModal}
        onHide={() => setUploadThumbnailModal(false)}
        setThumbnailCid={(value: any) => setThumbnailCid(value)}
        videoUploadHandler={videoUploadHandler}
        setIsOldThumbnail={(value: any) => setIsOldThumbnail(value)}
        medias={medias}
      />
      <UplaodCampaignThroughImage
        show={uplaodCampaignThroughImageModalShow}
        onHide={() => setUplaodCampaignThroughImageModalShow(false)}
        setThumbnailCid={(value: any) => setThumbnailCid(value)}
        videoUploadHandler={sendImages}
        medias={medias}
        setImages={(value: any) => setImages(value)}
      />
      {screenLoading ||
      videoLoading ||
      pinLoading ||
      loading ||
      loadingMyMedia ||
      loadingCommnet ||
      loadingUploadMedia ||
      loadingVideo ? (
        <HLoading
          loading={
            screenLoading ||
            videoLoading ||
            pinLoading ||
            loading ||
            loadingMyMedia ||
            loadingCommnet ||
            loadingUploadMedia ||
            loadingVideo
          }
        />
      ) : errorComment || errorUploadMedia || errorVideo ? (
        <MessageBox variant="danger">
          {errorComment || errorUploadMedia || errorVideo}
        </MessageBox>
      ) : (
        <Stack>
          <Flex>
            <Image src={screen.image} width="50%"></Image>
            <Stack p="20" align="left" pt="0">
              <Text
                fontSize="4xl"
                fontWeight="bold"
                color="#403F49"
                align="left"
              >
                {screen.name}
              </Text>
              <Flex align="center" ml="-3" mt="2" fontSize="lg">
                <AiFillStar size="28px" color="#403F49" />
                <Text
                  pl="1"
                  color="#403F49"
                  fontWeight="semibold"
                  align="left"
                  mr="5"
                >
                  {screen.rating}
                </Text>
                <BsDot size="16px" color="#403F49" />
                <Text color="#666666" fontWeight="semibold" align="left">
                  {`${screen.screenAddress} ${screen.districtCity} ${screen.country}`}
                </Text>
              </Flex>
              <Divider pt="5" />
              <Text
                pl="1"
                color="#403F49"
                fontWeight="semibold"
                align="left"
                fontSize="lg"
                mr="5"
              >
                16:01
              </Text>
              <Flex align="center" pt="2">
                <BiRupee size="26px" color="#403F49" />
                <Text
                  color="#403F49"
                  fontSize="xl"
                  fontWeight="semibold"
                  align="left"
                >
                  {`${screen.rentPerSlot} per slot`}
                </Text>
                <Text
                  as="s"
                  color="#787878"
                  fontSize="sm"
                  fontWeight="semibold"
                  align="left"
                  pl="2"
                >
                  ₹
                  {screen.rentPerSlot - screen.rentOffInPercent
                    ? (screen.rentPerSlot * 100) / screen.rentOffInPercent
                    : 0}{" "}
                  per slot
                </Text>
                <Text
                  pl="1"
                  color="#F86E6E"
                  fontSize="lg"
                  fontWeight="semibold"
                  align="left"
                >
                  ( {screen.rentOffInPercent}% OFF)
                </Text>
              </Flex>
              <SimpleGrid gap="4" columns={[3, 2]} pt="5">
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    Today
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    Tomorrow
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    12 Dec
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    13 Dec
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    14 Dec
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    15 Dec
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
              </SimpleGrid>
              <Text color="#403F49" fontSize="sm" align="left" pt="5">
                See more dates
              </Text>
              <Button
                width="196px"
                height="54px"
                color="#FFFFFF"
                bgColor="#D7380E"
                fontWeight="semibold"
                fontSize="xl"
                onClick={() => setCampaignModal(true)}
              >
                Add to cart
              </Button>
            </Stack>
          </Flex>

          <Stack>
            <Text
              color="#403F49"
              fontSize="3xl"
              align="center"
              fontWeight="semibold"
            >
              Location highlights
            </Text>
            <Stack align="center">
              <SimpleGrid gap="10" columns={[2, 2]} pt="5">
                {screen.screenHighlights.map((highlight: any, index: any) => (
                  <Flex align="center" key={index + 1}>
                    <BsCheck2Circle size="16px" color="black" />
                    <Text fontSize="sm" color="#787878" pl="3">
                      {highlight}
                    </Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </Stack>
            <Stack align="left" px={{ base: "2", lg: "20" }}>
              <Text
                color="#403F49"
                fontSize="4xl"
                align="left"
                fontWeight="semibold"
                pt="20"
              >
                Brands playing on this screens
              </Text>
              <SimpleGrid columns={[1, null, 3]} spacing="10" pt="5">
                {videosList &&
                  videosList
                    .slice(0, 3)
                    .map((video: any) => (
                      <AtvertiseBox video={video} key={video._id} />
                    ))}
              </SimpleGrid>
            </Stack>
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
              >
                See All
              </Button>
            </Flex>
          </Stack>
          <Box width="100%" height="551px" color="black.500" pb="10">
            <MyMap data={jsonData} geometry={jsonData.features[0].geometry} />
          </Box>
          <Stack px={{ base: "2", lg: "20" }}>
            <Stack>
              <Text
                fontSize="4xl"
                color="#403F49"
                fontWeight="bold"
                align="left"
              >
                Review
              </Text>
              <Box
                width={{ base: "100%", lg: "25%" }}
                bgColor="#F0F4FC"
                borderRadius="16px"
              >
                <Flex>
                  <Stack p="10" width={{ base: "70%", lg: "60%" }}>
                    <Flex align="center">
                      <Text fontSize="4xl" color="#403F49" fontWeight="bold">
                        {screen.rating}/
                      </Text>
                      <Text fontSize="lg" color="#403F49" fontWeight="bold">
                        5
                      </Text>
                    </Flex>
                    <Text
                      fontSize="sm"
                      color="#403F49"
                      fontWeight="semibold"
                      align="left"
                    >
                      {`Based on ${screen.numReviews} reviews`}
                    </Text>
                    <Flex>
                      <GiRoundStar
                        size="20px"
                        color={screen.rating >= 5 ? "#0EBCF5" : "#E2E2E2"}
                      />
                      <GiRoundStar
                        size="20px"
                        color={screen.rating >= 5 ? "#0EBCF5" : "#E2E2E2"}
                      />
                      <GiRoundStar
                        size="20px"
                        color={screen.rating >= 5 ? "#0EBCF5" : "#E2E2E2"}
                      />
                      <GiRoundStar
                        size="20px"
                        color={screen.rating >= 5 ? "#0EBCF5" : "#E2E2E2"}
                      />
                      <GiRoundStar
                        size="20px"
                        color={screen.rating >= 5 ? "#0EBCF5" : "#E2E2E2"}
                      />
                    </Flex>
                  </Stack>
                  <Stack pt="5" width={{ base: "20%", lg: "30%" }}>
                    <Flex align="center">
                      <Text fontSize="sm" color="#403F49" pr="3">
                        5
                      </Text>
                      <Progress
                        value={(100 * countEachRating["5"]) / screen.numReviews}
                        width="100%"
                        size="sm"
                        colorScheme="#0EBCF5"
                        bgColor="#90F8FF"
                      />
                    </Flex>
                    <Flex align="center">
                      <Text fontSize="sm" color="#403F49" pr="3">
                        4
                      </Text>
                      <Progress
                        value={(100 * countEachRating["4"]) / screen.numReviews}
                        width="100%"
                        size="sm"
                        colorScheme="#0EBCF5"
                        bgColor="#90F8FF"
                      />
                    </Flex>
                    <Flex align="center">
                      <Text fontSize="sm" color="#403F49" pr="3">
                        3
                      </Text>
                      <Progress
                        value={(100 * countEachRating["3"]) / screen.numReviews}
                        width="100%"
                        size="sm"
                        colorScheme="#0EBCF5"
                        bgColor="#90F8FF"
                      />
                    </Flex>
                    <Flex align="center">
                      <Text fontSize="sm" color="#403F49" pr="3">
                        2
                      </Text>
                      <Progress
                        value={(100 * countEachRating["2"]) / screen.numReviews}
                        width="100%"
                        size="sm"
                        colorScheme="#0EBCF5"
                        bgColor="#90F8FF"
                      />
                    </Flex>
                    <Flex align="center">
                      <Text fontSize="sm" color="#403F49" pr="3">
                        1
                      </Text>
                      <Progress
                        value={(100 * countEachRating["1"]) / screen.numReviews}
                        width="100%"
                        size="sm"
                        color="#0EBCF5"
                        bgColor="#90F8FF"
                      />
                    </Flex>
                  </Stack>
                </Flex>
              </Box>
              <Text
                fontSize="xl"
                color="#403F49"
                fontWeight="semibold"
                align="left"
                pt="10"
              >
                Rate your screen
              </Text>
              <Flex pt="5">
                <GiRoundStar
                  size="30px"
                  color={userScreenRating >= 1 ? "#0EBCF5" : "#E2E2E2"}
                  onClick={() => setUserScreenRating(1)}
                />
                <GiRoundStar
                  size="30px"
                  color={userScreenRating >= 2 ? "#0EBCF5" : "#E2E2E2"}
                  onClick={() => setUserScreenRating(2)}
                />
                <GiRoundStar
                  size="30px"
                  color={userScreenRating >= 3 ? "#0EBCF5" : "#E2E2E2"}
                  onClick={() => setUserScreenRating(3)}
                />
                <GiRoundStar
                  size="30px"
                  color={userScreenRating >= 4 ? "#0EBCF5" : "#E2E2E2"}
                  onClick={() => setUserScreenRating(4)}
                />
                <GiRoundStar
                  size="30px"
                  color={userScreenRating >= 5 ? "#0EBCF5" : "#E2E2E2"}
                  onClick={() => setUserScreenRating(5)}
                />
              </Flex>
              <Text
                fontSize="xl"
                color="#403F49"
                fontWeight="semibold"
                align="left"
                pt="10"
              >
                Write a review
              </Text>
              <Textarea
                placeholder="Enter your review here"
                width="30%"
                height="40%"
                color="#000000"
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
              />
              <Button onClick={handlePost} width="30%" py="3">
                Post
              </Button>

              <Stack pt="10" pb="20">
                {screen?.reviews.length > 0
                  ? screen.reviews.map((review: any, index: any) => (
                      <Review review={review} key={index + 1} />
                    ))
                  : null}
              </Stack>
            </Stack>
          </Stack>
          <ContactUs />
        </Stack>
      )}
    </Box>
  );
}
