import { useMemo, ReactNode, FunctionComponent } from "react";
import { Users } from "../view/backoffice/users";
import { Dashboard } from "../view/backoffice/dashboard";
import { News } from "../view/backoffice/news";
import {
    // DesktopOutlined,
    // PieChartOutlined,
    FileOutlined,
    // // TeamOutlined,
    // UserOutlined,
    // ShoppingCartOutlined,
} from "@ant-design/icons";
// import { SiteTemplate } from "../view/site";
// import { SiteHomePage } from "../view/site/home";
import { Products } from "../view/backoffice/products";

interface IRoute {
    name: string;
    path: string;
    exact?: boolean;
    icon: FunctionComponent;
    children: Array<{
        name: string;
        path: string;
        component: FunctionComponent;
        exact?: boolean;
        icon: FunctionComponent;
    }>;
}

export function useRoutes() {
    return useMemo(
        () =>
            [
                {
                    name: "Справочники",
                    path: "/dictionary/:path?",
                    exact: true,
                    icon: FileOutlined,
                    children: [
                        {
                            name: "Пользователи",
                            path: "/dictionary/",
                            component: Users,
                            exact: true,
                            icon: FileOutlined,
                        },
                        {
                            name: "Пользователи",
                            path: "/dictionary/users/",
                            component: Users,
                            exact: true,
                            icon: FileOutlined,
                        },
                        {
                            name: "Марки автомобилей",
                            path: "/dictionary/brands/",
                            component: Dashboard,
                            icon: FileOutlined,
                        },
                        {
                            name: "Модели автомобилей",
                            path: "/admin/news",
                            component: News,
                            icon: FileOutlined,
                        },
                        {
                            name: "Клиенты",
                            path: "/admin/clients",
                            component: Products,
                            icon: FileOutlined,
                        },
                        {
                            name: "Обслуживаемые автомобили",
                            path: "/admin/cars",
                            component: Products,
                            icon: FileOutlined,
                        },
                    ],
                },
                {
                    name: "Заявки",
                    path: "/statistic/:path?",
                    icon: FileOutlined,
                    children: [
                        {
                            name: "Все заявки",
                            path: "/proposal",
                            component: Products,
                            icon: FileOutlined,
                        },
                        {
                            name: "Добавить заявку",
                            path: "/proposal/add",
                            component: Products,
                            icon: FileOutlined,
                        },
                    ],
                },
                {
                    name: "Статистика",
                    path: "/statistic/:path?",
                    icon: FileOutlined,
                    children: [
                        {
                            name: "Отчет о постипивших заявках по дням",
                            path: "/statistic",
                            component: Products,
                            icon: FileOutlined,
                        },
                    ],
                },
            ] as IRoute[],
        [],
    );
}
