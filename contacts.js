const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const contactsBuffer = await fs.readFile(contactsPath, "utf-8");
    const contactsList = JSON.parse(contactsBuffer);
    return contactsList;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contactsBuffer = await fs.readFile(contactsPath, "utf-8");
    const contactsList = JSON.parse(contactsBuffer);
    const foundContact = contactsList.find(
      (contact) => contact.id === contactId
    );
    return foundContact || null;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contactsBuffer = await fs.readFile(contactsPath, "utf-8");
    const contactsList = JSON.parse(contactsBuffer);
    const removedContact = contactsList.find(
      (contact) => contact.id === contactId
    );
    if (!removedContact) return null;

    const updatedContacts = contactsList.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return removedContact;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsBuffer = await fs.readFile(contactsPath, "utf-8");
    const contactsList = JSON.parse(contactsBuffer);

    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };

    contactsList.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return newContact;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
