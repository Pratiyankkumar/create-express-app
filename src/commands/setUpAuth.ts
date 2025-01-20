import { Command } from "commander";
import askAuthentication from "../prompts/Authentication"; // Import the askAuthentication function
import inquirer from "inquirer";
import { createProjectFolder } from "../utils/folderUtils";
import { projectName } from "./setUpProject";
import {
  CreateExpressTypeTs,
  createIndexAuthMongooseTs,
  CreateMongooseAuthControllerTs,
  CreateMongooseAuthMiddlewareTs,
  CreateMongooseAuthRoutesTs,
  CreateMongooseUserSchemaTs,
} from "../utils/generateFileFromTemplate";
import { language } from "./setUpLanguage";
import { DB } from "./setupDB";

export const setupAuth = new Command("setup-auth") // Define a new command
  .description("Set up authentication for your project") // Add a description
  .action(async () => {
    console.log("🔧 Setting up authentication for your project...\n");

    // Use askAuthentication to prompt the user
    const authMethod = await askAuthentication();

    // Process the selected authentication method
    console.log(`✅ You selected: ${authMethod}\n`);

    switch (authMethod) {
      case "JWT (JSON Web Token)":
        console.log("ℹ️ You chose JWT authentication.");

        const { secretKey } = await inquirer.prompt([
          {
            type: "input",
            name: "secretKey",
            message: "ENter JWT secret Key",
            default: "your-secret-key",
          },
        ]);

        const jwtSecret = secretKey;

        if (language === "TypeScript" && DB === "MongoDB") {
          createProjectFolder(projectName, "src/models");
          createProjectFolder(projectName, "src/middleware");
          createProjectFolder(projectName, "src/controllers");
          createProjectFolder(projectName, "src/routes");
          createProjectFolder(projectName, "src/types");
          createIndexAuthMongooseTs(projectName);
          CreateMongooseUserSchemaTs(projectName);
          CreateMongooseAuthControllerTs(projectName, jwtSecret);
          CreateMongooseAuthMiddlewareTs(projectName, jwtSecret);
          CreateMongooseAuthRoutesTs(projectName);
          CreateExpressTypeTs(projectName);
          return;
        }
        if (language === "TypeScript" && DB === "PostgreSQL") {
          console.log(
            "The authentication feature is in development for postgresql + TS, will be available soon"
          );
          return;
        }

        if (language === "JavaScript" && DB === "MongoDB") {
          return console.log(
            "The authentication feature is in development for Mongodb + JS, will be available soon"
          );
        }

        if (language === "JavaScript" && DB === "PostgreSQL") {
          return console.log(
            "The authentication feature is in development for postgresql + JS, will be available soon"
          );
        }
      case "OAuth 2.0 (e.g., Google, GitHub)":
        console.log(
          "ℹ️ You chose OAuth 2.0. You can ask for provider details here."
        );
        break;
      case "Session-based Authentication":
        console.log("ℹ️ You chose session-based authentication.");
        break;
      case "API Key Authentication":
        console.log("ℹ️ You chose API key authentication.");
        break;
      case "Custom Token-based Authentication":
        console.log("ℹ️ You chose custom token-based authentication.");
        break;
      case "None (Skip authentication)":
        console.log("ℹ️ You chose to skip authentication.");
        break;
      default:
        console.log("⚠️ Invalid option selected.");
        break;
    }

    console.log("🎉 Authentication setup is complete!");
  });
