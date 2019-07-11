import actionTypes from "../../../actions/types";
import userProfileReducer from "../userProfile";
const {
  LOADPROFILE,
  SETPROFILEDATA,
  SAVEEDITEDPROFILEDATA,
  REMOVEPROFILELOADING
} = actionTypes;

describe("userProfileReducer (Unit Tests)", () => {
  test("should return default userProfile state on init", () => {
    const defaultProfileReducer = userProfileReducer(undefined, {
      type: ""
    });

    expect(defaultProfileReducer).toEqual({
      data: null,
      isLoading: true,
      isOwner: false
    });
  });
  test("should set profile data to the reducer once SETPROFILEDATA is hit ", () => {
    const setProfileData = userProfileReducer(undefined, {
      type: SETPROFILEDATA,
      payload: {
        image: "",
        firstname: ""
      }
    });

    expect(setProfileData).toEqual({
      data: {
        image: "",
        firstname: ""
      },
      isLoading: false,
      isOwner: false
    });
  });

  test("should set isLoading to true once LOADPROFILE is hit", () => {
    const setLoading = userProfileReducer(undefined, {
      type: LOADPROFILE
    });

    expect(setLoading).toEqual({
      isLoading: true,
      data: null,
      isOwner: false
    });
  });

  test("should update the profile data once SAVEEDITEDPROFILEDATA is hit", () => {
    const profileReducer = userProfileReducer(
      {
        data: {
          firstname: "tev"
        },
        isLoading: false
      },
      {
        type: SAVEEDITEDPROFILEDATA,
        payload: {
          firstname: "tevin"
        }
      }
    );
    expect(profileReducer).toEqual({
      data: {
        firstname: "tevin"
      },
      isLoading: false
    });
  });
  test("REMOVEPROFILELOADING should set loading to false ", () => {
    const setProfileData = userProfileReducer(undefined, {
      type: REMOVEPROFILELOADING
    });

    expect(setProfileData).toEqual({
      data: null,
      isLoading: false,
      isOwner: false
    });
  });
});
