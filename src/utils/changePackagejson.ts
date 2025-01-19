import fs from "fs-extra";
import path from "path";

type DatabaseType = "postgresql" | "mongodb";

interface DatabaseDependencies {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

/**
 * Updates package.json with database-specific dependencies
 * @param {string} projectPath - Path to the project root
 * @param {DatabaseType} database - Selected database type
 * @returns {Promise<void>}
 */
export default async function updatePackageWithDatabase(
  projectPath: string,
  database: DatabaseType,
  databasePackages: Record<DatabaseType, DatabaseDependencies>
): Promise<void> {
  try {
    const packageJsonPath = path.join(projectPath, "package.json");

    // Check if package.json exists
    if (!(await fs.pathExists(packageJsonPath))) {
      throw new Error("package.json not found in the project directory");
    }

    // Read existing package.json
    const packageJson = await fs.readJson(packageJsonPath);

    // Get database-specific packages
    const dbPackages = databasePackages[database];

    // Update dependencies and devDependencies
    packageJson.dependencies = {
      ...packageJson.dependencies,
      ...dbPackages.dependencies,
    };

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...dbPackages.devDependencies,
    };

    // Write updated package.json
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    console.log(
      `✅ Successfully updated package.json with ${database} dependencies \n`
    );
  } catch (error) {
    console.error(
      "❌ Error updating package.json:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
}
