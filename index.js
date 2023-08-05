const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
const yargs = require("yargs");

const argv = yargs
  .option("action", {
    alias: "a",
    describe: "Action to perform",
    choices: ["list", "get", "add", "remove"],
    demandOption: true,
  })
  .option("id", {
    alias: "i",
    describe: "Contact ID",
    type: "string",
  })
  .option("name", {
    alias: "n",
    describe: "Contact's name",
    type: "string",
  })
  .option("email", {
    alias: "e",
    describe: "Contact's email",
    type: "string",
  })
  .option("phone", {
    alias: "p",
    describe: "Contact's phone",
    type: "string",
  })
  .help().argv;

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        console.table(allContacts);
        break;

      case "get":
        const contactById = await getContactById(id);
        console.log("Contact by ID:", contactById);
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log("New contact:", newContact);
        break;

      case "remove":
        const removedContact = await removeContact(id);
        console.log("Removed contact:", removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

invokeAction(argv);
