import React from "react";
import spinner from "../../app/assets/spinner.gif";

interface Props {
    message?: string;
}

const LoadingComponent = ({ message = "Loading..." }: Props) => {
    return (
        <div className="loading">
            <img className="loading__spinner" src={spinner} alt="spinner" />
            <p className="loading__message">{message}</p>
        </div>
    );
};

export default LoadingComponent;
