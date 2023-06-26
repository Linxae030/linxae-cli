import { program } from "commander";
import { start } from "@/script";
import { tcmd } from "@/script";
export const createCommands = () => {
    program
        .command("tcmd [qids...]")
        .alias("tm")
        .description("生成 type-challenge md文件 总结模板")
        .action(tcmd);
    program.command("start").description("开始功能选择").action(start);
};
