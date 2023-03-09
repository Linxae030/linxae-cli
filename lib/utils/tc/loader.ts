import path from "path";
import fs from "fs-extra";
import fg from "fast-glob";
import YAML from "js-yaml";
import type { Quiz, QuizMetaInfo } from "./types";
import { defaultLocale, supportedLocales } from "./locales";
export async function loadFile(filepath: string) {
    if (fs.existsSync(filepath)) return await fs.readFile(filepath, "utf-8");
    return undefined;
}

export async function loadLocaleVariations<T = string>(
    filepath: string,
    preprocessor: (s: string) => T = s => s as any as T
) {
    const { ext, dir, name } = path.parse(filepath);
    const data: Record<string, T> = {};

    for (const locale of supportedLocales) {
        const file = preprocessor(
            (await loadFile(path.join(dir, `${name}.${locale}${ext}`))) || ""
        );

        if (file) data[locale] = file;
    }

    if (!data[defaultLocale]) {
        // default version
        const file = preprocessor((await loadFile(filepath)) || "");
        if (file) data[defaultLocale] = file;
    }

    return data;
}
export function loadFooter(text: string) {
    return text.match(/<!--info-footer-start-->[\s\S]*<!--info-footer-end-->/)?.[0];
}
export function readmeCleanUp(text: string) {
    return text
        .replace(/<!--info-header-start-->[\s\S]*<!--info-header-end-->/, "")
        .replace(/<!--info-footer-start-->[\s\S]*<!--info-footer-end-->/, "")
        .trim();
}

export function loadInfo(s: string): Partial<QuizMetaInfo> | undefined {
    const object = YAML.load(s) as any;
    if (!object) return undefined;

    const arrayKeys = ["tags", "related"];

    for (const key of arrayKeys) {
        if (object[key]) {
            object[key] = (object[key] || "")
                .toString()
                .split(",")
                .map((i: string) => i.trim())
                .filter(Boolean);
        } else {
            object[key] = undefined;
        }
    }

    return object;
}

// export async function loadQuizes(): Promise<Quiz[]> {
//     const folders = await fg("{0..9}*-*", {
//         onlyDirectories: true,
//         cwd: QUIZ_ROOT
//     });

//     const quizes = await Promise.all(folders.map(async dir => loadQuiz(dir)));

//     return quizes;
// }

export async function loadQuiz(dir: string, quizPath: string): Promise<Quiz> {
    const readmeFile = await loadFile(path.join(quizPath, dir, "README.md"));
    return {
        no: Number(dir.replace(/^(\d+)-.*/, "$1")),
        difficulty: dir.replace(/^\d+-(.+?)-.*$/, "$1") as any,
        path: dir,
        info: await loadLocaleVariations(path.join(quizPath, dir, "info.yml"), loadInfo),
        readme: await loadLocaleVariations(path.join(quizPath, dir, "README.md"), readmeCleanUp),
        template: (await loadFile(path.join(quizPath, dir, "template.ts"))) || "",
        tests: await loadFile(path.join(quizPath, dir, "test-cases.ts")),
        footer: loadFooter(readmeFile!)?.replace(
            '<a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a>',
            ""
        )
    };
}

export async function loadQuizByNo(no: number | string, quizPath: string) {
    const folders = await fg(`${no}-*`, {
        onlyDirectories: true,
        cwd: quizPath
    });
    if (folders.length) return await loadQuiz(folders[0], quizPath);

    return undefined;
}

// export function resolveInfo(quiz: Quiz, locale: string = defaultLocale) {
//     const info = Object.assign({}, quiz.info[defaultLocale], quiz.info[locale]);
//     info.tags = quiz.info[locale]?.tags || quiz.info[defaultLocale]?.tags || [];
//     info.related = quiz.info[locale]?.related || quiz.info[defaultLocale]?.related || [];

//     if (typeof info.tags === "string")
//         // @ts-expect-error
//         info.tags = info.tags
//             .split(",")
//             .map(i => i.trim())
//             .filter(Boolean);

//     return info as QuizMetaInfo;
// }
