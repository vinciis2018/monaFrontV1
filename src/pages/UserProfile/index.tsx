import { Box, Stack, Image, Text, Button, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { RiFileUploadLine } from "react-icons/ri";

export function UserProfile() {
  const collection = [
    {
      _id: "1",
      image:
        "https://bafybeid7zb5iw4oy7jvj7emoenrdrhmsfhh5smph3ce4u5ew4oayaw5uje.ipfs.w3s.link/pepsi.png",
    },
    {
      _id: "2",
      image:
        "https://bafybeic5qx24cqwvytaoqovdz2l2n4uzbff3f7ugkljqs5ekg3rz2c6ine.ipfs.w3s.link/fesbook.png",
    },
    {
      _id: "3",
      image:
        "https://bafybeihcaruado32uog3nagvxoilh6vnglbair4kqgrkplybkgddbcebpe.ipfs.w3s.link/magdonal.png",
    },
    {
      _id: "4",
      image:
        "https://bafybeiakotdgoccefe6vify2x2wpv3qfqz4abquq4jqmnm5357q2aulbsm.ipfs.w3s.link/flower.png",
    },
    {
      _id: "5",
      image:
        "https://bafybeigo2yio7yigraerutye74lossybforxvlpr2uosisf3yxbgrbkuvy.ipfs.w3s.link/girlAds.png",
    },
    {
      _id: "6",
      image:
        "https://bafybeige5wxbqyb6vdftdgxssja6dloplrv26pv4b7ctxhoz35uxz6sg2e.ipfs.w3s.link/coca%20cola.png",
    },
  ];
  return (
    <Box pt="10">
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
        <Box pt="200" width="20%" height="" pl="20">
          <Stack bgColor="#FEFEFE" p="5" boxShadow="2xl">
            <Stack align="center" pt="5">
              <Image
                alt="user Image"
                borderRadius="full"
                boxSize="150px"
                src="https://bafybeifp4ffz7qj5fhfeejtnuofbke77rh5tsqxctbnsxxg4uzko6yxwhq.ipfs.w3s.link/userprofile.png"
              ></Image>
            </Stack>
            <Stack>
              <Text
                color="#313131"
                fontSize="xl"
                fontWeight="semibold"
                align="left"
              >
                Brand Name
              </Text>
              <Text color="#593FFC" fontSize="lg" align="left">
                tanirika.das@aim.org
              </Text>
              <Text color="#313131" fontSize="lg" align="left">
                +91-8638235341
              </Text>
              <Text color="#747474" fontSize="lg" align="left">
                Lakshadweep, Pincode-676491
              </Text>
            </Stack>
            <Stack align="cetner" justifyContent="center" pt="10">
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
            <Stack align="cetner" justifyContent="center" pt="10">
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
          <SimpleGrid columns={[1, null, 2]} spacing={10}>
            {collection.map((eachCollection: any) => (
              <Stack key={eachCollection._id}>
                <Image
                  src={eachCollection.image}
                  alt={eachCollection.image}
                  width="100%"
                ></Image>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
}
