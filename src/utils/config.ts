import { cosmiconfig } from "cosmiconfig";
import { Config } from "../lib/defaultConfig";

const moduleName = "tailwindsorter";
const explorer = cosmiconfig(moduleName);

export default async function loadConfig(): Promise<Config | null> {
  try {
    const result = await explorer.search();
    if (result && result.config) {
      return result.config;
    }
    return null;
  } catch (error) {
    console.error("Error loading config:", error);
    return null;
  }
}
