import Axios from "axios";
import {
  CREATE_CAMPAIGN_REQUEST,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAIL,
  CAMPAIGN_LIST_REQUEST,
  CAMPAIGN_LIST_SUCCESS,
  CAMPAIGN_LIST_FAIL,
  CAMPAIGN_DETAILS_FAIL,
  CAMPAIGN_DETAILS_REQUEST,
  CAMPAIGN_DETAILS_SUCCESS,
} from "Constants/campaignConstants.js";

export const createCamapaign =
  ({
    totalSlotBooked,
    startDate,
    endDate,
    startTime,
    endTime,
    screenId,
    mediaId,
    campaignName,
    thumbnail,
  }) =>
  async (dispatch, getState) => {
    dispatch({
      type: CREATE_CAMPAIGN_REQUEST,
      payload: {
        totalSlotBooked,
        startDate,
        endDate,
        startTime,
        endTime,
        screenId,
        mediaId,
        campaignName,
        thumbnail,
      },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/campaign/create`,
        {
          user: userInfo,
          totalSlotBooked,
          startDate,
          endDate,
          startTime,
          endTime,
          screenId,
          mediaId,
          campaignName,
          thumbnail,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: CREATE_CAMPAIGN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CREATE_CAMPAIGN_FAIL,
        payload: message,
      });
    }
  };

export const getCampaignList = () => async (dispatch) => {
  dispatch({ type: CAMPAIGN_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/campaign/all`
    );
    console.log("all campaign data : ", data);
    dispatch({ type: CAMPAIGN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CAMPAIGN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCampaignDetail = (campaignId) => async (dispatch) => {
  dispatch({
    type: CAMPAIGN_DETAILS_REQUEST,
    payload: campaignId,
  });

  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/campaign/${campaignId}`
    );
    dispatch({
      type: CAMPAIGN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAMPAIGN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCampaignListByScreenId = (screenId) => async (dispatch) => {
  dispatch({
    type: CAMPAIGN_DETAILS_REQUEST,
    payload: screenId,
  });

  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/campaign/${screenId}/screen`
    );
    dispatch({
      type: CAMPAIGN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAMPAIGN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
