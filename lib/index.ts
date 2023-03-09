import { program } from "commander";
import { createCommands, helpOptions } from "./core";
import pkg from "../package.json";

program.name("lin").version(pkg.version);
// helpOptions();

createCommands();
program.parse(process.argv);
