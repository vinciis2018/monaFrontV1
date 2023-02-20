import {
  CREATE_CAMPAIGN_REQUEST,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAIL,
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
