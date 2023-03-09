import { colors } from "../color";
// 规范输出
export const notice = {
    danger: (msg: string) => console.log(`${colors.danger("[error] ")}${msg}`),
    success: (msg: string) => console.log(`${colors.success("[success] ")}${msg}`),
    warning: (msg: string) => console.log(`${colors.warning("[warning] ")}${msg}`),
    info: (msg: string) => console.log(`${colors.info("[info] ")}${msg}`),
    debug: (msg: string) => console.log(`${colors.debug("[debug] ")}${msg}`)
};
