import Switch from "react-switch";
import React from "react";

export default ({ handleChange, checked, title }) => (
  <li className="collection-item info-item">
    <span>{title}</span>
    <label className="right">
      <Switch
        onChange={handleChange}
        checked={checked}
        onColor="#fb8c00"
        onHandleColor="#fb8c00"
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={14}
        width={36}
      />
    </label>
  </li>
);
