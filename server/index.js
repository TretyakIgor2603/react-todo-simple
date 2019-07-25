import app from "./app";
const port = process.env.PORT || 5000;

import { connectDb } from "./config/mongo";

connectDb().then(async () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
