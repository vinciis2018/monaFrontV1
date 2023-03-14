import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  Stack,
  IconButton,
  Text,
  FormControl,
  FormLabel,
  Box,
  Image,
  SimpleGrid,
  Button,
  Tooltip,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAnimation } from "framer-motion";
import { getFileData } from "services/utils";
import { useIpfs } from "components/contexts";
import HLoading from "components/atoms/HLoading";

export function UplaodCampaignThroughImage(props: any) {
  const controls = useAnimation();
  const { addFile } = useIpfs();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImages, setSelectedImage] = useState<any>([]);
  //const [selectedImages, setSelectedImage] = useState<any>([]);

  let hiddenInput: any = null;
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
  async function handlePhotoSelect(file: any) {
    setIsUploading(true);
    const fileThumbnail = URL.createObjectURL(file);
    const [dataBuffer] = await getFileData(fileThumbnail);
    // props.setFileUrl(dataBuffer);
    // console.log("Type of data buffer 2121: ", typeof dataBuffer, dataBuffer);
    addFile(dataBuffer).then(({ cid }) => {
      const strCid = cid.toString();
      // console.log("strcid : ", strCid)
      setSelectedImage([...selectedImages, `https://ipfs.io/ipfs/${strCid}`]);
      setIsUploading(false);
    });
    setIsUploading(false);
  }
  const removeImage = (index: any) => {
    const newImageList = selectedImages.filter(
      (image: any, i: any) => i !== index
    );
    setSelectedImage([...newImageList]);
  };
  const handleSelectImage = (imageUrl: any) => {
    setSelectedImage([...selectedImages, imageUrl]);
  };
  // console.log("seleced Image : ", selectedImages);
  const handleNext = () => {
    props.onHide();
    console.log("seleced Image : ", selectedImages);
    props.setImages([...selectedImages]);
    setSelectedImage([]);
    props.videoUploadHandler();
  };
  useEffect(() => {}, []);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        {isUploading ? (
          <HLoading loading={isUploading} />
        ) : (
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
                  Add campaign through Images
                </Text>
              </Stack>
              <FormControl pt="5">
                <FormLabel htmlFor="share" fontSize="lg">
                  Upload content/ Choges image from media
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
                      onChange={(e: any) =>
                        handlePhotoSelect(e.target.files[0])
                      }
                    />
                  </Box>
                </InputGroup>
              </FormControl>
              <Text
                fontSize="lg"
                fontWeight="light"
                color="#000000"
                align="left"
                pt="5"
              >
                Select Images : {selectedImages.length}
              </Text>
              <SimpleGrid columns={[1, null, 8]} gap={2}>
                {selectedImages?.map((image: any, index: any) => (
                  <Tooltip
                    label="Click for remove"
                    fontSize="md"
                    key={index + 1}
                    aria-label="A tooltip"
                    hasArrow
                    bg="red.600"
                  >
                    <Stack borderRadius="lg" boxShadow="2xl">
                      <Image
                        src={image}
                        alt=""
                        width="100%"
                        height="100%"
                        onClick={() => removeImage(index)}
                      ></Image>
                    </Stack>
                  </Tooltip>
                ))}
              </SimpleGrid>
              <Text
                fontSize="sm"
                fontWeight="light"
                color="#FF0000"
                align="left"
                pt="5"
                type="Button"
              >
                When image will not show please contact us
              </Text>
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
              <Stack pt="3">
                <SimpleGrid columns={[1, null, 5]} spacing={3}>
                  {props?.medias?.map((media: any) => (
                    <Stack key={media._id} borderRadius="lg">
                      <Image
                        src={media.thumbnail}
                        alt=""
                        width="100%"
                        height="100%"
                        onClick={() => handleSelectImage(media.thumbnail)}
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
        )}
      </Modal.Body>
    </Modal>
  );
}
