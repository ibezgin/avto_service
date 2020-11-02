import { useMemo, FunctionComponent } from "react";
import { Users } from "../view/backoffice/users";
import { Dashboard } from "../view/backoffice/dashboard";
import { News } from "../view/backoffice/news";
import { FileOutlined } from "@ant-design/icons";
import { Products } from "../view/backoffice/products";
import { AccessEnum } from "../service/enums/access";

interface IRoute {
    name: string;
    path: string;
    exact?: boolean;
    icon: FunctionComponent;
    access: AccessEnum;
    children: Array<{
        name: string;
        path: string;
        component: FunctionComponent;
        exact?: boolean;
        icon: FunctionComponent;
        header?: FunctionComponent;
        access: AccessEnum;
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
                    access: AccessEnum.DICTIONARY,
                    children: [
                        {
                            name: "Пользователи",
                            path: "/dictionary/users",
                            component: Users,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_USERS,
                        },
                        {
                            name: "Услуги",
                            path: "/dictionary/service",
                            component: Users,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_SERVICE,
                        },
                        {
                            name: "Детали",
                            path: "/dictionary/car-part",
                            component: Users,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_CARPART,
                        },
                        {
                            name: "Марки автомобилей",
                            path: "/dictionary/brands",
                            component: Dashboard,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_BRAND,
                        },
                        {
                            name: "Модели автомобилей",
                            path: "/dictionary/models",
                            component: News,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_MODELS,
                        },
                    ],
                },
                {
                    name: "Заявки",
                    path: "/proposal/:path?",
                    icon: FileOutlined,
                    access: AccessEnum.PROPOSAL,
                    children: [
                        {
                            name: "Все заявки",
                            path: "/proposal",
                            component: Products,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_ALL,
                        },
                        {
                            name: "Добавить заявку",
                            path: "/proposal/add",
                            component: Products,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_ADD,
                        },
                        {
                            name: "Клиенты",
                            path: "/proposal/clients",
                            component: Products,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_CLIENTS,
                        },
                        {
                            name: "Обслуживаемые автомобили",
                            path: "/proposal/cars",
                            component: Products,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_CARS,
                        },
                    ],
                },
                {
                    name: "Статистика",
                    path: "/statistic/:path?",
                    icon: FileOutlined,
                    access: AccessEnum.STATISTIC,
                    children: [
                        {
                            name: "Отчет о постипивших заявках по дням",
                            path: "/statistic",
                            component: Products,
                            icon: FileOutlined,
                            access: AccessEnum.STATISTIC_EVERYDAY,
                        },
                    ],
                },
            ] as IRoute[],
        [],
    );
}
