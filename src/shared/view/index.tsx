// import React from "react";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "../service/styled-components/global";
import { Router } from "./router";

export const RootView = React.memo(() => {
    return (
        <>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
            <GlobalStyles />
        </>
    );
});
