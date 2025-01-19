import inquirer from "inquirer";

const askProjectName = async (): Promise<string> => {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
      default: "my-express-app",
      validate: (input: string) => {
        return /^[a-zA-Z0-9-_]+$/.test(input)
          ? true
          : "Project name can only contain letters, numbers, dashes, and underscores.";
      },
    },
  ]);
  return projectName;
};

export default askProjectName;
