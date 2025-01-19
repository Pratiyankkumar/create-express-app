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
    const outputFileName = path.basename(templatePath).replace(".template", "");

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
