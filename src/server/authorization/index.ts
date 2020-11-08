import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";
import { getMongoManager } from "typeorm";
import { UsersEntity } from "../db/entities/users";

export const passportAuth = () => {
    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            const manager = getMongoManager();
            const users = await manager.find(UsersEntity);
            const user = users.find(
                elem =>
                    elem.username === username && elem.password === password,
            );

            const error = user ? null : new Error("no matching user");
            done(error, user);
        }),
    );
    return passport;
};
