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

  // CameraHome,

  // Active,
  // PhotoView,
  // UploadConfirm,
  // Success,

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
  // CustomImages,
  // NFT,
  // CustomCreate,
  CreateResetPassword,
  Home,
  Page404,
  UserProfile1,
  WalletPage,
  PaymentReceipt,
  TopupWallet,
  ViewSecrateKey,
  HomePage,
} from "pages";
import { Nav, Footer } from "components/common";

export const PublicRoutes = () => {
  return (
    <>
      <Nav />
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
          path="/create-reset-password/:email"
          element={<CreateResetPassword />}
        />
        <Route path="/userProfile1" element={<UserProfile1 />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/homepage" element={<HomePage />} />

        <Route path="/walletpage" element={<WalletPage />} />
        <Route path="/paymentreceipt" element={<PaymentReceipt />} />
        <Route path="/topup" element={<TopupWallet />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
};
