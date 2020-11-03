import { createConnection } from "typeorm";
import { CONNECTION_STRING } from "../config";
import { BrandEntity } from "./entities/brand";
import { ModelsEntity } from "./entities/models";

// const connectionManager = new ConnectionManager();

let connection: ReturnType<typeof createConnection> | undefined;

const entities = [BrandEntity, ModelsEntity];

export const getOrCreateConnection = () => {
    if (!connection) {
        connection = createConnection({
            url: CONNECTION_STRING,
            type: "mongodb",
            // host: "cluster0.0mcri.mongodb.net",
            // // port: 27017,
            // database: "fullstack",
            // username: "admin",
            // password: "darkdark",
            useNewUrlParser: true,
            reconnectTries: Number.MAX_VALUE,
            entities,
            synchronize: true,
        });
    }
    // console.log(connection);
    return connection;
};
