// import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";

export const RootView = React.memo(() => {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
});
