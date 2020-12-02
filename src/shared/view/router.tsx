import { useRoutes } from "../hooks/use-routes";
import { Switch, Route } from "react-router";
import React from "react";
import { AppTemplate } from "./backoffice";
import { GlobalStyles } from "../service/styled-components/global";
import { LoginPage } from "./login";
// import { usePermission } from "../hooks/use-permission";

export const Router = React.memo(() => {
    const routesList = useRoutes();
    // const { hasPermission } = usePermission();
    const resultRoutes: any[] = [];

    // const routes = routesList.map(elem => ({
    //     ...elem.children,
    // }));
    // .map(elem => ({ ...elem.map(elemChild => ({ ...elemChild })) }));
    // eslint-disable-next-line no-console

    const routes: string[] = [];

    for (const category of routesList) {
        for (const menuItem of category.children) {
            resultRoutes.push(menuItem);
        }
        routes.push(category.path);
    }

    return (
        <>
            <Switch>
                <Route path={["/", ...routes]} exact>
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
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
            </Switch>
        </>
    );
});
