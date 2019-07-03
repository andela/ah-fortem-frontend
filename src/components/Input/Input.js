import React from "react";

function Input(props) {
  const { error, type, label, id, className = "", ...rest } = props;
  return (
    <div className="input-field col s12">
      <input
        {...rest}
        id={id}
        type={type}
        className={"validate " + className}
      />
      <label htmlFor={id}>{label}</label>
      <span className="helper-text" data-error={error}>
        {error}
      </span>
    </div>
  );
}

export default Input;
