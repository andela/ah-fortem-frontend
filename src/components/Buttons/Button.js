import React from "react";

function Button(props) {
    const { color, value, ...rest} = props;
    return(
        <div className="button">
            <a {...rest} className={"waves-effect waves-light btn " + color }>
            {value}
            </a>
        </div>
    )
}

export default Button;