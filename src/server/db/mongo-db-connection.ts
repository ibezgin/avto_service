import { createConnection } from "typeorm";
import { UserEntity } from "./entities/users";
import { NewsEntity } from "./entities/news";
import { ProductsEntity } from "./entities/products";
import { CONNECTION_STRING } from "../config";

// const connectionManager = new ConnectionManager();

let connection: ReturnType<typeof createConnection> | undefined;

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
            entities: [UserEntity, NewsEntity, ProductsEntity],
            synchronize: true,
        });
    }
    // console.log(connection);
    return connection;
};
