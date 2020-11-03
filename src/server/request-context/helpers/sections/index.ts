import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { BrandContextHelper } from "./brand";

export class SectionsContextHelper extends AbstractRequestContextHelper {
    public get brand() {
        return new BrandContextHelper(this.context);
    }
}
