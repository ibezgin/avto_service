import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { BrandContextHelper } from "./brand";
import { ModelsContextHelper } from "./models";
import { ServiceContextHelper } from "./service";

export class SectionsContextHelper extends AbstractRequestContextHelper {
    public get brand() {
        return new BrandContextHelper(this.context);
    }
    public get models() {
        return new ModelsContextHelper(this.context);
    }
    public get service() {
        return new ServiceContextHelper(this.context);
    }
}
