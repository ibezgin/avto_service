import { useMemo, FunctionComponent } from "react";
import { FileOutlined } from "@ant-design/icons";
import { AccessEnum } from "../service/enums/access";
import { DictionaryBrand } from "../view/backoffice/dictionary/brand";
import { GapPage } from "../components/gap-page";
import { DictionaryBrandHeader } from "../view/backoffice/dictionary/brand/header";
import { DictionaryModels } from "../view/backoffice/dictionary/models";
import { DictionaryModelsHeader } from "../view/backoffice/dictionary/models/header";
import { DictionaryService } from "../view/backoffice/dictionary/service";
import { DictionaryServiceHeader } from "../view/backoffice/dictionary/service/header";
import { DictionaryCarPart } from "../view/backoffice/dictionary/car-part";
import { DictionaryCarPartHeader } from "../view/backoffice/dictionary/car-part/header";
import { ProposalClients } from "../view/backoffice/proposal/clients";
import { ProposalClientsHeader } from "../view/backoffice/proposal/clients/header";
import { DictionaryUsers } from "../view/backoffice/dictionary/users";
import { DictionaryUsersHeader } from "../view/backoffice/dictionary/users/header";
import { ProposalCars } from "../view/backoffice/proposal/cars";
import { ProposalCarsHeader } from "../view/backoffice/proposal/cars/header";
import { ProposalProposal } from "../view/backoffice/proposal/proposal";

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
                            component: DictionaryUsers,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_USERS,
                            header: DictionaryUsersHeader,
                        },
                        {
                            name: "Услуги",
                            path: "/dictionary/service",
                            component: DictionaryService,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_SERVICE,
                            header: DictionaryServiceHeader,
                        },
                        {
                            name: "Автозапчасти/расходники",
                            path: "/dictionary/car-part",
                            component: DictionaryCarPart,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_CARPART,
                            header: DictionaryCarPartHeader,
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
                            component: DictionaryModels,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_MODELS,
                            header: DictionaryModelsHeader,
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
                            component: ProposalProposal,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_ADD,
                        },
                        {
                            name: "Клиенты",
                            path: "/proposal/clients",
                            component: ProposalClients,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_CLIENTS,
                            header: ProposalClientsHeader,
                        },
                        {
                            name: "Обслуживаемые автомобили",
                            path: "/proposal/cars",
                            component: ProposalCars,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_CARS,
                            header: ProposalCarsHeader,
                        },
                    ],
                },
                {
                    name: "Отчеты",
                    path: "/report/:path?",
                    icon: FileOutlined,
                    access: AccessEnum.REPORT,
                    exact: true,
                    children: [
                        {
                            name: "Отчет о постипивших заявках по дням",
                            path: "/report/every-day-proposal",
                            component: GapPage,
                            icon: FileOutlined,
                            access: AccessEnum.REPORT_EVERYDAY,
                            exact: true,
                        },
                    ],
                },
            ] as IRoute[],
        [],
    );
}
