import { LANGUAGE } from "./language.const";

export type ProjectLanguage =
	(typeof LANGUAGE)[keyof typeof LANGUAGE];