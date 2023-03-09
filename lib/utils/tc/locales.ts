import fs from "fs-extra";
import en from "../../locales/en";
import cn from "../../locales/en";

export const defaultLocale = "en";

export const supportedLocales = ["en", "zh-CN"] as const;

export const messages = {
    en,
    "zh-CN": cn
};

export type SupportedLocale = keyof typeof messages;

export function t(locale: SupportedLocale, key: string): string {
    const result =
        (messages[locale] && (messages as any)[locale][key]) ||
        (messages as any)[defaultLocale][key];
    if (!result) throw new Error(`Missing message for key "${key}"`);
    return result;
}

export function f(name: string, locale: string, ext: string) {
    if (locale === defaultLocale) return `${name}.${ext}`;
    return `${name}.${locale}.${ext}`;
}
