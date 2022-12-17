import Axios from "axios";
import {
  GET_SINGLE_CREDIT_LOG_FAIL,
  GET_SINGLE_CREDIT_LOG_SUCCESS,
  GET_SINGLE_CREDIT_LOG_REQUEST,
} from "Constants/paymentConstants";

import { USER_DETAILS_REQUEST } from "Constants/userConstants";

export const getSingleLogDetails =
  ({ userId, tranjectionID }) =>
  async (dispatch, getState) => {
    dispatch({
      type: USER_DETAILS_REQUEST,
      payload: userId,
    });
    const {
      userSignin: { userInfo },
    } = getState();

    try {
      dispatch({
        type: GET_SINGLE_CREDIT_LOG_REQUEST,
        payload: tranjectionID,
      });
      const {
        userSignin: { userInfo },
      } = getState();
      if (userInfo) {
        const { data } = await Axios.get(
          `${process.env.REACT_APP_BLINDS_SERVER}/api/credit/logs/${tranjectionID}`,
          {
            headers: { Authorization: "Bearer " + userInfo.token },
          }
        );
        dispatch({
          type: GET_SINGLE_CREDIT_LOG_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_SINGLE_CREDIT_LOG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
