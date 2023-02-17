import { Box, Center, Stack, Image } from "@chakra-ui/react";

export function Page404() {
  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg">
          <Image
            src="https://bafybeig5yikppvzguivomuococm4rel7jvwq6kx2sbw2gjpkvrtfdya2ui.ipfs.w3s.link/404.png"
            alt=""
          />
        </Stack>
      </Center>
    </Box>
  );
}
