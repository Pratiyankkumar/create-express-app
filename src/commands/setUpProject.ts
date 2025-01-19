import { Command } from "commander";
import askProjectName from "../prompts/createProject";
import { setupAuth } from "./setUpAuth";
import { setupLang } from "./setUpLanguage";
import { setupDB } from "./setupDB";
import { createFolder } from "../utils/folderUtils";

export let projectName: string;

export const setupProject = new Command("project-name") // Define a new command
  .description("Give Project a name") // Add a description
  .action(async () => {
    // Use askAuthentication to prompt the user
    projectName = await askProjectName();

    // Process the selected authentication method
    console.log(`✅ You Project Name is : ${projectName}\n`);
    await createFolder(projectName);

    await setupLang.parseAsync(["node", "setup-language"]);
    await setupDB.parseAsync(["node", "setup-db"]);
    await setupAuth.parseAsync(["node", "setup-auth"]);
  });
