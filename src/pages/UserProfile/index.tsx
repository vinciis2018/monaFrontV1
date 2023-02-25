import {
  Box,
  Stack,
  Image,
  Text,
  Button,
  SimpleGrid,
  // Flex,
} from "@chakra-ui/react";
import { userMediasList } from "Actions/userActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import React, { useEffect } from "react";
import { RiFileUploadLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export function UserProfile() {
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  //console.log("userInfo 423432423", JSON.stringify(userInfo));
  const myMedia = useSelector((state: any) => state.userMedia);
  const { loading: loadingMyMedia, error: errorMyMedia, medias } = myMedia;
  //console.log("medias : ", JSON.stringify(medias));

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(userMediasList(userInfo));
  }, [dispatch, userInfo]);
  return (
    <Stack pt="20" height="100%">
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
        <Box pt="200" width="30%" height="" pl="10">
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
                // width="100%"
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
                // width="100%"
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
      <Box pl="10" align="right">
        <Stack align="end" p="5">
          <Stack width="70%" align="left">
            <Text
              color="#000000"
              fontSize="2xl"
              fontWeight="semibold"
              align="left"
            >
              Collections
            </Text>
            {medias?.length === 0 ? (
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
                {medias?.map((media: any) => (
                  <Stack key={media._id}>
                    <Image
                      src={media.thumbnail}
                      alt="media"
                      width="100%"
                    ></Image>
                    <Text color="#000000" align="left" fontWeight="semibold">
                      {media.title}
                    </Text>
                  </Stack>
                ))}
              </SimpleGrid>
            )}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
