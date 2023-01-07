import { Box } from "@chakra-ui/react";
import { VerifySecrateKeyModal } from "pages/onboardingmodal/VerifySecrateKeyModal";
import { useState } from "react";

export function KeyConfirm() {
  const [verifySecrateKeyShow, setVerifySecrateKeyShow] = useState<any>(true);

  return (
    <Box px="2" pt="20" color="black.500">
      <VerifySecrateKeyModal
        show={verifySecrateKeyShow}
        onHide={() => setVerifySecrateKeyShow(false)}
      />
    </Box>
  );
}
