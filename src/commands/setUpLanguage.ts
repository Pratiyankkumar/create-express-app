import { Command } from "commander";
import { projectName } from "./setUpProject";
import askLanguage from "../prompts/chooseLanguage";
import {
  createIndexJsFile,
  createIndexTsFile,
  createPackageFile,
  createPackageFileJs,
  createTsFile,
} from "../utils/generateFileFromTemplate";
import { createProjectFolder } from "../utils/folderUtils";

export let language: string;

export const setupLang = new Command("setup-language") // Define a new command
  .description("Set up Language for your project") // Add a description
  .action(async () => {
    console.log("🔧 Setting up Language for your project\n");

    // Use askAuthentication to prompt the user
    language = await askLanguage();

    // Process the selected authentication method
    console.log(`✅ You selected: ${language}\n`);

    switch (language) {
      case "JavaScript":
        createPackageFileJs(projectName);
        createProjectFolder(projectName, "src");
        createIndexJsFile(projectName);
        createProjectFolder(projectName, "src/middleware");
        createProjectFolder(projectName, "src/routes");
        return;
      case "TypeScript":
        createPackageFile(projectName);
        createTsFile(projectName);
        createProjectFolder(projectName, "src");
        createIndexTsFile(projectName);
        createProjectFolder(projectName, "src/middleware");
        createProjectFolder(projectName, "src/routes");
        return;
      default:
        return console.log("Unknown Case");
    }
  });
