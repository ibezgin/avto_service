import { createConnection } from "typeorm";
import { CONNECTION_STRING } from "../config";
import { BrandEntity } from "./entities/brand";
import { ModelsEntity } from "./entities/models";
import { ServiceEntity } from "./entities/service";

// const connectionManager = new ConnectionManager();

let connection: ReturnType<typeof createConnection> | undefined;

const entities = [BrandEntity, ModelsEntity, ServiceEntity];

export const getOrCreateConnection = () => {
    if (!connection) {
        connection = createConnection({
            url: CONNECTION_STRING,
            type: "mongodb",
            useNewUrlParser: true,
            reconnectTries: Number.MAX_VALUE,
            entities,
            synchronize: true,
        });
    }
    return connection;
};
