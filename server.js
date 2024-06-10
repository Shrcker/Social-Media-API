const express = require("express");
const database = require("./config/connection");
const routes = require("./routes");

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

const activity = cwd.includes("Social Media Database") ? cwd.split("Social-Media-Database")[1] : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

database.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  })
});
