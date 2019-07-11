import types from "../types";
import { apiCalls } from "../../../Helpers/axios";
import { isLoggedIn } from "../../../Helpers/authHelpers";
import { ShowMessage } from "../SnackBarAction";
const {
  LOADPROFILE,
  SETPROFILEDATA,
  SAVEEDITEDPROFILEDATA,
  SETOWNERSTATUS,
  REMOVEPROFILELOADING
} = types;

/**
 *
 * @param {Int} status - The response status
 * @param {object} data - error object
 * @param {Function} dispatch - the redux dispatch
 * @param {Function} history - react-router-dom history.push
 */
const handleProfileErrors = (status, data, dispatch, history) => {
  dispatch({
    type: REMOVEPROFILELOADING
  });
  if (status === 500) {
    dispatch(
      ShowMessage({
        message: "Something went wrong, kindly try reloading the page again.",
        type: "error"
      })
    );
  } else {
    dispatch(ShowMessage({ message: data.error, type: "error" }));
    history.push("/profile");
  }
};

/**
 *
 * @param {object} profile - the profile object passed down from the api
 * @param {object} history - history from react router dom
 * @returns {boolean} - returns true if the user that is viewing the profile
 * is the owner of the profile
 */

export const isUserOwner = profile =>
  isLoggedIn() && profile.username === localStorage.getItem("username");

/**
 *  This function gets a user's profile from
 *  the API
 * @param {string} username - a user's username
 * @returns {function} dispatch - redux dispatch =>  {
 *  @returns {promise} <Resolve | Reject>
 * }
 */
export const getProfile = (username, history) => dispatch => {
  dispatch({
    type: LOADPROFILE
  });

  return apiCalls("get", `/profiles/${username}/`)
    .then(({ data: { profile } }) => {
      dispatch({
        type: SETPROFILEDATA,
        payload: profile
      });
      //check if the requester is the owner of this profile
      dispatch({
        type: SETOWNERSTATUS,
        payload: isUserOwner(profile)
      });
    })
    .catch(({ response: { status, data } }) => {
      handleProfileErrors(status, data, dispatch, history);
    });
};

/**
 *
 * @param {object} obj - filter out blank fields in object
 * @returns {object} - returns an object with values that are not empty values
 */

export const filterOutBlanks = obj =>
  Object.keys(obj).reduce(function(acc, curr) {
    if (/\S/.test(obj[curr])) {
      return { ...acc, [curr]: obj[curr] };
    } else return acc;
  }, {});

/**
 *
 * @param {object} data - defaults profile back to the profile data that was existent before the update
 * @param {*} dispatch - redux dispatch function
 *
 */
const handleSaveProfileInfoError = (data, dispatch) => {
  dispatch({
    type: SAVEEDITEDPROFILEDATA,
    payload: data
  });
  dispatch(
    ShowMessage({
      message: "Something went wrong updating your profile, kindly try again",
      type: "error"
    })
  );
};

/**
 *
 * @param {object} data - values that have been changed by the user in their profiles
 *
 * @returns { Promise } from API call
 */

export const saveProfileInfo = updateddata => (dispatch, getState) => {
  const {
    profile: { data }
  } = getState();
  // make an optimistic update to the UI.
  dispatch({
    type: SAVEEDITEDPROFILEDATA,
    payload: updateddata
  });
  // make API call to update the profile
  return apiCalls(
    "put",
    `/profiles/${data.username}/`,
    filterOutBlanks(updateddata),
    {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  )
    .then(() => {
      dispatch(ShowMessage("Successfully updated your profile"));
    })
    .catch(err => {
      handleSaveProfileInfoError(data, dispatch);
    });
};
