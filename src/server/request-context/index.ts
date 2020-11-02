import { RequestContextHelpers } from "./helpers";
import { Request } from "express";

export class RequestContext {

    /**
     *  Helpers
     */
    public readonly helpers: RequestContextHelpers;
    public request: any;

    constructor(request: Request) {
        this.request = request;
        this.helpers = new RequestContextHelpers(this);
    }
}

