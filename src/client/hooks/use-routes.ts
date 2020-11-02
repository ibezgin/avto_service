import { useMemo, FunctionComponent } from "react";
import { FileOutlined } from "@ant-design/icons";
import { AccessEnum } from "../service/enums/access";
import { DictionaryBrand } from "../view/backoffice/dictionary/brand";
import { GapPage } from "../components/gap-page";
import { DictionaryBrandHeader } from "../view/backoffice/dictionary/brand/header";

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
                            component: GapPage,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_USERS,
                        },
                        {
                            name: "Услуги",
                            path: "/dictionary/service",
                            component: GapPage,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_SERVICE,
                        },
                        {
                            name: "Детали",
                            path: "/dictionary/car-part",
                            component: GapPage,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_CARPART,
                        },
                        {
                            name: "Марки автомобилей",
                            path: "/dictionary/brands",
                            component: DictionaryBrand,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_BRAND,
                            header: DictionaryBrandHeader,
                        },
                        {
                            name: "Модели автомобилей",
                            path: "/dictionary/models",
                            component: GapPage,
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
                    exact: true,
                    children: [
                        {
                            name: "Все заявки",
                            path: "/proposal",
                            component: GapPage,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_ALL,
                            exact: true,
                        },
                        {
                            name: "Добавить заявку",
                            path: "/proposal/add",
                            component: GapPage,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_ADD,
                        },
                        {
                            name: "Клиенты",
                            path: "/proposal/clients",
                            component: GapPage,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_CLIENTS,
                        },
                        {
                            name: "Обслуживаемые автомобили",
                            path: "/proposal/cars",
                            component: GapPage,
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
                    exact: true,
                    children: [
                        {
                            name: "Отчет о постипивших заявках по дням",
                            path: "/statistic",
                            component: GapPage,
                            icon: FileOutlined,
                            access: AccessEnum.STATISTIC_EVERYDAY,
                            exact: true,
                        },
                    ],
                },
            ] as IRoute[],
        [],
    );
}
