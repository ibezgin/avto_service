import { IResolvers, ITypedef } from "graphql-tools/dist/Interfaces";
import _ from "lodash";

export class SubSchema {
    public readonly typeDefs: ITypedef[];
    public readonly resolverMap: IResolvers;

    public constructor(typeDefs: ITypedef[], resolverMap: IResolvers) {
        if (!_.isArray(typeDefs)) {
            typeDefs = [typeDefs];
        }
        this.typeDefs = typeDefs;
        this.resolverMap = resolverMap;
    }
}
