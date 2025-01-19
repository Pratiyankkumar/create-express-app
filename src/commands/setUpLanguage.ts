import { Command } from "commander";
import { projectName } from "./setUpProject";
import askLanguage from "../prompts/chooseLanguage";
import {
  createPackageFile,
  createTsFile,
} from "../utils/generateFileFromTemplate";
import { createProjectFolder } from "../utils/folderUtils";

export const setupLang = new Command("setup-language") // Define a new command
  .description("Set up Language for your project") // Add a description
  .action(async () => {
    console.log("🔧 Setting up Language for your project\n");

    // Use askAuthentication to prompt the user
    const language = await askLanguage();

    // Process the selected authentication method
    console.log(`✅ You selected: ${language}\n`);

    switch (language) {
      case "JavaScript":
        return console.log("You chose Javascript as a language");
      case "TypeScript":
        createPackageFile(projectName);
        createTsFile(projectName);
        createProjectFolder(projectName, "src");
        return;
      default:
        return console.log("Unknown Case");
    }
  });
