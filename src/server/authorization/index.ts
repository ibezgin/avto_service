import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";
import { getMongoManager } from "typeorm";
import { UsersEntity } from "../db/entities/users";
import * as bcrypt from "bcryptjs";

export const passportAuth = () => {
    passport.use(
        new GraphQLLocalStrategy(
            async (username: any, password: any, done: any) => {
                let error: Error | null = null;
                const manager = getMongoManager();
                const users = await manager.find(UsersEntity);

                const user = await users.find(
                    elem => elem.username === username,
                );
                const checkPassword = await bcrypt.compare(
                    password,
                    String(user?.password),
                );

                if (!user || !checkPassword) {
                    error = new Error("Пользователь не найден");
                }
                await done(error, user);
            },
        ),
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
