// import * as React from 'react';
import "reflect-metadata";
// грокаем алгоритмы
import path from "path";
import express from "express";
import cors from "cors";
import chalk from "chalk";
import manifestHelpers from "express-manifest-helpers";
import bodyParser from "body-parser";
import paths from "../../config/paths";
// import { configureStore } from '../shared/store';
import errorHandler from "./middleware/errorHandler";
import serverRenderer from "./middleware/serverRenderer";
import addStore from "./middleware/addStore";
import webhookVerification from "./middleware/webhookVerification";
import { i18nextXhr, refreshTranslations } from "./middleware/i18n";
import { apolloServer } from "./graph";
import { getOrCreateConnection } from "db";
import { passportAuth } from "./middleware/passport";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";

require("dotenv").config();

const app = express();
// const app = express.default();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
// if (process.env.NODE_ENV === 'development') {
app.use(
    paths.publicPath,
    express.static(path.join(paths.clientBuild, paths.publicPath)),
);
// }

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/locales/refresh", webhookVerification, refreshTranslations);

// It's probably a good idea to serve these static assets with Nginx or Apache as well:
app.get("/locales/:locale/:ns.json", i18nextXhr);

app.use(addStore);

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`,
    }),
);

// database connection
(async () => {
    await getOrCreateConnection();
})();

// ===== Passport ====
const passport = passportAuth();

const SESSION_SECRECT = "qwerty_auto_service_qwerty";

app.use(
    session({
        genid: () => uuidv4(),
        // genid: () => generateTemporyCode(),
        secret: SESSION_SECRECT,
        resave: false,
        saveUninitialized: false,
        // use secure cookies for production meaning they will only be sent via https
        // cookie: { secure: true }
    }),
);

app.use(passport.initialize());

app.use(passport.session()); // will call the deserializeUser

apolloServer.applyMiddleware({ app });

app.use(serverRenderer());

app.use(errorHandler);

app.listen(process.env.PORT || 8080, () => {
    // eslint-disable-next-line no-console
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(
            `App is running: http://localhost:${process.env.PORT || 8080}`,
        ),
    );
});

// eslint-disable-next-line import/no-default-export
export default app;
