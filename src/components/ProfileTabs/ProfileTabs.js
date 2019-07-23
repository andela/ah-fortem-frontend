import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Followers from "../../containers/Followers/FollowersContainer";
import "react-tabs/style/react-tabs.css";
import "./style/style.css";
const deUsername = localStorage.getItem("username", null);
export default ({ username = deUsername }) => (
  <div className="row">
    <Tabs className="react-tabs" data-test="profile-tabs">
      <TabList className="react-tabs__tab-list tabs">
        <Tab className="react-tabs__tab tab">Following</Tab>
        <Tab className="tab react-tabs__tab">Followers</Tab>
      </TabList>
      <TabPanel className="react-tabs__tab-pane col s12">
        <Followers username={username} userType="following" />
      </TabPanel>
      <TabPanel className="react-tabs__tab-pane col s12">
        <Followers username={username} userType="followers" />
      </TabPanel>
    </Tabs>
  </div>
);
