import { Command } from "commander";
import askDB from "../prompts/chooseDB";
import { createProjectFolder } from "../utils/folderUtils";
import { projectName } from "./setUpProject";
import {
  CreateEnvPrisma,
  createIndexMongooseJs,
  createIndexMongooseTs,
  createIndexPostgresJs,
  createIndexPostgresTs,
  CreateMongooseAuthControllerTs,
  CreateMongooseAuthMiddlewareTs,
  CreateMongooseAuthRoutesTs,
  CreateMongooseJs,
  CreateMongooseTs,
  CreateMongooseUserSchemaTs,
  CreateNodemonJsonTs,
  createPrismaClientJs,
  createPrismaClientTs,
  createPrismaSchema,
} from "../utils/generateFileFromTemplate";
import updatePackageWithDatabase from "../utils/changePackagejson";
import path from "path";
import { language } from "./setUpLanguage";

type DatabaseType = "postgresql" | "mongodb";

interface DatabaseDependencies {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

// Define dependencies for each database type
const databasePackagesTs: Record<DatabaseType, DatabaseDependencies> = {
  postgresql: {
    dependencies: {
      pg: "^8.11.3",
      "@prisma/client": "^5.9.0",
      bcryptjs: "^2.4.3",
      jsonwebtoken: "^9.0.2",
      dotenv: "^16.3.1",
    },
    devDependencies: {
      prisma: "^6.1.0",
      "@types/pg": "^8.10.9",
      "@types/bcryptjs": "^2.4.6",
      "@types/jsonwebtoken": "^9.0.5",
    },
  },
  mongodb: {
    dependencies: {
      mongoose: "^8.0.3", // MongoDB ODM
      mongodb: "^6.3.0",
      bcryptjs: "^2.4.3",
      jsonwebtoken: "^9.0.0",
      "@types/bcryptjs": "^2.4.2",
    },
    devDependencies: {
      "@types/mongodb": "^4.0.7",
      "@types/jsonwebtoken": "^9.0.0",
    },
  },
};

const databasePackagesJs: Record<DatabaseType, DatabaseDependencies> = {
  postgresql: {
    dependencies: {
      prisma: "^6.1.0",
      "@prisma/client": "^6.1.0",
      pg: "^8.11.3",
    },
    devDependencies: {
      prisma: "^6.1.0", // Optional to include Prisma CLI as a dev dependency
    },
  },
  mongodb: {
    dependencies: {
      mongoose: "^8.0.3", // MongoDB ODM
      mongodb: "^6.3.0", // MongoDB driver
      bcryptjs: "^2.4.3",
      jsonwebtoken: "^9.0.2",
      dotenv: "^16.3.1",
      cors: "^2.8.5",
    },
    devDependencies: {
      nodemon: "^3.0.2",
    }, // No dev dependencies required for JavaScript
  },
};

export let DB: string;

export const setupDB = new Command("setup-db") // Define a new command
  .description("Set up Database for your project") // Add a description
  .action(async () => {
    console.log("🔧 Setting up Database for your project\n");

    // Use askAuthentication to prompt the user
    DB = await askDB();

    // Process the selected authentication method
    console.log(`✅ You selected: ${DB}\n`);

    switch (DB) {
      case "PostgreSQL":
        if (language === "JavaScript") {
          createProjectFolder(projectName, "prisma");
          createProjectFolder(projectName, "src/db");
          createPrismaSchema(projectName);
          CreateEnvPrisma(projectName);
          updatePackageWithDatabase(
            path.join(process.cwd(), projectName),
            "postgresql",
            databasePackagesJs
          );
          createPrismaClientJs(projectName);
          createIndexPostgresJs(projectName);
          return;
        }

        if (language === "TypeScript") {
          createProjectFolder(projectName, "prisma");
          createProjectFolder(projectName, "src/db");
          createPrismaSchema(projectName);
          CreateEnvPrisma(projectName);
          updatePackageWithDatabase(
            path.join(process.cwd(), projectName),
            "postgresql",
            databasePackagesTs
          );
          createPrismaClientTs(projectName);
          createIndexPostgresTs(projectName);
          return;
        }
      case "MongoDB":
        if (language === "JavaScript") {
          createProjectFolder(projectName, "src/db");
          updatePackageWithDatabase(
            path.join(process.cwd(), projectName),
            "mongodb",
            databasePackagesJs
          );
          CreateMongooseJs(projectName);
          createIndexMongooseJs(projectName);
          return;
        }

        if (language === "TypeScript") {
          createProjectFolder(projectName, "src/db");
          updatePackageWithDatabase(
            path.join(process.cwd(), projectName),
            "mongodb",
            databasePackagesTs
          );
          CreateMongooseTs(projectName);
          CreateNodemonJsonTs(projectName);
          createIndexMongooseTs(projectName);

          return;
        }
      default:
        return console.log("Unknown Case");
    }
  });
