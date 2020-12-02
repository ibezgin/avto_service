// import React, { Suspense } from 'react';
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import favicon from "../shared/assets/favicon.png";
import { ReactComponent as ReactLogo } from "./assets/react.svg";
// import Home from "./view/Home";
// import Page1 from "./view/Page-1";
// import Page2 from "./view/Page-2";
import { RoutesList } from "./routes";
import css from "./App.module.css";

// Does not yet work with server side rendering:
// const Home = React.lazy(() => import('./pages/Home'));
// const Page1 = React.lazy(() => import('./pages/Page-1'));
// const Page2 = React.lazy(() => import('./pages/Page-2'));

const App: React.FC<any> = () => {
    const { t } = useTranslation();
    return (
        // <Suspense fallback={<div>Loading</div>}>
        <div className={css.wrapper}>
            <Helmet
                defaultTitle="React SSR Starter – TypeScript Edition"
                titleTemplate="%s – React SSR Starter – TypeScript Edition"
                link={[{ rel: "icon", type: "image/png", href: favicon }]}
            />
            <h1>
                <ReactLogo className={css.reactLogo} /> React + Express – SSR
                Starter – TypeScript Edition
            </h1>
            <RoutesList />
            <h2>{t("router-headline")}</h2>
            <ul>
                <li>
                    <Link to="/">{t("nav.home")}</Link>
                </li>
                <li>
                    <Link to="/page-1">{t("nav.page-1")}</Link>
                </li>
                <li>
                    <Link to="/page-2">{t("nav.page-2")}</Link>
                </li>
            </ul>
        </div>
        // </Suspense>
    );
};

// eslint-disable-next-line import/no-default-export
export default App;
