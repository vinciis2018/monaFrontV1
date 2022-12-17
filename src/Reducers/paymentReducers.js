import {
  GET_SINGLE_CREDIT_LOG_FAIL,
  GET_SINGLE_CREDIT_LOG_SUCCESS,
  GET_SINGLE_CREDIT_LOG_REQUEST,
} from "Constants/paymentConstants";

export function getSingleLogDetailsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case GET_SINGLE_CREDIT_LOG_REQUEST:
      return { loading: true };
    case GET_SINGLE_CREDIT_LOG_SUCCESS:
      return { loading: false, calender: action.payload };
    case GET_SINGLE_CREDIT_LOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
