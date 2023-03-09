// 去除左侧指定
export const trimLeft = (str: string, char: string) => {
    let stop = false;
    let temp = "";
    for (const c of str) {
        if (c === char && !stop) {
            continue;
        } else {
            temp += c;
            stop = true;
        }
    }
    return temp;
};
// 反转义
export const deEscape = (str: string) => {
    return str.replace(/&lt;|&gt;|&#39;|&#34;/g, function (match) {
        switch (match) {
            case "&lt;":
                return "<";
            case "&gt;":
                return ">";
            case "&#39;":
                return "'";
            case "&#34;":
                return '"';
            default:
                return match;
        }
    });
};
