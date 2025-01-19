import { Command } from "commander";
import { setupProject } from "./commands/setUpProject";

const program = new Command();

program.name("my-cli").version("1.0.0").description("My CLI tool");

// Add the setup-auth command to the CLI
program.addCommand(setupProject);

// Parse the CLI arguments
program.parse(process.argv);
