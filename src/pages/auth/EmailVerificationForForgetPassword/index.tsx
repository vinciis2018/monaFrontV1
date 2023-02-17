import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import { EmailVerificationForForgetPasswordModal } from "pages/authPopup/EmailVerificationForForgetPasswordModal";

export function EmailVerificationForForgetPassword(props: any) {
  const userSignin = useSelector((state: any) => state.userSignin);
  const [
    emailVerificationForgetPasswordShow,
    setEmailVerificationForgetPasswordShow,
  ] = useState<any>(true);

  return (
    <Box>
      <EmailVerificationForForgetPasswordModal
        show={emailVerificationForgetPasswordShow}
        onHide={() => setEmailVerificationForgetPasswordShow(false)}
      />
    </Box>
  );
}
