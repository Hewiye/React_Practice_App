import React, {useState, useEffect} from 'react';
import {BrowserRouter as  Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from './ContactDetail';


function App() {
const LOCAL_STORAGE_KEY = "contacts"; // just variable
 const [contacts, setContacts] = useState([]); // You create a state
 const [searchTerm, setSearchTerm]= useState("");
 const [searchResults, setSearchResults] = useState([]);
 
 
 const addContactHandler = (contact) =>{
   console.log("contact hit");
   setContacts([...contacts, {id: uuidv4(), ...contact}]);
 };

 const removeContactHandler =  (id) => {

  const newContactList = contacts.filter((contact) => {

    return contact.id !== id;

   });
    setContacts(newContactList);
 };

 const searchHandler = (searchTerm) =>{
   setSearchTerm(searchTerm);
  console.warn(searchTerm);
   if(searchTerm !== "" && contacts){
     const newContactList = contacts.filter((contact) =>{
        return Object.values(contact).join("")?.toLowerCase().includes(searchTerm?.toLowerCase());
     }); 

     setSearchResults(newContactList);
    }
    else{
     setSearchResults(contacts);
   }
   
};

 useEffect(()=>{
   console.log("First effect");
   const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)));
   if(retrieveContacts.length > 0) setContacts(retrieveContacts);
 }, []);

 useEffect(() =>{
  console.log("Second effect", contacts);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
 },[contacts]);

 const a ={
  "name":"beraki"
 };

  return (
   <div className='ui container'>
     <Router>
        <Header></Header>
        <Switch>
          <Route path = "/" exact render={(props)=> 
          (<ContactList
             {...props} 
             contacts = {searchTerm?.length < 1 ? contacts: searchResults} 
             getContactId={removeContactHandler}
             term = {searchTerm} 
             searchKeyWord={searchHandler}
          />)}></Route>
          <Route path = "/add" render={(props)=>(<AddContact {...props} addContactHandler = {addContactHandler}/>)} ></Route>
          <Route path = "/contact/:id" component = {ContactDetail}/>
        </Switch> 
     </Router>
   </div>
  );
}

export default App;
