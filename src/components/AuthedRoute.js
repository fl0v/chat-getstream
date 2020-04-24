import React from "react";
import { Redirect, Route } from "react-router-dom";

export default (props) => {
    if (!localStorage.getItem("username")) {
        return <Redirect to='/user' />;
    }
    return <Route {...props} />;
};
