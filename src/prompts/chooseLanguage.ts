import inquirer from "inquirer";

const askLanguage = async () => {
  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Choose the language: ",
      choices: ["TypeScript", "JavaScript"],
    },
  ]);

  return language;
};

export default askLanguage;
