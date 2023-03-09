import inquirer from "inquirer";

import { startChoices } from "@/config";
import { AnswerType, ChoiceValue } from "@/types";

import { tcmd } from "../tcmd";

export const start = async () => {
    process.on("SIGINT", () => {
        console.log("润");
    });
    const { action } = await inquirer.prompt<AnswerType<ChoiceValue>>({
        name: "action",
        type: "list",
        message: "选择要使用的功能~",
        choices: startChoices
    });

    if (action === "tcmd") await tcmd();
};
