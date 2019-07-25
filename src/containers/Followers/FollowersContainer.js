import React, { Component } from "react";
import Followers from "../../components/Profile/Followers";
import { apiCalls } from "../../Helpers/axios";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json"
};
class FollowersContainer extends Component {
  state = {
    people: [],
    loading: true,
    type: "You do not follow anyone yet"
  };

  componentDidMount() {
    return this.getPeople();
  }
  handleOnChange = username => {
    const { people } = this.state;

    this.setState({
      people: people.filter(user => user.username !== username)
    });
    return true;
  };
  getPeople = () => {
    const { userType, username } = this.props;
    let url;
    if (userType === "followers") {
      url = `/users/${username}/followers/`;
      this.setState({ type: "You do not have followers yet" });
    } else {
      url = `/users/${username}/following/`;
    }

    return apiCalls("get", url, { headers }).then(response => {
      const { following, followers } = response.data;
      if (following) {
        this.setState({ people: following, loading: false });
      }
      if (followers) {
        this.setState({ people: followers, loading: false });
      }
    });
  };
  render() {
    const { people, loading, type } = this.state;
    const { userType } = this.props;

    return !loading ? (
      <Followers
        people={people}
        type={type}
        handleChange={
          userType === "followers" ? undefined : this.handleOnChange
        }
      />
    ) : (
      <div data-test="follow-loading">
        <h5>Loading...</h5>
        <div className="progress orange">
          <div className="indeterminate"></div>
        </div>
      </div>
    );
  }
}

export default FollowersContainer;
