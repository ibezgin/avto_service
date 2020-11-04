import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { BrandContextHelper } from "./brand";
import { ModelsContextHelper } from "./models";

export class SectionsContextHelper extends AbstractRequestContextHelper {
    public get brand() {
        return new BrandContextHelper(this.context);
    }
    public get models() {
        return new ModelsContextHelper(this.context);
    }
}
