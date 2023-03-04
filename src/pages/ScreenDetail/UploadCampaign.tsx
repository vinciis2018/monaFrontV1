import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  Stack,
  IconButton,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Box,
  Image,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAnimation } from "framer-motion";
import { getFileData } from "services/utils";

export function UploadCampaign(props: any) {
  const { medias } = props;
  // console.log("medial in UploadCampaign ", medias);
  const controls = useAnimation();
  const [selectedMedia, setSelectedMedia] = useState<any>("");
  const [isUploading, setIsUploading] = useState<any>(false);
  const [screenImage, setScreenImage] = useState<any>();
  let hiddenInput: any = null;
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();

  const handleSelectMedia = (media: any) => {
    props.setMediaId(media._id);
    //console.log("media selected : ", media.media);
    setSelectedMedia(media.media);
    props.setIsOldMedia(true);
  };
  async function handlePhotoSelect(file: any) {
    setIsUploading(true);
    const fileThumbnail = URL.createObjectURL(file);
    const [dataBuffer] = await getFileData(fileThumbnail);
    props?.setFileUrl(dataBuffer);
    props?.setIsOldMedia(false);
    setSelectedMedia(fileThumbnail);
    setIsUploading(false);
  }
  const handleNext = () => {
    if (props?.isCameFromUserProfile) {
      props?.uploadMediaFromUserProfile();
    }
    props.onHide();
    props.openUploadThumbnailModal();
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <Box bgColor="#FFFFFF">
          <Stack align="end" justifyContent="flex-end">
            <IconButton
              bg="none"
              icon={
                <AiOutlineCloseCircle
                  size="40px"
                  fontWeight="10"
                  color="black"
                  onClick={props.onHide}
                />
              }
              aria-label="Close"
            />
          </Stack>
          <Stack p="5">
            <Stack align="center">
              <Text fontSize="xl" fontWeight="semibold" color="#000000">
                Add campaign
              </Text>
            </Stack>
            <FormControl pt="5">
              <FormLabel htmlFor="share" fontSize="lg">
                Upload content
              </FormLabel>
              <InputGroup>
                <Box
                  height="90px"
                  width="100%"
                  border="1px"
                  align="center"
                  justifyContent="center"
                  type="Button"
                  isLoading={isUploading}
                  loadingText="Uploading..."
                  onClick={() => hiddenInput.click()}
                >
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color="#000000"
                    p="8"
                  >
                    Drag & Drop{" "}
                  </Text>
                  <Input
                    hidden
                    type="file"
                    ref={(el) => (hiddenInput = el)}
                    // accept="image/png, image/jpeg"
                    onDragEnter={startAnimation}
                    onDragLeave={stopAnimation}
                    onChange={(e: any) => handlePhotoSelect(e.target.files[0])}
                  />
                </Box>
              </InputGroup>
            </FormControl>
            {selectedMedia ? (
              <Box
                as="video"
                src={selectedMedia}
                autoPlay
                loop
                muted
                display="inline-block"
                borderRadius="24px"
                height={{ base: "100%", lg: "50%" }}
              ></Box>
            ) : null}

            <Text
              fontSize="lg"
              fontWeight="light"
              color="#000000"
              align="left"
              pt="5"
              type="Button"
            >
              Or select content
            </Text>
            <Stack pt="5">
              <SimpleGrid columns={[1, null, 3]} spacing={3}>
                {medias?.map((media: any) => (
                  <Stack
                    key={media._id}
                    borderRadius="lg"
                    onClick={() => handleSelectMedia(media)}
                  >
                    <Image
                      src={media.thumbnail}
                      alt=""
                      width="100%"
                      height="100%"
                    ></Image>
                  </Stack>
                ))}
              </SimpleGrid>
            </Stack>
            <Stack pt="10">
              <Button
                variant="outline"
                borderColor="#000000"
                border="2px"
                color="#D7380E"
                fontSize="lg"
                fontWeight="semiBold"
                width="40%"
                p="2"
                onClick={handleNext}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal.Body>
    </Modal>
  );
}
