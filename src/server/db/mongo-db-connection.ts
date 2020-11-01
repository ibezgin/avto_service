import { createConnection } from "typeorm";
import { UserEntity } from "./entities/users";
import { NewsEntity } from "./entities/news";
import { ProductsEntity } from "./entities/products";

// const connectionManager = new ConnectionManager();

let connection: ReturnType<typeof createConnection> | undefined;

export const getOrCreateConnection = () => {
    if (!connection) {
        connection = createConnection({
            url:
                "mongodb+srv://admin:darkdark@cluster0.0mcri.mongodb.net/fullstack?retryWrites=true&w=majority",
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
