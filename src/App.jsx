import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  // console.log(contacts);
  const [renderContacts, setRenderContacts] = useState([contacts[0], contacts[4], contacts[11], contacts[21], contacts[30]])
  const [allContactsAdded, setAllContactsAdded] = useState(false);

  const handleRandomContact = () => {
    // console.log("Testing random contact");
    const randomNumber = Math.floor(Math.random() * contacts.length)
    let randomContact = contacts[randomNumber]
    // console.log(randomContact);

    // Check if we added all contacts:
    if (contacts.length === renderContacts.length) {
      setAllContactsAdded(true);
      console.log("All contacts added!");
      return // Stop the handler
    }

    // Check for duplicates, comparing the ids:
    let isDuplicatedContact = false;
    let newArr = renderContacts.filter(el => el.id === randomContact.id)
    if (newArr.length > 0) {
      isDuplicatedContact = true
    }
    if (isDuplicatedContact) {
      console.log("Contact duplicated!");
      handleRandomContact()
      return;
    }
    if (!isDuplicatedContact) {
      setRenderContacts([...renderContacts, randomContact])
    }
  }

  const handleSortPopularity = () => {
    // To sort a state array we should clone it:
    const sortedByPopularity = JSON.parse(JSON.stringify(renderContacts))
    // And now sort it by popularity (note the sort implementation for numbers)
    sortedByPopularity.sort((el1, el2) => el2.popularity - el1.popularity)
    setRenderContacts(sortedByPopularity);
  }

  const handleSortName = () => {
    // To sort a state array we should clone it:
    const sortedByName = JSON.parse(JSON.stringify(renderContacts))
    // And now sort it by name (alphabetically, note the sort implementation)
    sortedByName.sort((el1, el2) => el2.name < el1.name ? 1 : -1)
    setRenderContacts(sortedByName);
  }

  const handleDeleteContact = (id) => {
    // To delete an item on a state array we should clone it:
    const clonedContacts = JSON.parse(JSON.stringify(renderContacts))
    // And then find and delete the item:
    let indexToDelete = clonedContacts.findIndex(el => el.id === id)
    clonedContacts.splice(indexToDelete, 1)
    setRenderContacts(clonedContacts)
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>

      <div className="buttons-container">
        {/* <button className={allContactsAdded ? "disabled" : ""} onClick={handleRandomContact}>Add Random Contact</button> */}
        <button onClick={handleRandomContact}>Add Random Contact</button>
        <button onClick={handleSortPopularity}>Sort by popularity</button>
        <button onClick={handleSortName}>Sort by name</button>
      </div>

      {allContactsAdded && (
        <div className="success-message">
          All contacts have been added!
        </div>
      )}

      <table>
        <thead>
            <tr>
                <th className="table-header">Picture</th>
                <th className="table-header">Name</th>
                <th className="table-header">Popularity</th>
                <th className="table-header">Won Oscar</th>
                <th className="table-header">Won Emmy</th>
                {/* <th className="table-header">Action</th> */}
            </tr>
        </thead>
        <tbody>
          {renderContacts.map((eachContact, index) => {
            const {name, pictureUrl, popularity, id, wonOscar, wonEmmy} = eachContact
            return (
              <tr key={id} className="table-row">
                <td><img src={pictureUrl} alt="actor" /></td>
                <td>{name}</td>
                <td>{popularity.toFixed(2)}</td>
                <td>{wonOscar && "🏆"}</td>
                <td>{wonEmmy && "🌟"}</td>
                <td>
                  {/* Button to call handleRandomContact: Must be with call back so we pass parameters. */}
                  <button className="button-delete" onClick={() => {
                      handleDeleteContact(id)
                  }}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
