import { Command } from "commander";
import askAuthentication from "../prompts/Authentication";
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
  generateAuthFilesMongoJS,
  generateAuthFilesPostgreJS,
  generateAuthFilesPostgresqlTS,
} from "../utils/generateFileFromTemplate";
import { language } from "./setUpLanguage";
import { DB } from "./setupDB";

const printNextSteps = (db: string, lang: string) => {
  console.log("\n📋 Next steps:");
  console.log("1. Install dependencies:");
  console.log("   npm install");

  if (db === "MongoDB") {
    console.log("\n2. Set up MongoDB connection:");
    console.log("   - Paste you mongodb connection string in src/db/mongoose");
    console.log(
      "\n   Your connection will be configured in src/db/mongoose.js"
    );
  }

  if (db === "PostgreSQL") {
    console.log("\n2. Set up PostgreSQL connection:");
    console.log(
      "   - .env file is created in your project root your project root"
    );
    console.log("   - Add your PostgreSQL connection string there :");
    console.log(
      "     DATABASE_URL=postgresql://user:password@localhost:5432/dbname"
    );
    console.log("\n3. Initialize Prisma and create database tables:");
    console.log("   npx prisma generate");
    console.log("   npx prisma migrate dev --name init");
  }

  console.log("\n4. Start the server:");
  console.log(`   ${lang === "TypeScript" ? "npm run dev" : "npm run dev"}`);
};

export const setupAuth = new Command("setup-auth")
  .description("Set up authentication for your project")
  .action(async () => {
    console.log("🔧 Setting up authentication for your project...\n");

    const authMethod = await askAuthentication();
    console.log(`✅ You selected: ${authMethod}\n`);

    switch (authMethod) {
      case "JWT (JSON Web Token)":
        console.log("ℹ️ You chose JWT authentication.");

        const { secretKey } = await inquirer.prompt([
          {
            type: "input",
            name: "secretKey",
            message: "Enter JWT secret Key",
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
          printNextSteps("MongoDB", "TypeScript");
          return;
        }
        if (language === "TypeScript" && DB === "PostgreSQL") {
          createProjectFolder(projectName, "src/middleware");
          createProjectFolder(projectName, "src/controllers");
          createProjectFolder(projectName, "src/routes");
          createProjectFolder(projectName, "src/types");
          generateAuthFilesPostgresqlTS(projectName, "index.ts", "src", "");
          generateAuthFilesPostgresqlTS(
            projectName,
            "schema.prisma",
            "prisma",
            ""
          );
          generateAuthFilesPostgresqlTS(
            projectName,
            "authController.ts",
            "src/controllers",
            jwtSecret
          );
          generateAuthFilesPostgresqlTS(
            projectName,
            "authMiddleware.ts",
            "src/middleware",
            jwtSecret
          );
          generateAuthFilesPostgresqlTS(
            projectName,
            "authRoutes.ts",
            "src/routes",
            ""
          );
          generateAuthFilesPostgresqlTS(
            projectName,
            "express.d.ts",
            "src/types",
            ""
          );
          generateAuthFilesPostgresqlTS(projectName, "nodemon.json", "", "");
          printNextSteps("PostgreSQL", "TypeScript");
          return;
        }

        if (language === "JavaScript" && DB === "MongoDB") {
          createProjectFolder(projectName, "src/models");
          createProjectFolder(projectName, "src/middleware");
          createProjectFolder(projectName, "src/controllers");
          createProjectFolder(projectName, "src/routes");
          generateAuthFilesMongoJS(projectName, "index.js", "src", "");
          generateAuthFilesMongoJS(projectName, "User.js", "src/models", "");
          generateAuthFilesMongoJS(
            projectName,
            "authRoutes.js",
            "src/routes",
            ""
          );
          generateAuthFilesMongoJS(
            projectName,
            "authMiddleware.js",
            "src/middleware",
            jwtSecret
          );
          generateAuthFilesMongoJS(
            projectName,
            "authController.js",
            "src/controllers",
            jwtSecret
          );
          printNextSteps("MongoDB", "JavaScript");
          return;
        }

        if (language === "JavaScript" && DB === "PostgreSQL") {
          createProjectFolder(projectName, "prisma");
          createProjectFolder(projectName, "src/models");
          createProjectFolder(projectName, "src/middleware");
          createProjectFolder(projectName, "src/controllers");
          createProjectFolder(projectName, "src/routes");
          generateAuthFilesPostgreJS(projectName, "index.js", "src", "");
          generateAuthFilesPostgreJS(
            projectName,
            "authRoutes.js",
            "src/routes",
            ""
          );
          generateAuthFilesPostgreJS(
            projectName,
            "authController.js",
            "src/controllers",
            jwtSecret
          );
          generateAuthFilesPostgreJS(
            projectName,
            "authMiddleware.js",
            "src/middleware",
            jwtSecret
          );
          generateAuthFilesPostgreJS(
            projectName,
            "schema.prisma",
            "prisma",
            ""
          );
          printNextSteps("PostgreSQL", "JavaScript");
          return;
        }
      default:
        console.log("⚠️ Invalid option selected.");
        break;
    }

    console.log("🎉 Authentication setup is complete!");
  });
