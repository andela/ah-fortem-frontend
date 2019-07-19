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

export const renderInput = ({ id, name, errors, value, label, type }, handleChange) =>
  <Input
    {...{ name, id, value, label, type }}
    error={errors[name] ? errors[name][0] : null}
    className={errors[name] ? "invalid" : ""}
    data-test={`${name}-test`} onChange={handleChange} />

export default Input;
