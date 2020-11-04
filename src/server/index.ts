import app from "./app";
import * as config from "./config";

app.listen(config.SERVER_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${config.SERVER_PORT}!`);
});
