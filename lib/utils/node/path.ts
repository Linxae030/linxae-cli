import fs from "fs-extra";
import * as path from "path";
import { getCmdData } from "./process";

export const CWD = process.cwd();
export const TEMPLATE_PATH = path.resolve(__dirname, "template");
export const CLI_CONF_PATH = path.resolve(__dirname, "config.js");
export const CLI_PATH = path.resolve(__dirname, "../");
export const DATA_PATH = path.resolve(CLI_PATH, "data");
/**
 *
 * @param path 要删除的路径
 * @param contain 要保留的文件
 */
export const removeFileInDir = (path: string, contain?: string[]) => {
    return new Promise((resolve, reject) => {
        const fileList = fs.readdirSync(path);
        for (const file of fileList) {
            if (contain?.includes(file)) continue;
            fs.removeSync(`${path}/${file}`);
        }
        resolve(true);
    });
};

// 创建文件夹
const mkdirSync = (dirname: string) => {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        // 不存在,判断父亲文件夹是否存在？
        if (mkdirSync(path.dirname(dirname))) {
            // 存在父亲文件，就直接新建该文件
            fs.mkdirSync(dirname);
            return true;
        }
    }
};
