// import React from "react";

import React from "react";
import { StaticRouter } from "react-router";
import { GlobalStyles } from "../service/styled-components/global";
import { Router } from "./router";
import { createBrowserHistory } from "history";

export const RootView = React.memo(() => {
    return (
        <>
            <Router />
            <GlobalStyles />
        </>
    );
});
