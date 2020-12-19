import { IFormField } from "../components/modal-form";
import { AccessEnum } from "../service/enums/access";

export function useAccess(): IFormField[] {
    return [
        {
            name: AccessEnum.DICTIONARY,
            title: "Справочники",
            type: "checkboxField",
        },
        {
            name: AccessEnum.DICTIONARY_USERS,
            title: "Справочники.Пользователи",
            type: "checkboxField",
        },
        {
            name: AccessEnum.DICTIONARY_BRAND,
            title: "Справочники.Марки автомобилей",
            type: "checkboxField",
        },
        {
            name: AccessEnum.DICTIONARY_MODELS,
            title: "Справочники.Модели автомобилей",
            type: "checkboxField",
        },
        {
            name: AccessEnum.DICTIONARY_SERVICE,
            title: "Справочники.Услуги",
            type: "checkboxField",
        },
        {
            name: AccessEnum.PROPOSAL,
            title: "Заявки",
            type: "checkboxField",
        },
        {
            name: AccessEnum.PROPOSAL_ALL,
            title: "Заявки.Все заявки",
            type: "checkboxField",
        },
        {
            name: AccessEnum.PROPOSAL_ADD,
            title: "Заявки.Добавить заявку",
            type: "checkboxField",
        },
        {
            name: AccessEnum.PROPOSAL_CLIENTS,
            title: "Заявки.Клиенты",
            type: "checkboxField",
        },
        {
            name: AccessEnum.PROPOSAL_CARS,
            title: "Заявки.Обслуживаемые автомобили",
            type: "checkboxField",
        },
        {
            name: AccessEnum.REPORT,
            title: "Отчеты",
            type: "checkboxField",
        },
        {
            name: AccessEnum.REPORT_EVERYDAY,
            title: "Отчеты.Отчет о постипивших заявках по дням",
            type: "checkboxField",
        },
        {
            name: AccessEnum.REPORT_TURNOVER,
            title: "Отчеты.Обороты",
            type: "checkboxField",
        },
    ];
}
