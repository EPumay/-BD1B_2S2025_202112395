import { createApp } from "./app.js";
import env from "./config/env.js";

async function startApi() {
    const app = createApp();
    const port = env.PORT;

    app.listen(port, () => {
        console.log(`API is running on http://localhost:${port}`);
    });
}

startApi();
