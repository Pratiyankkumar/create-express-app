import inquirer from "inquirer";

const askDB = async () => {
  const { database } = await inquirer.prompt([
    {
      type: "list",
      name: "database",
      message: "Choose the Database: ",
      choices: ["PostgreSQL", "MongoDB"],
    },
  ]);

  return database;
};

export default askDB;
