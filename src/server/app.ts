import express from "express";
import path from "path";
import { pagesRouter } from "./routes/pages-router";
// import { staticsRouter } from "./routes/statics-router";
import * as config from "./config";
import { getOrCreateConnection } from "./db/index";
// import { router } from "./routes";
import { apolloServer } from "./graph";
import { passportAuth } from "./authorization/index";
import session from "express-session";
// import uuid from "uuid";
import * as _ from "lodash";
import * as ReactDOMServer from "react-dom/server";
import { App } from "../client/App";
import fs from "fs";
import React from "react";
import { StaticRouter } from "react-router";
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
// app.set("view engine", "ejs");

// app.use("/assets", express.static(path.join(process.cwd(), "assets")));
// app.use("/", router);
// app.use(staticsRouter());

const generateTemporyCode = (length = 10) =>
    _.padStart(_.random(Math.pow(10, length) - 1) + "", length, "0");

// const react = `${ReactDOMServer.renderToString(App())}`;
const router = express.Router();

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

// app.use(pagesRouter());

const serverRenderer = (req, res) => {
    const staticContext = {};
    const reactHtml = ReactDOMServer.renderToString(
        React.createElement(
            StaticRouter,
            { location: req.url, context: staticContext },
            React.createElement(App),
        ),
    );

    // fs.readFile(path.resolve("./view/index.html"), "utf8", (error, data) => {
    //     // eslint-disable-next-line id-blacklist
    //     if (error) {
    //         // console.error(err);
    //         return res.status(500).send("An error occurred");
    //     }
    //     return res.send(
    //         `<div id="root">${ReactDOMServer.renderToString(
    //             React.createElement(App),
    //         )}</div>`,
    //     );
    // });
    const htmlTemplate = `
        <html>
            <head>
                <title>Universal React server bundle</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.8.4/antd.min.css" integrity="sha512-v/0IEY/Jzka51BbTu1+BMM96C7Wmu+Xy8lmskl78mfjuJl3Qd049m9/W0x7whUlnkctEnia6XHC6lR/lzEcfog==" crossorigin="anonymous" />

            </head>
            <body>
                <div id="app">${reactHtml}</div>
                <script src="public/client.bundle.js"></script>
            </body>
        </html>`;

    res.send(htmlTemplate);
};
router.use("/**", serverRenderer);
app.use(router);
// eslint-disable-next-line import/no-default-export
export default app;
