import fs from "fs-extra";
import { loadQuizByNo } from "./loader";
import { trimLeft } from "../utils";
/**
 *
 * @param qid 题号
 * @param path question 文件夹路径
 * @returns question 对象
 *
 */
export const getQuestionInfo = async (qid: string, path: string) => {
    let targetQuestion = undefined;
    let targetId = undefined;
    let dataObj = {
        originTitle: "",
        title: "",
        readme: "",
        testCases: "",
        footer: ""
    };
    const questions = fs.readdirSync(`${path}\\questions`);
    for (const question of questions) {
        let originId = trimLeft(question, "0").split("-")[0];
        if (originId === qid || originId === trimLeft(qid, "0")) {
            dataObj.originTitle = question;
            targetQuestion = question;
            targetId = question.split("-")[0];
            break;
        }
    }
    if (!targetQuestion || !targetId) return undefined;
    const res = await loadQuizByNo(targetId, `${path}\\questions`);

    dataObj.title = (res as any)?.info["zh-CN"]?.title ?? res?.info?.en?.title;
    dataObj.readme = (res as any)?.readme["zh-CN"] ?? res?.readme?.en;
    dataObj.testCases = res?.tests!;
    dataObj.footer = res?.footer!;
    return dataObj;
};
