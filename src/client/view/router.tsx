import { useRoutes } from "../hooks/use-routes";
import { Switch, Route } from "react-router";
import React from "react";
import { AppTemplate } from "./backoffice";
import { GlobalStyles } from "../service/styled-components/global";

export const Router = React.memo(() => {
    const routesList = useRoutes();

    const resultRoutes: any[] = [];

    // const routes = routesList.map(elem => ({
    //     ...elem.children,
    // }));
    // .map(elem => ({ ...elem.map(elemChild => ({ ...elemChild })) }));
    // eslint-disable-next-line no-console

    for (const category of routesList) {
        for (const menuItem of category.children) {
            resultRoutes.push(menuItem);
        }
    }

    return (
        <AppTemplate>
            <Switch>
                {resultRoutes.map((route, indexRoute) => (
                    <Route
                        path={route.path}
                        key={`route-${indexRoute}`}
                        exact={route.exact}
                    >
                        <route.component />
                    </Route>
                ))}
            </Switch>
            <GlobalStyles />
        </AppTemplate>
    );
});
