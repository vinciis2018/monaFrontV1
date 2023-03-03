import { Box, Stack, Image, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { userMediasList } from "Actions/userActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { UserCollections } from "components/common/UserCollections";
import { useIpfs } from "components/contexts";
import { CreateNewCampaign } from "pages/ScreenDetail/CreateNewCampaign";
import { UploadCampaign } from "pages/ScreenDetail/UploadCampaign";
import { uploadMedia } from "Actions/mediaActions";
import React, { useEffect, useState } from "react";
import { RiFileUploadLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export function UserProfile() {
  const { addFile } = useIpfs();
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const [loading, setLoading] = useState<any>();
  const [campaignName, setCampaignName] = useState<any>("");
  const [fileUrl, setFileUrl] = useState<any>("");
  const [campaignModal, setCampaignModal] = useState<any>(false);
  const [uploadCampaignModal, setUploadCampaignModal] = useState<any>(false);
  const [isOldMedia, setIsOldMedia] = useState<any>(true);
  //console.log("userInfo 423432423", JSON.stringify(userInfo));
  const mediaUpload = useSelector((state: any) => state.mediaUpload);
  const {
    loading: loadingmediaUpload,
    error: errormediaUpload,
    media,
  } = mediaUpload;
  //console.log("media : ", media);
  const myMedia = useSelector((state: any) => state.userMedia);
  const { loading: loadingMyMedia, error: errorMyMedia, medias } = myMedia;
  const uploadMediaFromUserProfile = () => {
    console.log("new media new thumbnail");
    setLoading(true);
    addFile(fileUrl)
      .then(({ cid }) => {
        const media = cid.toString();
        uploadMedia({
          title: campaignName,
          media: `https://ipfs.io/ipfs/${media}`,
          thumbnail: ``,
        });
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (media) {
      alert("media created successfull!");
    }
    dispatch(userMediasList(userInfo));
  }, [dispatch, userInfo]);
  return (
    <Box pt={{ base: "3", lg: "20" }} height="130%">
      <CreateNewCampaign
        show={campaignModal}
        onHide={() => setCampaignModal(false)}
        openUploadCampaignModal={() => setUploadCampaignModal(true)}
        setCampaignName={(e: any) => setCampaignName(e.target.value)}
        campaignName={campaignName}
        openUploadCampaignThrougnImages={() => {}}
      />
      <UploadCampaign
        show={uploadCampaignModal}
        onHide={() => setUploadCampaignModal(false)}
        setFileUrl={(value: any) => setFileUrl(value)}
        medias={[]}
        setIsOldMedia={(value: any) => setIsOldMedia(value)}
        isCameFromUserProfile={true}
        uploadMediaFromUserProfile={uploadMediaFromUserProfile}
      />
      <Box
        width="100%"
        height="350px"
        display="inline-block"
        backgroundImage="url(https://bafybeicbr46w37z6eoazs2eokarvx53dmqcsutvbryiu3jbygiee5fhq5a.ipfs.w3s.link/Rectangle.png)"
        backgroundRepeat="no-repeat"
        // backgroundAttachment="fixed"
        backgroundSize="cover"
        position="relative"
      >
        <SimpleGrid columns={[1, null, 2]} spacing="" pt="5">
          <Box
            pt="200"
            width={{ base: "100%", lg: "60%" }}
            height=""
            pl={{ base: "3", lg: "20" }}
            pr={{ base: "3" }}
          >
            <Stack
              bgColor="#FEFEFE"
              p="5"
              boxShadow="2xl"
              position="relative"
              borderRadius="10px"
            >
              <Stack align="center" pt="5">
                <Image
                  alt="user Image"
                  borderRadius="full"
                  boxSize="150px"
                  //src="https://bafybeifp4ffz7qj5fhfeejtnuofbke77rh5tsqxctbnsxxg4uzko6yxwhq.ipfs.w3s.link/userprofile.png"
                  src={userInfo.avatar}
                ></Image>
              </Stack>
              <Stack>
                <Text
                  color="#313131"
                  fontSize="xl"
                  fontWeight="semibold"
                  align="left"
                >
                  {userInfo.name}
                </Text>
                <Text color="#593FFC" fontSize="lg" align="left">
                  {userInfo.email}
                </Text>
                <Text color="#313131" fontSize="lg" align="left">
                  +91-{userInfo.phone}
                </Text>
                <Text color="#747474" fontSize="lg" align="left">
                  {`${userInfo.districtCity}, Pincode-${userInfo.pincode}`}
                </Text>
              </Stack>
              <Stack align="cetner" justifyContent="center" pt="5">
                <Button
                  color="#FFFFFF"
                  fontSize="xl"
                  fontWeight="semibold"
                  bgColor="#D7380E"
                  // width="100%"
                  p="3"
                >
                  Edit profile
                </Button>
              </Stack>
              <Stack
                align="cetner"
                justifyContent="center"
                pt="5"
                boxShadow="2xl"
              >
                <Button
                  color="#313131"
                  fontSize="xl"
                  fontWeight="semibold"
                  bgColor="#F1F1F1"
                  // width="100%"
                  p="3"
                  align="center"
                  //onClick={() => setCampaignModal(true)}
                >
                  Upload NFT{" "}
                  <Stack pl="3">
                    <RiFileUploadLine size="20px" color="black" />
                  </Stack>
                </Button>
              </Stack>
              <Stack pt="20"></Stack>
            </Stack>
          </Box>
          <Box
            pt={{ base: "100%", lg: "350" }}
            width={{ base: "100%", lg: "100%" }}
            height=""
            pr={{ base: "3", lg: "20" }}
          >
            <Stack align="left">
              <Text
                color="#000000"
                fontSize="2xl"
                fontWeight="semibold"
                align="left"
              >
                Collections
              </Text>
              {medias?.length === 0 ? (
                <Stack>
                  <Text color="#3A3A3A" fontSize="xl" align="left">
                    Upload your first collection
                  </Text>
                  <Image
                    src="https://s3-alpha-sig.figma.com/img/ca29/f93f/58db42ff92848405ab0da2be110fd228?Expires=1678665600&Signature=TVT1uDTDsAjPuSIDQ2wNMp-KUGgX6DdL5UwXT2BhPB6b6gRVfUlaUSatCC2hReLXKIHp9ABYmAHK7JXW3qm5FSqWCfUUqQC3OFgfSqcwLY7x1Di3ezJtAyX9pWcE6Vg7jVCP8bS31vnDt00rXnxGPGbah3hz7CZ5dYnpRoUyTv-Ca6AVSP9UFmiN5jkUj9rp6CIVwwHlrxUc4UnqfOpWk9evHI~IH0CGDbQ~3zdL-m8FZa5fdde1dxdCdFcpEsMPOaee7fdG1QqJrc5ojF5-KeC4oEAcBmb~taMT3Kx7FhycohDTaWlzzADsbxRCMdmdlPNljGv8x1VR6ekUBrOCrg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt=""
                    height="40px"
                    width="40px"
                  />{" "}
                </Stack>
              ) : null}

              {loadingMyMedia ? (
                <HLoading loading={loadingMyMedia} />
              ) : errorMyMedia ? (
                <MessageBox variant="danger">{errorMyMedia}</MessageBox>
              ) : (
                <SimpleGrid columns={[1, null, 1]} spacing="5" pt="5">
                  {medias?.map((media: any) => (
                    <Stack key={media._id}>
                      <UserCollections props={media} />
                    </Stack>
                  ))}
                </SimpleGrid>
              )}
            </Stack>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
