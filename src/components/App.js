import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from "uuid";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import contactList from './ContactList';


function App() {
const LOCAL_STORAGE_KEY = "contacts"; // just variable
 const [contacts, setContacts] = useState([]); // You create a state
 

// Intial state

// []

// []


// [...[], {id: "uuid", ...state}]


 const addContactHandler = (contact) =>{
   console.log("contact hit");
   setContacts([...contacts, {id: uuidv4(), ...contact}]);
 };

 const removeContactHandler = (id) => {
   console.log(id)

// 1

  // [
  //   {
  //     id: 2
  //   }
  // ]



  const contactList = contacts.filter((contact) => {

    return contact.id !== id;

   });
    setContacts(contactList);
 }

 useEffect(()=>{
   console.log("First effect");
   const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)));
   if(retrieveContacts.length > 0) setContacts(retrieveContacts);
 }, []);

 useEffect(() =>{
  console.log("Second effect");
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
 },[contacts]);

  return (
   <div className='ui container'>
     <Header></Header>
     <AddContact addContactHandler = {addContactHandler}></AddContact>
     <ContactList contacts ={contacts}  getContactId={removeContactHandler}></ContactList>  
   </div>
  );
}

export default App;
