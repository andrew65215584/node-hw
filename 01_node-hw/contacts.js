const fs = require('fs');
const path = require('path')
const nanoid = require('nanoid')
const contactsPath = path.join(__dirname, './db/contacts.json')
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    console.table(JSON.parse(data));
  })
}
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const parseData = JSON.parse(data)
    const foundContacts = parseData.filter(el => el.id === contactId)
    console.log(foundContacts);
  })
}
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const parseData = JSON.parse(data)
    const foundContacts = parseData.filter(el => el.id !== contactId)
    const strNewData = JSON.stringify(foundContacts)
    fs.writeFile(contactsPath, strNewData, err => {
      if (err) {
        console.log(err);
      }
    })
  })
}
function addContact(name, email, phone) {
  const id = nanoid.nanoid(3);
  const newContact = {
    id,
    name,
    email,
    phone,
  }
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    let parseData = JSON.parse(data)
    parseData = [...parseData, newContact]
    const strNewData = JSON.stringify(parseData)
    fs.writeFile(contactsPath, strNewData, err => {
      if (err) {
        console.log(err);
      }
    })
  })
}
module.exports = {
  getContactById,
  removeContact, addContact, listContacts
}