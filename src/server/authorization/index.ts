import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";
import { getMongoManager } from "typeorm";
import { UsersEntity } from "../db/entities/users";

export const passportAuth = () => {
    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            const manager = getMongoManager();
            const users = await manager.find(UsersEntity);
            const user = await users.find(
                elem =>
                    elem.username === username && elem.password === password,
            );

            const error = user ? null : new Error("no matching user");
            await done(error, user);
        }),
    );
    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: any, done) => {
        const manager = getMongoManager();
        const users = await manager.find(UsersEntity);
        const matchingUser = await users.find(
            user => String(user.id) === String(id),
        );
        done(null, matchingUser);
    });
    return passport;
};
