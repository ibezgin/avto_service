import express from "express";
import path from "path";
import { pagesRouter } from "./routes/pages-router";
import { staticsRouter } from "./routes/statics-router";
import * as config from "./config";
import { getOrCreateConnection } from "./db/index";
import { router } from "./routes";
import { apolloServer } from "./graph";
import { passportAuth } from "./authorization/index";
import session from "express-session";
// import uuid from "uuid";
import _ from "lodash";

// eslint-disable-next-line no-console
console.log("*******************************************");
// eslint-disable-next-line no-console
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// eslint-disable-next-line no-console
console.log(`config: ${JSON.stringify(config, null, 2)}`);
// eslint-disable-next-line no-console
console.log("*******************************************");

getOrCreateConnection();
const SESSION_SECRECT = "qwerty123";

const app = express();
app.set("view engine", "ejs");

app.use("/assets", express.static(path.join(process.cwd(), "assets")));
app.use("/", router);
app.use(staticsRouter());

const generateTemporyCode = (length = 10) =>
    _.padStart(_.random(Math.pow(10, length) - 1) + "", length, "0");

// ===== Passport ====
const passport = passportAuth();

app.use(
    session({
        genid: () => generateTemporyCode(),
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

app.use(pagesRouter());

// eslint-disable-next-line import/no-default-export
export default app;
