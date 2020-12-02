// import React, { Suspense } from 'react';
import * as React from "react";

import { RoutesList } from "./routes";

// Does not yet work with server side rendering:
// const Home = React.lazy(() => import('./pages/Home'));
// const Page1 = React.lazy(() => import('./pages/Page-1'));
// const Page2 = React.lazy(() => import('./pages/Page-2'));

const App: React.FC<any> = () => {
    return <RoutesList />;
};

// eslint-disable-next-line import/no-default-export
export default App;
