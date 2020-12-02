import React, { useEffect } from "react";
import i18next from "i18next";
import i18nextXHRBackend from "i18next-xhr-backend";
import { I18nextProvider } from "react-i18next";
import { useSelector } from "react-redux";
import { getLocale } from "../store/app/selectors";

import deDE from "./locales/de_DE/translation.json";
import enUS from "./locales/en_US/translation.json";
import ruRU from "./locales/ru_RU/translation.json";

if (__BROWSER__) {
    i18next.use(i18nextXHRBackend);
}

// i18next.use(__BROWSER__ ? i18nextXHRBackend : {}).init({
i18next.init({
    backend: {
        // for all available options read the backend's repository readme file
        loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: {
        // Must be false until Suspense is supported on the server side
        useSuspense: false,
        wait: true,
    },
    debug: process.env.NODE_ENV === "development" && __BROWSER__,
    fallbackLng: "ru_RU",
    fallbackNS: ["translation"],
    // This option is necessary to tell i18next to try loading missing resources via
    // i18next-xhr-backend, otherwise no calls will be made if resources are defined.
    partialBundledLanguages: true,
    resources: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ru_RU: { translation: ruRU },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        en_US: { translation: enUS },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        de_DE: { translation: deDE },
    },
    parseMissingKeyHandler: (missing: any) => {
        if (process.env.NODE_ENV === "development" && __BROWSER__) {
            // eslint-disable-next-line no-console
            console.warn("MISSING TRANSLATION:", missing);
        }
        return missing;
    },
});

i18next.languages = ["de_DE", "en_US", "ru_RU"];

const I18N: React.FC<any> = ({ children }) => {
    const locale = useSelector(getLocale);
    useEffect(() => {
        i18next.changeLanguage(locale);
    }, [locale]);

    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

// eslint-disable-next-line import/no-default-export
export default React.memo(I18N);
