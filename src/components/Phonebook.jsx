import { useState, useEffect } from "react";
import axios from "axios";
import dbjson_service from "../services/dbjson";

// const personList = [
//   { name: "Arto Hellas", number: "040-123456", id: 1 },
//   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
//   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
//   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
// ];


const Filter = (props) => {
  return (
    <>
      <div>
        {" "}
        filter shown with{" "}
        <input value={props.filterWords} onChange={props.onFilter}></input>
      </div>
    </>
  );
};

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.addNewPerson}>
        <div>
          name: <input value={props.newName} onChange={props.addNewName} />
        </div>
        <div>
          number:{" "}
          <input
            value={props.newPhoneNumber}
            onChange={props.addNewPhoneNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Persons = (props) => {
  return (
    <>
      <div key={props.e.id}>
        <span>id: {props.e.id} </span>
        {props.e.name} {props.e.number}
        <button onClick={props.handleDelte}>delete</button>
      </div>
    </>
  );
};

const Notification = (props) => {

  const baseStyle = {
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const typeStyles = {
    success: {
      ...baseStyle,
      color: 'green',
      background: 'lightgrey',
      borderColor: 'green'
    },
    error: {
      ...baseStyle,
      color: 'red',
      background: 'lightgrey',
      borderColor: 'red'
    }
  }


  if (!props?.message) {  // 检查 message.text 是否存在
    return null
  }

  return (
    <div className='error' style={typeStyles[props.message.type]}>
      {props.message.text}
    </div>
  )
}

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [showPersons, setShowPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [filterWords, setFilterWords] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [message, setMessage] = useState(null)

  const obj_type = "persons";
  useEffect(() => {
    console.log("effect");
    dbjson_service.getAll(obj_type).then((returnedPersons) => {
      console.log("promise fulfilled");
      setPersons(returnedPersons);
      setShowPersons(returnedPersons);
      setNewName(returnedPersons[0].name);
      setNewPhoneNumber(returnedPersons[0].newPhoneNumber);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addNewPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      if (existingPerson.number == newPhoneNumber) {
        alert(`${newName} is already exits`);
        return;
      } else {
        dbjson_service
          .update(obj_type, existingPerson.id, {
            ...existingPerson,
            number: newPhoneNumber,
          })
          .then((resp) => {
            const updatedPersons = persons.map((person) =>
              person.id === existingPerson.id ? resp : person
            );
            setPersons(updatedPersons);
            setShowPersons(updatedPersons);    
          }).catch(err => {
            console.log('error',err);
            handleMsg( `${existingPerson.name} has already been removed from server`, 'error')
          });
      }
      return;
    }

    const phonebookObj = {
      name: newName,
      number: newPhoneNumber,
    };
    dbjson_service.create(obj_type, phonebookObj).then((resp) => {
      setPersons([...persons, resp]);
      setShowPersons([...persons, resp]);
      setNewName("");
      handleMsg(`${resp.name} is Added`, 'success')
    });
  };

  const addNewName = (event) => {
    setNewName(event.target.value);
  };

  const addNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const deleteObj = (obj_type, obj) => {
    if(confirm(`Delete ${obj.name} `)){
      dbjson_service.deleteObj(obj_type, obj.id).then((resp) => {
        setPersons(persons.filter((e) => e.id != resp.id));
        setShowPersons(showPersons.filter((e) => e.id != resp.id));
      });
    }
    return
  };

  const onFilter = (event) => {
    const newShow = persons.filter((e) =>
      e.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilterWords(event.target.value);
    setShowPersons(newShow);
  };

  
  // 显示成功消息
  const handleMsg = (msg, msgtype) => {
    setMessage({ text: msg, type: msgtype })
    // 3秒后自动清除消息
    console.log(msg)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onFilter={onFilter} filterWords={filterWords}></Filter>
      <h2>add a new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        addNewName={addNewName}
        newPhoneNumber={newPhoneNumber}
        addNewPhoneNumber={addNewPhoneNumber}
      ></PersonForm>

      <h2>Numbers</h2>
      {showPersons.map((e) => {
        console.log("Phonebook component rendered");
        return <Persons e={e} key={e.id} handleDelte={()=>deleteObj(obj_type, e)} />;
      })}
    </div>
  );
};

export default Phonebook;
