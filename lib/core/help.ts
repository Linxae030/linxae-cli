import { program } from "commander";

export const helpOptions = () => {
    program.option("start", "呼出功能菜单");

    program.on("--help", () => {
        console.log("");
        console.log("Others:");
    });
};
