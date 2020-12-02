export type Locale = "en_US" | "de_DE";

export type AppState = Readonly<{
    locale: Locale;
}>;

export interface IAction {
    type: string;
    payload: any;
}
