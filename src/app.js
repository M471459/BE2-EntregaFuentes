import express from "express";
import ProductRouter from "./router/ProductRouter.js";
import CartRouter from "./router/CartRouter.js";
import handlebars from "express-handlebars";
import passport from "passport";
import { connectMongoDB } from "./config/mongoDB.config.js";
import config from "./config/env.config.js";
import router from "./router/index.router.js";
import { iniciaPassport } from "./config/passport.config.js";
import mongoose from "mongoose";
import sessions from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

connectMongoDB();

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

/*app.use(
  sessions({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: config.MONGO_URL,
      dbName: config.DB_NAME,
      ttl: 1800,
    }),
  })
); //Para session
*/
iniciaPassport();
app.use(passport.initialize());
//app.use(passport.session()); Esto es para session

app.use("/api", router);
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send("OK");
});

const httpServer = app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el Puerto ${config.PORT}`);
});
