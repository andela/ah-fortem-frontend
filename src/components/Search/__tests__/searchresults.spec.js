import React from "react";
import { shallow } from "enzyme";

import Searchresults from "../SearchResults";

const users = [
  {
    username: "Mr"
  },
  {
    username: "Mrs",
    image: "thhp:"
  }
];
test("should render SearchResults with the required fields", () => {
  const getItemProps = p => p;
  const wrapper = shallow(
    <Searchresults
      inputValue={users[0].username}
      selectedItem={users[0]}
      {...{ users, getItemProps }}
    />
  );
  expect(wrapper.exists()).toBe(true);
});
