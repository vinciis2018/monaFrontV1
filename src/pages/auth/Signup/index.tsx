import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { EmailVerificationModal } from "pages/authPopup/EmailVerificationModal";

export function Signup(props: any) {
  const navigate = useNavigate();
  const userSignin = useSelector((state: any) => state.userSignin);
  const [emailVerificationShow, setEmailVerificationShow] = useState<any>(true);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.defaultWallet) {
        navigate("/");
      } else {
        navigate("/welcome");
      }
    } else {
      setEmailVerificationShow(true);
    }
  }, [navigate, userInfo, navigate]);

  return (
    <Box>
      <EmailVerificationModal
        show={emailVerificationShow}
        onHide={() => setEmailVerificationShow(false)}
      />
    </Box>
  );
}
