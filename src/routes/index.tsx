import { Routes, Route, Navigate } from "react-router-dom";
// pages
import {
  // onboarding

  Welcome,
  KeyManagement,
  KeyPhraseSave,
  KeyConfirm,
  KeyRecovery,
  PinCreate,
  PinSuccess,
  AllAds,
  // CameraHome,

  // auth
  Login,
  Logout,
  // setting

  // Setting,
  // Recovery,
  // RecoveryView,
  // WifiTesting,
  // SelfDestructPin,
  // SelfDestruct,
  // SelfDestructPinSuccess,
  // Advanced,
  // UpdatePin,
  // UpdatePinSuccess,

  // other
  Signin,
  Signup,
  // MapBox,
  // Screens,
  // ScreenDetails,
  // ScreenPlayer,
  // Adverts,
  // AdvertDetails,
  // UserProfile,
  // ScreenEdit,
  // AdvertCreate,
  // AdvertEdit,
  // ScreenDashboard,
  // UserDashboard,
  // CampaignDashboard,
  // PleaBucket,
  // NFT,
  CreateResetPassword,
  Page404,
  WalletPage,
  PaymentReceipt,
  ViewSecrateKey,
  HomePage,
  SendMoney,
  RequestMoney,
  AllScreens,
  ScreenDetail,
  ScreenOwner,
  CreateScreen,
  EditScreen,
  UserProfile,
  CartAndSummary,
  CampaignListOfUser,
  CampaignDetails,
} from "pages";
import { FooterPage, NavBar } from "components/common";
import { EmailVerificationForForgetPassword } from "pages/auth/EmailVerificationForForgetPassword";

export const PublicRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* onboarding */}
        <Route path="/" element={<HomePage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/key-management" element={<KeyManagement />} />
        <Route path="/key-phrase-save" element={<KeyPhraseSave />} />
        <Route path="/key-confirm" element={<KeyConfirm />} />
        <Route path="/key-recovery" element={<KeyRecovery />} />
        <Route path="/pin-create" element={<PinCreate />} />
        <Route path="/pin-success" element={<PinSuccess />} />
        <Route path="/view-secrate-key" element={<ViewSecrateKey />} />
        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/create-reset-password/:email/:name"
          element={<CreateResetPassword />}
        />
        <Route
          path="/forgetPassword"
          element={<EmailVerificationForForgetPassword />}
        />

        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/allads" element={<AllAds />} />
        <Route path="/all-screens" element={<AllScreens />} />
        <Route path="/screen/:id" element={<ScreenDetail />} />
        <Route path="/screen-owner" element={<ScreenOwner />} />
        <Route path="/create-screen" element={<CreateScreen />} />
        <Route path="/edit-screen/:id" element={<EditScreen />} />
        <Route
          path="/carts/:mediaId/:screenId/:name/:url"
          element={<CartAndSummary />}
        />
        <Route path="/myCampaignList" element={<CampaignListOfUser />} />
        <Route path="/campaignDetails/:id" element={<CampaignDetails />} />
        <Route path="/walletpage" element={<WalletPage />} />
        <Route path="/paymentreceipt/:id" element={<PaymentReceipt />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/request-money" element={<RequestMoney />} />
        <Route path="*" element={<Page404 />} />
        {/* upload */}
      </Routes>
      <FooterPage />
    </>
  );
};
