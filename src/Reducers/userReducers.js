import {
  SEND_MAIL_FAIL,
  SEND_MAIL_REQUEST,
  SEND_MAIL_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_SCREENS_FAIL,
  USER_SCREENS_REQUEST,
  USER_SCREENS_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_MEDIA_FAIL,
  USER_MEDIA_REQUEST,
  USER_MEDIA_SUCCESS,
  USER_CAMPAIGN_FAIL,
  USER_CAMPAIGN_REQUEST,
  USER_CAMPAIGN_SUCCESS,
} from "../Constants/userConstants";

export function userSignupReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
}

export function userDetailsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function userListReducer(state = { loading: true }, action) {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function userDeleteReducer(state = {}, action) {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
}

export function userUpdateProfileReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
}

// get user screens list

export function userScreensReducer(state = { screens: [] }, action) {
  switch (action.type) {
    case USER_SCREENS_REQUEST:
      return { loading: true };
    case USER_SCREENS_SUCCESS:
      return { loading: false, screens: action.payload };
    case USER_SCREENS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// get user video list

export function userCampaignReducer(state = { campaign: [] }, action) {
  switch (action.type) {
    case USER_CAMPAIGN_REQUEST:
      return { loading: true };
    case USER_CAMPAIGN_SUCCESS:
      return { loading: false, campaign: action.payload };
    case USER_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
export function userMediaReducer(state = { medias: [] }, action) {
  switch (action.type) {
    case USER_MEDIA_REQUEST:
      return { loading: true };
    case USER_MEDIA_SUCCESS:
      return { loading: false, medias: action.payload };
    case USER_MEDIA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function mailSendReducer(state = {}, action) {
  switch (action.type) {
    case SEND_MAIL_REQUEST:
      return { loading: true };
    case SEND_MAIL_SUCCESS:
      return { loading: false, data: action.payload };
    case SEND_MAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
