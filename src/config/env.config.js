import dotenv from "dotenv";
import { Command, Option } from "commander";

const program = new Command();

program.addOption(
  new Option("-m, --mode <mode>", "mode de ejecución del script")
    .choices(["dev", "prod"])
    .default("dev")
);

program.parse();
const opts = program.opts();
console.log(opts);

const mode = opts.mode;

dotenv.config({
  path: mode === "dev" ? "./.env.dev" : "./.env.prod",
  override: true,
});
export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  SECRET: process.env.SECRET,
};
