import React from "react";
import InfoItem from "../Profile/Infoitem";

export default ({
  users,
  inputValue,
  getItemProps,
  selectedItem,
  placeholderimage
}) =>
  users
    .filter(item => !inputValue || item.username.includes(inputValue))
    .map((item, index) => (
      <div
        data-test="author-details"
        {...getItemProps({
          key: item.username,
          index,
          item,
          style: {
            fontWeight:
              selectedItem && selectedItem.username === item.username
                ? "bold"
                : "normal"
          }
        })}
      >
        <InfoItem
          propname={"username"}
          image={item.image ? item.image : placeholderimage}
          value={item.username}
        />
      </div>
    ));
