const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("node:path/win32");
const chalk = require("chalk");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      console.log(chalk.red("Sorry, no such contact found!"));
      return;
    }

    console.log(chalk.blue("Contact found:"), contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (contacts.length === updatedContacts.length) {
      console.log(chalk.red("Sorry, there is no such contact!"));
      return;
    }

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf-8");
    console.log(chalk.green("Contact is successfully deleted!"));
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    console.log(chalk.green("Contact is successfully created:"), newContact);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
