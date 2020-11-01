import { AbstractRequestContextHelper } from "../abstract-request-context-helper";
import { SectionsContextHelper } from "./sections";


export class RequestContextHelpers extends AbstractRequestContextHelper {
    private cache: {
        sections?: SectionsContextHelper;
    } = {};

    public get sections() {
        return (
            this.cache.sections ||
            (this.cache.sections = new SectionsContextHelper(this.context))
        );
    }
}
