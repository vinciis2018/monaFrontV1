/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//hooks
import { useWallet } from "components/contexts";

import { Box } from "@chakra-ui/react";
//onbordeing popup
import { WelcomeModal } from "pages/onboardingmodal/WelcomeModal";
import { LoginModal } from "pages/onboardingmodal/LoginModal";
import { StartWalletModal } from "pages/onboardingmodal/StartWalletModal";
import { ViewSecrateKeyModal } from "pages/onboardingmodal/ViewSecrateKeyModal";
import { DisplaySecrateKeyModal } from "pages/onboardingmodal/DisplaySecrateKeyModal";
import { VerifySecrateKeyModal } from "pages/onboardingmodal/VerifySecrateKeyModal";

export function Welcome() {
  const navigate = useNavigate();

  const { hasEncryptedData } = useWallet();
  const [welcomeModalShow, setWelcomeModalShow] = useState<any>(false);
  const [loginModalShow, setLoginModalShow] = useState<any>(false);
  const [startWalletShow, setStartWalletShow] = useState<any>(false);
  const [viewSecrateKeyShow, setviewSecrateKeyShow] = useState<any>(false);
  const [displaySecrateKeyShow, setDisplaySecrateKeyShow] =
    useState<any>(false);
  const [verifySecrateKeyShow, setVerifySecrateKeyShow] = useState<any>(false);

  const userSignin = useSelector((state: any) => state.userSignin);

  const handleLoginModal = () => {
    console.log("handlePinCreateModal");
    setLoginModalShow(false);
    setStartWalletShow(true);
  };
  const handleStartwalletShow = () => {
    console.log("handlePinCreateModal");
    setStartWalletShow(false);
    setviewSecrateKeyShow(true);
  };
  const handleViewSecratekey = () => {
    console.log("handlePinCreateModal");
    setviewSecrateKeyShow(false);
    setDisplaySecrateKeyShow(true);
  };
  const handleViewSecratekeyContinue = () => {
    console.log("handlePinCreateModal");
    setDisplaySecrateKeyShow(false);
    setviewSecrateKeyShow(false);
    setVerifySecrateKeyShow(true);
  };
  const handleDisplayContinue = () => {
    console.log("handlePinCreateModal");
    setDisplaySecrateKeyShow(false);
    setVerifySecrateKeyShow(true);
  };
  const { userInfo, loading, error } = userSignin;

  useEffect(() => {
    hasEncryptedData().then((hasData) => {
      console.log(hasData);
      if (hasData) {
        navigate("/login");
      }
      if (!userInfo) {
        navigate("/signin");
      }
      if (userInfo && !hasData) {
        setWelcomeModalShow(true);
      }
    });
  }, [hasEncryptedData, navigate, userInfo]);

  const onClick = () => {
    navigate("/pin-create");
  };
  return (
    <Box px="2" pt="20" color="black.500">
      <WelcomeModal
        show={welcomeModalShow}
        onHide={() => setWelcomeModalShow(false)}
      />

      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
        onClick={handleLoginModal}
      />
      <StartWalletModal
        show={startWalletShow}
        onHide={() => setStartWalletShow(false)}
        onClick={handleStartwalletShow}
      />
      <ViewSecrateKeyModal
        show={viewSecrateKeyShow}
        onHide={() => setviewSecrateKeyShow(false)}
        onClick={handleViewSecratekey}
        onContinue={handleViewSecratekeyContinue}
      />
      <DisplaySecrateKeyModal
        show={displaySecrateKeyShow}
        onHide={() => setDisplaySecrateKeyShow(false)}
        onContinue={handleDisplayContinue}
      />
      <VerifySecrateKeyModal
        show={verifySecrateKeyShow}
        onHide={() => setVerifySecrateKeyShow(false)}
      />
    </Box>
  );
}
