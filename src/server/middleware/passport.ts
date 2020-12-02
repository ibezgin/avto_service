import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import { getMongoManager } from "typeorm";
import { UsersEntity } from "../db/entities/users";
import bcrypt from "bcryptjs";

export const passportAuth = () => {
    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            let error: Error | null = null;
            const manager = getMongoManager();
            const users = await manager.find(UsersEntity);

            const user = users?.find(elem => elem?.username === username);
            const checkPassword = await bcrypt.compare(password, user.password);

            if (!user || !checkPassword) {
                error = new Error("Пользователь не найден");
            }
            await done(error, user);
        }),
    );
    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: any, done) => {
        const manager = getMongoManager();
        const users = await manager.find(UsersEntity);
        const matchingUser = users.find(user => String(user.id) === String(id));
        done(null, matchingUser);
    });
    return passport;
};
