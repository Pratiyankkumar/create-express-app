import { Command } from "commander";
import askAuthentication from "../prompts/Authentication"; // Import the askAuthentication function
import inquirer from "inquirer";

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

        console.log(`ℹ️ Your JWT Secret Key ${secretKey}`);
        break;
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
