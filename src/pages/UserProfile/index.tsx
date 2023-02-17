import { Box, Stack, Image, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { getMyMedia } from "Actions/mediaActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import React, { useEffect, useState } from "react";
import { RiFileUploadLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export function UserProfile() {
  const [allMedia, setMyMedias] = useState<any>([]);
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  //console.log("userInfo 423432423", JSON.stringify(userInfo));
  const myMedia = useSelector((state: any) => state.myMedia);
  const { loading: loadingMyMedia, error: errorMyMedia, medias } = myMedia;
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (medias) {
      setMyMedias(medias);
    }
    dispatch(getMyMedia());
  }, [dispatch, allMedia]);
  return (
    <Box pt="20">
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
        <Box pt="200" width="30%" height="" pl="20">
          <Stack bgColor="#FEFEFE" p="5" boxShadow="2xl" position="relative">
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
                width="90%"
                p="3"
              >
                Edit profile
              </Button>
            </Stack>
            <Stack align="cetner" justifyContent="center" pt="5">
              <Button
                color="#313131"
                fontSize="xl"
                fontWeight="semibold"
                bgColor="#F1F1F1"
                width="90%"
                p="3"
                align="center"
              >
                Upload NFT{" "}
                <Stack pl="3">
                  <RiFileUploadLine size="20px" color="black" />
                </Stack>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Box pl="500" width="80%">
        <Stack>
          <Text
            color="#000000"
            fontSize="2xl"
            fontWeight="semibold"
            align="left"
          >
            Collections
          </Text>
        </Stack>
        <Stack pt="5">
          {allMedia.length === 0 ? (
            <Text color="#3A3A3A" fontSize="xl" align="left">
              Upload your first collection
            </Text>
          ) : null}

          {loadingMyMedia ? (
            <HLoading loading={loadingMyMedia} />
          ) : errorMyMedia ? (
            <MessageBox variant="danger">{errorMyMedia}</MessageBox>
          ) : (
            <SimpleGrid columns={[1, null, 2]} spacing={10}>
              {allMedia.map((media: any) => (
                <Stack key={media._id}>
                  <Image
                    src={`https://ipfs.io/ipfs/${media.cid}`}
                    alt="media"
                    width="100%"
                  ></Image>
                </Stack>
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
