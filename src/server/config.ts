import dotenv from "dotenv";
import findUp from "find-up";
import path from "path";
import fs from "fs";

const IS_DEV = process.env.NODE_ENV !== "production";

if (IS_DEV) {
    dotenv.config({ path: findUp.sync(".env") });
}

const packageJsonPath = path.join(process.cwd(), "package.json");
const rawPackageJson = fs.readFileSync(packageJsonPath).toString();
const PackageJson = JSON.parse(rawPackageJson);
const { version: VERSION } = PackageJson;

// server
const SERVER_PORT = process.env.PORT || 8080;
const WEBPACK_PORT = 8085; // For dev environment only

// database
const CONNECTION_STRING = process.env.CONNECTION_STRING;

export { IS_DEV, VERSION, SERVER_PORT, WEBPACK_PORT, CONNECTION_STRING };
