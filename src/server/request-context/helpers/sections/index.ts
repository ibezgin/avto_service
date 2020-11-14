import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { BrandContextHelper } from "./brand";
import { CarPartContextHelper } from "./car-part";
import { CarsContextHelper } from "./cars";
import { ClientsContextHelper } from "./clients";
import { ModelsContextHelper } from "./models";
import { ProposalContextHelper } from "./proposal";
import { ServiceContextHelper } from "./service";
import { UsersContextHelper } from "./users";

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
    public get carPart() {
        return new CarPartContextHelper(this.context);
    }
    public get clients() {
        return new ClientsContextHelper(this.context);
    }
    public get users() {
        return new UsersContextHelper(this.context);
    }
    public get cars() {
        return new CarsContextHelper(this.context);
    }
    public get proposal() {
        return new ProposalContextHelper(this.context);
    }
}
