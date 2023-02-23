import {
  CREATE_CAMPAIGN_REQUEST,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAIL,
  CAMPAIGN_LIST_REQUEST,
  CAMPAIGN_LIST_SUCCESS,
  CAMPAIGN_LIST_FAIL,
  CAMPAIGN_DETAILS_REQUEST,
  CAMPAIGN_DETAILS_SUCCESS,
  CAMPAIGN_DETAILS_FAIL,
} from "Constants/campaignConstants.js";

export function createCampaignReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_CAMPAIGN_REQUEST:
      return { loading: true };
    case CREATE_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        uploadedCampaign: action.payload,
        success: true,
      };
    case CREATE_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function campaignListAllReducer(state = { allCampaign: [] }, action) {
  switch (action.type) {
    case CAMPAIGN_LIST_REQUEST:
      return { loading: true };
    case CAMPAIGN_LIST_SUCCESS:
      return { loading: false, allCampaign: action.payload };
    case CAMPAIGN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function campaignDetailsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case CAMPAIGN_DETAILS_REQUEST:
      return { loading: true };
    case CAMPAIGN_DETAILS_SUCCESS:
      return { loading: false, video: action.payload };
    case CAMPAIGN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
