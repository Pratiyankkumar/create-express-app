import fs from "fs-extra";
import path from "path";

type DatabaseType = "postgresql" | "mongodb";

interface DatabaseDependencies {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

// Define dependencies for each database type
const databasePackages: Record<DatabaseType, DatabaseDependencies> = {
  postgresql: {
    dependencies: {
      prisma: "^6.1.0",
      pg: "^8.11.3",
    },
    devDependencies: {
      "@prisma/client": "^6.1.0",
      "@types/pg": "^8.10.9",
    },
  },
  mongodb: {
    dependencies: {
      mongoose: "^8.0.3", // MongoDB ODM
      mongodb: "^6.3.0",
    },
    devDependencies: {
      "@types/mongodb": "^4.0.7",
    },
  },
};

/**
 * Updates package.json with database-specific dependencies
 * @param {string} projectPath - Path to the project root
 * @param {DatabaseType} database - Selected database type
 * @returns {Promise<void>}
 */
export default async function updatePackageWithDatabase(
  projectPath: string,
  database: DatabaseType
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
