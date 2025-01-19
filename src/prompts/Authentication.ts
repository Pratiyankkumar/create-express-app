import inquirer from "inquirer";

const askAuthentication = async () => {
  const { authMethod } = await inquirer.prompt([
    {
      type: "list",
      name: "authMethod",
      message: "Choose an authentication method:",
      choices: [
        "JWT (JSON Web Token)",
        "OAuth 2.0 (e.g., Google, GitHub)",
        "Session-based Authentication",
        "API Key Authentication",
        "Custom Token-based Authentication",
        "None (Skip authentication)",
      ],
    },
  ]);

  return authMethod;
};

export default askAuthentication;
