import { Box } from "@chakra-ui/react";
import { DisplaySecrateKeyModal } from "pages/onboardingmodal/DisplaySecrateKeyModal";
import { useState } from "react";

export function KeyPhraseSave() {
  const [displaySecrateKeyShow, setDisplaySecrateKeyShow] = useState<any>(true);

  return (
    <Box px="2" pt="20" color="black.500">
      <DisplaySecrateKeyModal
        show={displaySecrateKeyShow}
        onHide={() => setDisplaySecrateKeyShow(false)}
        // onContinue={handleDisplayContinue}
      />
    </Box>
  );
}
