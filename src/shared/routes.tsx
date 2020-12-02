// import { usePermission } from "hooks/use-permission";
import { useRoutes } from "hooks/use-routes";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { GlobalStyles } from "service/styled-components/global";
import { AppTemplate } from "view/backoffice";

export const RoutesList = React.memo(() => {
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
                {/* <Route path="/login">
                    <LoginPage />
                </Route> */}
            </Switch>
        </>
    );
});
