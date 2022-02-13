import React, { useRef } from "react";
import {Link} from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) =>{
    console.log(props);

    const inputEl  = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }

    console.log("props.contacts", props.contacts);

    const renderContactList = props.contacts.map((contact)=>{
        console.log("In list", contact);
        return(
        <ContactCard contact={contact} 
            clickHandler = {deleteContactHandler} 
            key={contact.id}>
        </ContactCard>
        );
    })

    const getSearchTerm = () =>{
        console.log(inputEl.current.value);
       props.searchKeyWord(inputEl.current.value)
    };
    
    return(
            <div class = "main">
                <h2>
                    Contact list
                    <Link to="/add">
                        <button className="ui button blue right">Add Contact</button>
                    </Link>
                </h2>
                <div className="ui search">
                    <div className="ui icon input">
                        <input
                        ref = {inputEl}
                        type="text" placeholder="search contacts" classname = "prompt"
                        value = {props.term} onChange = {getSearchTerm} />
                        <i className="search icon"/>
                    </div>
                </div>
                <div className="ui celled list">
                    {console.log("renderContactList", renderContactList)}
                    { renderContactList}    
                </div>
            </div>
    );

}

export default ContactList;