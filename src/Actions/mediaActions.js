import Axios from "axios";
import {
  GET_ALL_MEDIA_FAIL,
  GET_ALL_MEDIA_REQUEST,
  GET_ALL_MEDIA_SUCCESS,
  GET_MEDIA_FAIL,
  GET_MEDIA_REQUEST,
  GET_MEDIA_SUCCESS,
  GET_MY_MEDIA_FAIL,
  GET_MY_MEDIA_REQUEST,
  GET_MY_MEDIA_SUCCESS,
  GENERATE_VIDEO_FROM_IMAGES_FAIL,
  GENERATE_VIDEO_FROM_IMAGES_REQUEST,
  GENERATE_VIDEO_FROM_IMAGES_SUCCESS,
  MEDIA_UPLOAD_FAIL,
  MEDIA_UPLOAD_REQUEST,
  MEDIA_UPLOAD_SUCCESS,
} from "Constants/mediaConstants";

export const uploadMedia =
  ({ title, media, thumbnail }) =>
  async (dispatch, getState) => {
    dispatch({
      type: MEDIA_UPLOAD_REQUEST,
      payload: { title, media, thumbnail },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    console.log("userInfo : ", userInfo);
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/medias/create`,

        { userInfo, title, media, thumbnail },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: MEDIA_UPLOAD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEDIA_UPLOAD_FAIL,
        payload: message,
      });
    }
  };

export const getMedia = (mediaId) => async (dispatch, getState) => {
  dispatch({
    type: GET_MEDIA_REQUEST,
    payload: mediaId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/medias/${mediaId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: GET_MEDIA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_MEDIA_FAIL,
      payload: message,
    });
  }
};

export const getAllMedia = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_MEDIA_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/medias`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: GET_ALL_MEDIA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_ALL_MEDIA_FAIL,
      payload: message,
    });
  }
};

export const getMyMedia = () => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_MEDIA_REQUEST,
    // payload: userInfo,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/medias/${userInfo._id}/myMedias`,
      userInfo,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: GET_MY_MEDIA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_MY_MEDIA_FAIL,
      payload: message,
    });
  }
};

export const generateVideoFromImages =
  (images, duration, width, height) => async (dispatch, getState) => {
    dispatch({
      type: GENERATE_VIDEO_FROM_IMAGES_REQUEST,
      payload: images,
      duration,
      width,
      height,
    });
    // console.log("generateVideoFromImages called!");
    try {
      const { data } = await Axios.post(
        // `${process.env.REACT_APP_BLINDS_SERVER}/api/media/createVideoFromImages`,
        `https://www.server.vinciis.in/i2v`,
        { images, duration, width, height }
      );
      // console.log("generateVideoFromImages called!", data);
      dispatch({
        type: GENERATE_VIDEO_FROM_IMAGES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.log("generateVideoFromImages called error!", error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GENERATE_VIDEO_FROM_IMAGES_FAIL,
        payload: message,
      });
    }
  };
