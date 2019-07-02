import React from "react";

function Input(props) {
    const { type, error, label, className = "", ...rest } = props;
    return (
        <div className="input-field col s12">
            <input {...rest} id={label} type={type} className={"validate " + className} />
            <label htmlFor={label}>{label}</label>
            <span className="helper-text" data-error={error}>{error}</span>
        </div>
    );
}

export default Input;