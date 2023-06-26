import fs from "fs-extra";
import ora from "ora";
import * as path from "path";
import { cwd } from "process";
import download from "download-git-repo";
import inquirer from "inquirer";

import { TC_URL } from "@/config";
import type { MayBeUndefined } from "@/types";

import {
    removeFileInDir,
    getQuestionInfo,
    compile,
    writeToFile,
    notice,
    ensureArray
} from "@/utils";
import { DATA_PATH, TEMPLATE_PATH } from "@/utils";

export const tcmd = async (qids?: string[]) => {
    let curQids: MayBeUndefined<string[]> = undefined;
    // 获取题号
    if (qids?.length === 0 || !qids) {
        curQids = (
            await inquirer.prompt({
                name: "curQids",
                type: "input",
                message: "请输入要生成的题号(以空格分割多个):"
            })
        ).curQids.split(" ");
    } else curQids = ensureArray(qids);
    if (!curQids![0]) return notice.warning("好像没有题号呢?");
    // 判断是否已下载题库
    if (!fs.existsSync(DATA_PATH)) {
        const downloader = ora("开始下载 type-challenges 题库...");
        downloader.start();
        await download(TC_URL, DATA_PATH, async (err: Error) => {
            if (err) downloader.fail(`type-challenges 题库下载失败: ${err.message}`);
            else {
                downloader.succeed("下载成功");
                const remover = ora("开始处理 type-challenges 题库...");
                await removeFileInDir(DATA_PATH, ["questions"]);
                remover.succeed("预处理完成");
                await loopQids(curQids!);
            }
        });
    } else return await loopQids(curQids!);
};

const loopQids = async (qids: string[]) => {
    for (const qid of qids) {
        await generateMdTemplate(qid!);
    }
};

// 生成 md 模板文件
const generateMdTemplate = async (qid: string) => {
    // 获取题目信息
    const info = await getQuestionInfo(qid, DATA_PATH);

    // 判断是否找到该题
    if (!info?.originTitle) return notice.danger(`未找到 ${qid} 号题`);

    // 解析结果
    let result: string = await compile("tc-md.ejs", TEMPLATE_PATH, info!);

    // 生成文件
    const targetPath = path.resolve(cwd(), `${info?.originTitle}.md`);
    writeToFile(targetPath, result as any);

    return notice.success(`${info?.originTitle}.md 已生成`);
};
