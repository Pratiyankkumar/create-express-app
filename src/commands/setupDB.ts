import { Command } from "commander";
import askDB from "../prompts/chooseDB";

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
        return console.log("You chose PostgreSQL as a database");
      case "MongoDB":
        return console.log("You chose MongoDB as a database");
      default:
        return console.log("Unknown Case");
    }
  });
