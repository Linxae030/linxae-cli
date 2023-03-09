import ejs from "ejs";
import fs from "fs";
import { promisify } from "util";
import { deEscape } from "@/utils";
export const renderFilePromise = promisify(ejs.renderFile);

// 根据路径和对象解析模板
export const compile = async (
    templateName: string,
    templatePath: string,
    data: Record<string, unknown>
) => {
    return deEscape(
        await (renderFilePromise as any)(`${templatePath}/${templateName}`, { data }, {})
    );
};
// 根据路径写入文件
export const writeToFile = (path: string, content: string) => {
    return fs.promises.writeFile(path, content);
};
