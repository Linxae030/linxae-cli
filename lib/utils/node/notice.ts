import { colors } from "../color";
// 规范输出
export const notice = {
    danger: (msg: any) => console.log(`${colors.danger("[error] ")}` + msg),
    success: (msg: any) => console.log(`${colors.success("[success] ")}`, msg),
    warning: (msg: any) => console.log(`${colors.warning("[warning] ")}`, msg),
    info: (msg: any) => console.log(`${colors.info("[info] ")}`, msg),
    debug: (msg: any) => console.log(`${colors.debug("[debug] ")}`, msg)
};
