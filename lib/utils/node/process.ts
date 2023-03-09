import { spawn } from "child_process";
// 平台 cmd 映射
export const platformMap = {
    npm: process.platform === "win32" ? "npm.cmd" : "npm",
    pnpm: process.platform === "win32" ? "pnpm.cmd" : "pnpm",
    npx: process.platform === "win32" ? "npx.cmd" : "npx"
};
// 平台键类型
export type Platforms = keyof typeof platformMap;
/**
 *
 * @param cmd 需要执行的指令
 * @returns 得到的 data
 */
export const getCmdData = (cmd: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        try {
            const args = cmd.split(" ");
            const prefix: Platforms = args[0] as Platforms;
            const ls = spawn(platformMap[prefix], args.slice(1));
            ls.stdout.on("data", data => {
                resolve(typeof data === "undefined" ? undefined : `${data}`.replace("\n", ""));
            });
        } catch {
            resolve(undefined);
        }
    });
};
