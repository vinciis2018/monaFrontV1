import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { EmailVerificationModal } from "pages/authPopup/EmailVerificationModal";

export function Signup(props: any) {
  const [emailVerificationShow, setEmailVerificationShow] = useState<any>(true);

  return (
    <Box>
      <EmailVerificationModal
        show={emailVerificationShow}
        onHide={() => setEmailVerificationShow(false)}
      />
    </Box>
  );
}
