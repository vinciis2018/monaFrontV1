import Axios from "axios";
import {
  CREATE_CAMPAIGN_REQUEST,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAIL,
} from "Constants/campaignConstants.js";

export const createCamapaign =
  ({
    totalSlotBooked,
    startDate,
    endDate,
    startTime,
    endTime,
    screenId,
    videoId,
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
        videoId,
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
          videoId,
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
