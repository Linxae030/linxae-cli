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
    const _deEscape = (char: string) => {
        switch (char) {
            case "&lt;":
                return "<";
            case "&gt;":
                return ">";
            case "&#39;":
                return "'";
            case "&#34;":
                return '"';
            case "&amp;":
                return "&";
            case "$#39;":
                return "\\";
            default:
                return "";
        }
    };
    return str.replace(/\$#39;|&lt;|&gt;|&quot;|&amp;/g, _deEscape);
};
