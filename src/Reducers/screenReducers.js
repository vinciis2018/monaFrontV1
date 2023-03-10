import {
  SCREEN_ALLY_GRANT_FAIL,
  SCREEN_ALLY_GRANT_REQUEST,
  SCREEN_ALLY_GRANT_RESET,
  SCREEN_ALLY_GRANT_SUCCESS,
  SCREEN_ALLY_PLEA_FAIL,
  SCREEN_ALLY_PLEA_REQUEST,
  SCREEN_ALLY_PLEA_RESET,
  SCREEN_ALLY_PLEA_SUCCESS,
  SCREEN_ALLY_REJECT_FAIL,
  SCREEN_ALLY_REJECT_REQUEST,
  SCREEN_ALLY_REJECT_RESET,
  SCREEN_ALLY_REJECT_SUCCESS,
  SCREEN_CREATE_FAIL,
  SCREEN_CREATE_REQUEST,
  SCREEN_CREATE_RESET,
  SCREEN_CREATE_SUCCESS,
  SCREEN_DELETE_FAIL,
  SCREEN_DELETE_REQUEST,
  SCREEN_DELETE_RESET,
  SCREEN_DELETE_SUCCESS,
  SCREEN_DETAILS_FAIL,
  SCREEN_DETAILS_REQUEST,
  SCREEN_DETAILS_SUCCESS,
  SCREEN_FLAG_FAIL,
  SCREEN_FLAG_REQUEST,
  SCREEN_FLAG_SUCCESS,
  SCREEN_LIKE_FAIL,
  SCREEN_LIKE_REQUEST,
  SCREEN_LIKE_SUCCESS,
  SCREEN_LIST_FAIL,
  SCREEN_LIST_REQUEST,
  SCREEN_LIST_SUCCESS,
  SCREEN_PARAMS_FAIL,
  SCREEN_PARAMS_REQUEST,
  SCREEN_PARAMS_SUCCESS,
  SCREEN_PIN_DETAILS_FAIL,
  SCREEN_PIN_DETAILS_REQUEST,
  SCREEN_PIN_DETAILS_SUCCESS,
  SCREEN_REVIEW_CREATE_FAIL,
  SCREEN_REVIEW_CREATE_REQUEST,
  SCREEN_REVIEW_CREATE_RESET,
  SCREEN_REVIEW_CREATE_SUCCESS,
  SCREEN_SUBSCRIBE_FAIL,
  SCREEN_SUBSCRIBE_REQUEST,
  SCREEN_SUBSCRIBE_SUCCESS,
  SCREEN_UNLIKE_FAIL,
  SCREEN_UNLIKE_REQUEST,
  SCREEN_UNLIKE_SUCCESS,
  SCREEN_UNSUBSCRIBE_FAIL,
  SCREEN_UNSUBSCRIBE_REQUEST,
  SCREEN_UNSUBSCRIBE_SUCCESS,
  SCREEN_UPDATE_FAIL,
  SCREEN_UPDATE_REQUEST,
  SCREEN_UPDATE_RESET,
  SCREEN_UPDATE_SUCCESS,
  SCREEN_VIDEOS_FAIL,
  SCREEN_VIDEOS_REQUEST,
  SCREEN_VIDEOS_SUCCESS,
  SCREEN_VIDEO_DELETE_FAIL,
  SCREEN_VIDEO_DELETE_REQUEST,
  SCREEN_VIDEO_DELETE_SUCCESS,
} from "Constants/screenConstants";

export function screenListReducer(
  state = { loading: true, screens: [] },
  action
) {
  switch (action.type) {
    case SCREEN_LIST_REQUEST:
      return { loading: true };
    case SCREEN_LIST_SUCCESS:
      return {
        loading: false,
        screens: action.payload.screens,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case SCREEN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function screenDetailsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case SCREEN_DETAILS_REQUEST:
      return { loading: true };
    case SCREEN_DETAILS_SUCCESS:
      return { loading: false, screen: action.payload };
    case SCREEN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//

export function screenCreateReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_CREATE_REQUEST:
      return { loading: true };
    case SCREEN_CREATE_SUCCESS:
      return { loading: false, success: true, screen: action.payload };
    case SCREEN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

//

export function screenUpdateReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_UPDATE_REQUEST:
      return { loading: true };
    case SCREEN_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SCREEN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
}

export function screenDeleteReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_DELETE_REQUEST:
      return { loading: true };
    case SCREEN_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SCREEN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_DELETE_RESET:
      return {};
    default:
      return state;
  }
}

// video videos get

export function screenVideosReducer(state = { videos: [] }, action) {
  switch (action.type) {
    case SCREEN_VIDEOS_REQUEST:
      return { loading: true };
    case SCREEN_VIDEOS_SUCCESS:
      return { loading: false, videos: action.payload };
    case SCREEN_VIDEOS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//

export function screenPinDetailsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case SCREEN_PIN_DETAILS_REQUEST:
      return { loading: true };
    case SCREEN_PIN_DETAILS_SUCCESS:
      return { loading: false, screenPin: action.payload };
    case SCREEN_PIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//

export function screenAllyPleaRequestReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_ALLY_PLEA_REQUEST:
      return { loading: true };
    case SCREEN_ALLY_PLEA_SUCCESS:
      return { loading: false, success: true, plea: action.payload };
    case SCREEN_ALLY_PLEA_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_ALLY_PLEA_RESET:
      return {};
    default:
      return state;
  }
}

export function screenParamsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case SCREEN_PARAMS_REQUEST:
      return { loading: true };
    case SCREEN_PARAMS_SUCCESS:
      return { loading: false, params: action.payload };
    case SCREEN_PARAMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// screen videos deleted

export function screenVideoDeleteReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_VIDEO_DELETE_REQUEST:
      return { loading: true };
    case SCREEN_VIDEO_DELETE_SUCCESS:
      return { loading: false, video: action.payload, success: true };
    case SCREEN_VIDEO_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function screenReviewCreateReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case SCREEN_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case SCREEN_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

// screen like

export function screenLikeReducer(state = { screen: {} }, action) {
  switch (action.type) {
    case SCREEN_LIKE_REQUEST:
      return { loading: true };
    case SCREEN_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        screen: action.payload,
        success: true,
      };
    case SCREEN_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// screen unlike

export function screenUnlikeReducer(state = { screen: {} }, action) {
  switch (action.type) {
    case SCREEN_UNLIKE_REQUEST:
      return { loading: true };
    case SCREEN_UNLIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        screen: action.payload,
        success: true,
      };
    case SCREEN_UNLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// screen subscribe

export function screenSubscribeReducer(state = { screen: {} }, action) {
  switch (action.type) {
    case SCREEN_SUBSCRIBE_REQUEST:
      return { loading: true };
    case SCREEN_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        loading: false,
        screen: action.payload,
        success: true,
      };
    case SCREEN_SUBSCRIBE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// screen unsubscribe

export function screenUnsubscribeReducer(state = { screen: {} }, action) {
  switch (action.type) {
    case SCREEN_UNSUBSCRIBE_REQUEST:
      return { loading: true };
    case SCREEN_UNSUBSCRIBE_SUCCESS:
      return {
        ...state,
        loading: false,
        screen: action.payload,
        success: true,
      };
    case SCREEN_UNSUBSCRIBE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// screen flag

export function screenFlagReducer(state = { screen: {} }, action) {
  switch (action.type) {
    case SCREEN_FLAG_REQUEST:
      return { loading: true };
    case SCREEN_FLAG_SUCCESS:
      return {
        ...state,
        loading: false,
        screen: action.payload,
        success: true,
      };
    case SCREEN_FLAG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function screenAllyPleaRejectReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_ALLY_REJECT_REQUEST:
      return { loading: true };
    case SCREEN_ALLY_REJECT_SUCCESS:
      return { loading: false, success: true, plea: action.payload };
    case SCREEN_ALLY_REJECT_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_ALLY_REJECT_RESET:
      return {};
    default:
      return state;
  }
}

export function screenAllyPleaGrantReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_ALLY_GRANT_REQUEST:
      return { loading: true };
    case SCREEN_ALLY_GRANT_SUCCESS:
      return { loading: false, success: true, plea: action.payload };
    case SCREEN_ALLY_GRANT_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_ALLY_GRANT_RESET:
      return {};
    default:
      return state;
  }
}

export function playlistCheckReducer(state = {}, action) {
  switch (action.type) {
    case "CHECK_PLAYLIST_REQUEST":
      return { loading: true };
    case "CHECK_PLAYLIST_SUCCESS":
      return { loading: false, data: action.payload };
    case "CHECK_PLAYLIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
