import inquirer from "inquirer";

const askAuthentication = async () => {
  const { authMethod } = await inquirer.prompt([
    {
      type: "list",
      name: "authMethod",
      message: "Choose an authentication method:",
      choices: ["JWT (JSON Web Token)", "None (Skip authentication)"],
    },
  ]);

  return authMethod;
};

export default askAuthentication;
