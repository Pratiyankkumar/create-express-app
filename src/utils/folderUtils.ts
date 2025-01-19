import fs from "fs-extra";
import path from "path";

export const createFolder = async (folderName: string) => {
  try {
    const rootPath = path.resolve(folderName); // Get the absolute path
    await fs.ensureDir(rootPath); // Ensure the directory exists
    console.log(
      `✅ Folder "${folderName}" created successfully at ${rootPath}`
    );
  } catch (error: any) {
    console.error(`❌ Error creating folder "${folderName}":`, error.message);
  }
};

/**
 * Creates a folder at the specified path relative to project root
 * @param {string} projectName - Name of the project (root folder)
 * @param {string} folderPath - Relative path from project root (e.g., 'src', 'src/controllers')
 * @returns {Promise<string>} - Returns the absolute path of created folder
 */
export async function createProjectFolder(
  projectName: string,
  folderPath: string
): Promise<string> {
  try {
    // Create the full path: root/projectName/folderPath
    const projectRoot = path.join(process.cwd(), projectName);
    const fullPath = path.join(projectRoot, folderPath);

    // Ensure the directory exists (creates all necessary parent directories)
    await fs.ensureDir(fullPath);

    // console.log(`✅ Created folder: ${folderPath} at ${fullPath}`);
    return fullPath;
  } catch (error) {
    console.error(
      `❌ Error creating folder "${folderPath}":`,
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
}
