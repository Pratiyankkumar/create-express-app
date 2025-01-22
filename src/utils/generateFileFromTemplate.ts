import fs from "fs-extra";
import path from "path";

/**
 * Generates a file from a template in the specified output directory
 * @param {string} templatePath - Path to the template file (e.g., 'templates/package.json.template')
 * @param {string} outputDir - Directory where the project will be generated
 * @param {Record<string, string>} [replacements] - Optional object containing placeholder replacements
 * @returns {Promise<void>}
 */
async function generateFromTemplate(
  templatePath: string,
  outputDir: string,
  replacements?: Record<string, string>
): Promise<void> {
  try {
    // Ensure template exists
    if (!(await fs.pathExists(templatePath))) {
      throw new Error(`Template not found at: ${templatePath}`);
    }

    // Read template content
    const templateContent = await fs.readFile(templatePath, "utf8");

    // Get the output filename by removing .template extension
    const outputFileName =
      path.basename(templatePath) === "package.json.ts.template"
        ? "package.json"
        : path.basename(templatePath).replace(".template", "");

    // Create the output directory if it doesn't exist
    await fs.ensureDir(outputDir);

    // Replace all placeholders if replacements are provided
    let finalContent = templateContent;
    if (replacements) {
      Object.entries(replacements).forEach(([key, value]) => {
        const placeholder = new RegExp(`{{${key}}}`, "g");
        finalContent = finalContent.replace(placeholder, value);
      });
    }

    // Generate output path in the new project directory
    const outputPath = path.join(outputDir, outputFileName);

    // Write the file
    await fs.writeFile(outputPath, finalContent, "utf8");
    // console.log(
    //   `✅ Generated ${outputFileName} successfully at: ${outputPath}\n`
    // );
  } catch (error) {
    console.error(
      "❌ Error generating file:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
}

// export default generateFromTemplate;

// Example usage:
export async function createPackageFile(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/package.json.ts.template"
  );
  const projectDir = path.join(process.cwd(), projectName);
  const replacements = {
    projectName: projectName,
    version: "1.0.0",
  };

  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function createPackageFileJs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/package.json.template"
  );
  const projectDir = path.join(process.cwd(), projectName);
  const replacements = {
    projectName: projectName,
    version: "1.0.0",
  };

  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function createTsFile(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/tsconfig.json.template"
  );
  const projectDir = path.join(process.cwd(), projectName);

  // No replacements needed for tsconfig
  await generateFromTemplate(templatePath, projectDir);
}

export async function createIndexTsFile(projectName: string) {
  const templatePath = path.join(__dirname, "../templates/index.ts.template");
  const projectDir = path.join(process.cwd(), `/${projectName}/src`);

  const replacements = {
    projectName,
  };

  // No replacements needed for tsconfig
  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function createIndexJsFile(projectName: string) {
  const templatePath = path.join(__dirname, "../templates/index.js.template");
  const projectDir = path.join(process.cwd(), `/${projectName}/src`);

  const replacements = {
    projectName,
  };

  // No replacements needed for tsconfig
  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function createPrismaSchema(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/schema.prisma.template"
  );

  const projectDir = path.join(process.cwd(), `/${projectName}/prisma`);

  await generateFromTemplate(templatePath, projectDir);
}

export async function CreateEnvPrisma(projectName: string) {
  const templatePath = path.join(__dirname, "../templates/.env.template");

  const projectDir = path.join(process.cwd(), projectName);

  await generateFromTemplate(templatePath, projectDir);
}

export async function CreateMongooseTs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/mongoose.ts.template"
  );
  const projectDir = path.join(process.cwd(), `${projectName}/src/db`);

  await generateFromTemplate(templatePath, projectDir);
}

export async function CreateMongooseJs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/mongoose.js.template"
  );
  const projectDir = path.join(process.cwd(), `${projectName}/src/db`);

  await generateFromTemplate(templatePath, projectDir);
}

export async function createPrismaClientTs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/prismaClient.ts.template"
  );
  const projectDir = path.join(process.cwd(), `${projectName}/src/db`);

  await generateFromTemplate(templatePath, projectDir);
}

export async function createPrismaClientJs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/prismaClient.js.template"
  );
  const projectDir = path.join(process.cwd(), `${projectName}/src/db`);

  await generateFromTemplate(templatePath, projectDir);
}

export async function CreateMongooseUserSchemaTs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/jwt/ts/mongodb/User.ts.template"
  );

  const projectDir = path.join(process.cwd(), `${projectName}/src/models`);

  await generateFromTemplate(templatePath, projectDir);
}

export async function CreateMongooseAuthMiddlewareTs(
  projectName: string,
  jwtSecret: string
) {
  const templatePath = path.join(
    __dirname,
    "../templates/jwt/ts/mongodb/authMiddleware.ts.template"
  );

  const replacements = {
    jwtSecret,
  };

  const projectDir = path.join(process.cwd(), `${projectName}/src/middleware`);

  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function CreateMongooseAuthControllerTs(
  projectName: string,
  jwtSecret: string
) {
  const templatePath = path.join(
    __dirname,
    "../templates/jwt/ts/mongodb/authController.ts.template"
  );

  const replacements = {
    jwtSecret,
  };

  const projectDir = path.join(process.cwd(), `${projectName}/src/controllers`);

  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function CreateMongooseAuthRoutesTs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/jwt/ts/mongodb/authRoutes.ts.template"
  );

  const projectDir = path.join(process.cwd(), `${projectName}/src/routes`);

  await generateFromTemplate(templatePath, projectDir);
}

export async function CreateNodemonJsonTs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/jwt/ts/mongodb/nodemon.json.template"
  );

  const projectDir = path.join(process.cwd(), projectName);

  await generateFromTemplate(templatePath, projectDir);
}

export async function CreateExpressTypeTs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/jwt/ts/mongodb/express.d.ts.template"
  );

  const projectDir = path.join(process.cwd(), `${projectName}/src/types`);

  await generateFromTemplate(templatePath, projectDir);
}

export async function createIndexAuthMongooseTs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/jwt/ts/mongodb/index.ts.template"
  );
  const projectDir = path.join(process.cwd(), `/${projectName}/src`);

  const replacements = {
    projectName,
  };

  // No replacements needed for tsconfig
  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function createIndexMongooseTs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/ts/mongodb/index.ts.template"
  );
  const projectDir = path.join(process.cwd(), `/${projectName}/src`);

  const replacements = {
    projectName,
  };

  // No replacements needed for tsconfig
  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function createIndexMongooseJs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/js/mongodb/index.js.template"
  );
  const projectDir = path.join(process.cwd(), `/${projectName}/src`);

  const replacements = {
    projectName,
  };

  // No replacements needed for tsconfig
  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function createIndexPostgresJs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/js/postgres/index.js.template"
  );
  const projectDir = path.join(process.cwd(), `/${projectName}/src`);

  const replacements = {
    projectName,
  };

  // No replacements needed for tsconfig
  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function createIndexPostgresTs(projectName: string) {
  const templatePath = path.join(
    __dirname,
    "../templates/ts/postgres/index.ts.template"
  );
  const projectDir = path.join(process.cwd(), `/${projectName}/src`);

  const replacements = {
    projectName,
  };

  // No replacements needed for tsconfig
  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function generateAuthFilesPostgresqlTS(
  projectName: string,
  fileName: string,
  dir: string,
  jwtSecret?: string
) {
  const templatePath = path.join(
    __dirname,
    `../templates/jwt/ts/postgres/${fileName}.template`
  );

  const projectDir = path.join(process.cwd(), `/${projectName}/${dir}`);

  const replacements = {
    projectName,
    jwtSecret: jwtSecret ?? "",
  };

  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function generateAuthFilesMongoJS(
  projectName: string,
  fileName: string,
  dir: string,
  jwtSecret?: string
) {
  const templatePath = path.join(
    __dirname,
    `../templates/jwt/js/mongodb/${fileName}.template`
  );

  const projectDir = path.join(process.cwd(), `/${projectName}/${dir}`);

  const replacements = {
    projectName,
    jwtSecret: jwtSecret ?? "",
  };

  await generateFromTemplate(templatePath, projectDir, replacements);
}

export async function generateAuthFilesPostgreJS(
  projectName: string,
  fileName: string,
  dir: string,
  jwtSecret?: string
) {
  const templatePath = path.join(
    __dirname,
    `../templates/jwt/js/postgres/${fileName}.template`
  );

  const projectDir = path.join(process.cwd(), `/${projectName}/${dir}`);

  const replacements = {
    projectName,
    jwtSecret: jwtSecret ?? "",
  };

  await generateFromTemplate(templatePath, projectDir, replacements);
}
