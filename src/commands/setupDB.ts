import { Command } from "commander";
import askDB from "../prompts/chooseDB";
import { createProjectFolder } from "../utils/folderUtils";
import { projectName } from "./setUpProject";
import {
  CreateEnvPrisma,
  CreateMongooseTs,
  createPrismaSchema,
} from "../utils/generateFileFromTemplate";
import updatePackageWithDatabase from "../utils/changePackagejson";
import path from "path";

export const setupDB = new Command("setup-db") // Define a new command
  .description("Set up Database for your project") // Add a description
  .action(async () => {
    console.log("🔧 Setting up Database for your project\n");

    // Use askAuthentication to prompt the user
    const DB = await askDB();

    // Process the selected authentication method
    console.log(`✅ You selected: ${DB}\n`);

    switch (DB) {
      case "PostgreSQL":
        createProjectFolder(projectName, "prisma");
        createPrismaSchema(projectName);
        CreateEnvPrisma(projectName);
        updatePackageWithDatabase(
          path.join(process.cwd(), projectName),
          "postgresql"
        );
        return;
      case "MongoDB":
        createProjectFolder(projectName, "src/db");
        updatePackageWithDatabase(
          path.join(process.cwd(), projectName),
          "mongodb"
        );
        CreateMongooseTs(projectName);
      default:
        return console.log("Unknown Case");
    }
  });
