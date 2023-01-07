import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import { LoginModal } from "pages/onboardingmodal/LoginModal";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const [loginModalShow, setLoginModalShow] = useState<any>(true);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [navigate, userInfo]);

  return (
    <Box px="2" pt="20" color="black.500">
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
    </Box>
  );
}
