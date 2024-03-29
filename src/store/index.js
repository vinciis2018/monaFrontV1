import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import {
  createCampaignReducer,
  campaignListAllReducer,
  campaignDetailsReducer,
  campaignListByScreenIDReducer,
  campaignDeleteReducer,
} from "Reducers/campaignReducers";

import {
  mailSendReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userScreensReducer,
  userSigninReducer,
  userSignupReducer,
  userUpdateProfileReducer,
  userCampaignReducer,
  userMediaReducer,
} from "Reducers/userReducers";
import {
  walletCreateReducer,
  walletEditReducer,
  getWalletDataReducer,
  getTranjectionDatatReducer,
} from "Reducers/walletReducers";
import {
  allMediaReducer,
  mediaGetReducer,
  videoFromImagesReducer,
  mediaUploadReducer,
  myMediaReducer,
} from "Reducers/mediaReducers";
import {
  playlistCheckReducer,
  screenAllyPleaGrantReducer,
  screenAllyPleaRejectReducer,
  screenAllyPleaRequestReducer,
  screenCreateReducer,
  screenDeleteReducer,
  screenDetailsReducer,
  screenFlagReducer,
  screenLikeReducer,
  screenListReducer,
  screenParamsReducer,
  screenPinDetailsReducer,
  screenReviewCreateReducer,
  screenSubscribeReducer,
  screenUnlikeReducer,
  screenUnsubscribeReducer,
  screenUpdateReducer,
  screenVideoDeleteReducer,
  screenVideosReducer,
} from "Reducers/screenReducers";
import {
  videoDeleteReducer,
  videoDetailsReducer,
  videoFlagReducer,
  videoLikeReducer,
  videoListAllReducer,
  videoParamsReducer,
  videoReviewReducer,
  videoUnlikeReducer,
  videoUpdateReducer,
  videoUploadReducer,
} from "Reducers/advertReducers";
import {
  jsonPinsReducer,
  pinDetailsReducer,
  pinUpdateReducer,
} from "Reducers/pinReducers";
import { allPleasListReducer } from "Reducers/pleaReducers";
import {
  calenderDataAddReducer,
  calenderDaySlotBookReducer,
  dayBookingReducer,
  screenCalenderReducer,
  slotBookingReducer,
} from "Reducers/calendarReducers";
import {
  advertGameCreateReducer,
  advertGameDetailsReducer,
  advertGameRemoveReducer,
  screenGameCreateReducer,
  screenGameDetailsReducer,
  screenGameRemoveReducer,
} from "Reducers/gameReducers";

import { getSingleLogDetailsReducer } from "Reducers/paymentReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  createCampaign: createCampaignReducer,
  campaignListAll: campaignListAllReducer,
  campaignDetail: campaignDetailsReducer,
  campaignListByScreenId: campaignListByScreenIDReducer,
  campaignDelete: campaignDeleteReducer,

  playlistCheck: playlistCheckReducer,

  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userScreens: userScreensReducer,
  userCampaign: userCampaignReducer,
  userMedia: userMediaReducer,
  mailSend: mailSendReducer,

  walletCreate: walletCreateReducer,
  walletEdit: walletEditReducer,
  getWalletData: getWalletDataReducer,
  getTranjectionData: getTranjectionDatatReducer,

  mediaUpload: mediaUploadReducer,
  mediaGet: mediaGetReducer,
  allMedia: allMediaReducer,
  myMedia: myMediaReducer,
  videoFromImages: videoFromImagesReducer,

  screenList: screenListReducer,
  screenDetails: screenDetailsReducer,
  screenCreate: screenCreateReducer,
  screenUpdate: screenUpdateReducer,
  screenDelete: screenDeleteReducer,
  screenVideos: screenVideosReducer,
  screenPinDetails: screenPinDetailsReducer,
  screenAllyPleaRequest: screenAllyPleaRequestReducer,
  screenParams: screenParamsReducer,
  screenVideoDelete: screenVideoDeleteReducer,
  screenReviewCreate: screenReviewCreateReducer,
  screenLike: screenLikeReducer,
  screenUnlike: screenUnlikeReducer,
  screenSubscribe: screenSubscribeReducer,
  screenUnsubscribe: screenUnsubscribeReducer,
  screenFlag: screenFlagReducer,
  screenAllyPleaReject: screenAllyPleaRejectReducer,
  screenAllyPleaGrant: screenAllyPleaGrantReducer,

  allPleasList: allPleasListReducer,

  screenCalender: screenCalenderReducer,
  calenderDataAdd: calenderDataAddReducer,
  calenderDaySlotBook: calenderDaySlotBookReducer,
  slotBooking: slotBookingReducer,
  dayBooking: dayBookingReducer,

  screenGameDetails: screenGameDetailsReducer,
  screenGameCreate: screenGameCreateReducer,
  screenGameRemove: screenGameRemoveReducer,
  advertGameDetails: advertGameDetailsReducer,
  advertGameCreate: advertGameCreateReducer,
  advertGameRemove: advertGameRemoveReducer,

  videoListAll: videoListAllReducer,
  videoUpload: videoUploadReducer,
  videoDetails: videoDetailsReducer,
  videoParams: videoParamsReducer,
  videoUpdate: videoUpdateReducer,
  videoDelete: videoDeleteReducer,
  videoLike: videoLikeReducer,
  videoUnlike: videoUnlikeReducer,
  videoFlag: videoFlagReducer,
  videoReview: videoReviewReducer,

  jsonPins: jsonPinsReducer,
  pinDetails: pinDetailsReducer,
  pinUpdate: pinUpdateReducer,

  getSingleLogDetails: getSingleLogDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
