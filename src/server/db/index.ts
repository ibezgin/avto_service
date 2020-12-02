import { createConnection } from "typeorm";
import { BrandEntity } from "./entities/brand";
import { CarPartEntity } from "./entities/car-part";
import { CarsEntity } from "./entities/cars";
import { ClientsEntity } from "./entities/clients";
import { ModelsEntity } from "./entities/models";
import { ProposalEntity } from "./entities/proposal";
import { ServiceEntity } from "./entities/service";
import { UsersEntity } from "./entities/users";

let connection: ReturnType<typeof createConnection> | undefined;

const entities = [
    BrandEntity,
    ModelsEntity,
    ServiceEntity,
    CarPartEntity,
    ClientsEntity,
    UsersEntity,
    CarsEntity,
    ProposalEntity,
];

export const getOrCreateConnection = () => {
    if (!connection) {
        connection = createConnection({
            url: process.env.CONNECTION_STRING,
            type: "mongodb",
            entities,
            useNewUrlParser: true,
            reconnectTries: Number.MAX_VALUE,
            synchronize: true,
        });
    }

    return connection;
};
