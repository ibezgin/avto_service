export type Locale = "en_US" | "de_DE" | "ru_RU";

export type AppState = Readonly<{
    locale: Locale;
}>;

export interface IAction {
    type: string;
    payload: any;
}
