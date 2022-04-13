import './App.css';
import React, { useState } from 'react';
import user from './storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Table} from 'react-bootstrap';
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

function App() {

  const [users, setUser] = useState(user);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    state:"",
    zipcode:"",

  });
  // console.log(user);
  // const [viewFormData, setViewFormData] = useState({
  //   name: "",
  //   email: "",
  //   age: "",
  //   phone: "",
  //   index: "",
  // });


  // Input Clear Func
  const clear = () => {
    setAddFormData({ ...addFormData, name: '', email: "", phone: "", age: "" })
  }

  // Create Modal
  const [show, setShow] = useState(false);
  const handleClose = () => {clear();setShow(false);}
  const handleShow = () => setShow(true);

  // Update Modal
  // const [upShow, setUpShow] = useState(false);
  // const handClose = () => {clear();setUpShow(false);}
  // const handShow = () => setUpShow(true);

  // Create Func
  const formSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: addFormData.name,
      email: addFormData.email,
      age: addFormData.age,
      phone: addFormData.phone,
      city: addFormData.city,
      state: addFormData.state,
      zipCode :addFormData.zipcode
    };

    const newUsers = [...users, newUser];
    setUser(newUsers);
    handleClose();
    clear();
  };

  // Delete Func
  const onDelete = (i) => {
    const oldUsers = [...users];
    const index = parseInt(i);
    // const index = users.findIndex((user) => user.name === userName);

    oldUsers.splice(index, 1);

    setUser(oldUsers);
  };


  return (
    <>
    <div className="App">
      <Table bordered >
        <thead>
          <tr>
            <th>SL NO</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Phone</th>
            <th>Age</th>
            <th>City</th>
            <th>State</th>
            <th>Zipcode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, i) =>
            <tr>
              <td>{i + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.age}</td>
              <td>{data.address.city}</td>
              <td>{data.address.state}</td>
              <td>{data.address.zipCode}</td>

              <td><Button style={{"backgroundColor":"#b8ccf3", "border":"none"}} ><BiEditAlt color='black' /></Button><Button style={{"backgroundColor":"#b8ccf3", "border":"none", "marginLeft":"10px"}}  onClick={()=>onDelete(i)}><RiDeleteBinLine color='black' /></Button></td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button style={{"backgroundColor":'#7ea2e9',"color":"black","border":"none"}} onClick={handleShow}>Add User</Button>
    </div>
    
    {/* Create user Modal */}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
        <Modal.Body>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter name..."
          value={addFormData.name}
          onChanage={(e) => setAddFormData({ ...addFormData, name: e.taraget.value })}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter email..."
          value={addFormData.email}
          onChanage={(e) => setAddFormData({ ...addFormData, email: e.taraget.value })}
        />
        <input
          type="text"
          name="phone"
          required="required"
          placeholder="Enter phone number..."
          value={addFormData.phone}
          onChanage={(e) => setAddFormData({ ...addFormData, phone: e.taraget.value })}
        />
        <input
          type="text"
          name="age"
          required="required"
          placeholder="Enter age"
          value={addFormData.age}
          onChanage={(e) => setAddFormData({ ...addFormData, age: e.taraget.value })}
        />
        <input
          type="text"
          name="city"
          required="required"
          placeholder="Enter city"
          value={addFormData.city}
          onChanage={(e) => setAddFormData({ ...addFormData, age: e.taraget.value })}
        />
        <input
          type="text"
          name="state"
          required="required"
          placeholder="Enter state"
          value={addFormData.state}
          onChanage={(e) => setAddFormData({ ...addFormData, age: e.taraget.value })}
        />
        <input
          type="text"
          name="zipcode"
          required="required"
          placeholder="Enter zipcode"
          value={addFormData.zipcode}
          onChanage={(e) => setAddFormData({ ...addFormData, age: e.taraget.value })}
        />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formSubmit}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
