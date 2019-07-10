import React from "react";

function Button(props) {
    const { color, value } = props;
    return(
        <div className="button">
            <a className={"waves-effect waves-light btn " + color }>
            {value}
            </a>
        </div>
    )
}

export default Button