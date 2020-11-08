import { createConnection } from "typeorm";
import { CONNECTION_STRING } from "../config";
import { BrandEntity } from "./entities/brand";
import { CarPartEntity } from "./entities/car-part";
import { ClientsEntity } from "./entities/clients";
import { ModelsEntity } from "./entities/models";
import { ServiceEntity } from "./entities/service";
import { UsersEntity } from "./entities/users";

// const connectionManager = new ConnectionManager();

let connection: ReturnType<typeof createConnection> | undefined;

const entities = [
    BrandEntity,
    ModelsEntity,
    ServiceEntity,
    CarPartEntity,
    ClientsEntity,
    UsersEntity,
];

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
