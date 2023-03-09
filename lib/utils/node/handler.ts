import { notice } from "./notice";
import { colors } from "../color";
export const exitHandler = () => {
    process.stdout.write(colors.warning("已退出 Linxae CLI"));
};
