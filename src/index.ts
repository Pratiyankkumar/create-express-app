// #!/usr/bin/env node
import { Command } from "commander";
import { setupProject } from "./commands/setUpProject";

const program = new Command();

program
  .name("create-express-app")
  .version("1.0.0")
  .description("A build tool like create react app but for express");

// Add the setup-auth command to the CLI
program.addCommand(setupProject);

// Parse the CLI arguments
program.parse(process.argv);
