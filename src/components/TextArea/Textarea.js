import React from "react";

export default ({ label, id, ...other }) => {
  return (
    <div className="row">
      <div className="input-field col s12">
        <textarea {...other} id={id} className={"materialize-textarea"} />
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );
};
