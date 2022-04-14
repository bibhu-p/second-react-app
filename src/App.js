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
    address:{
      city: "",
      state:"",
      zipCode:""
    }
  });
  // console.log(user);
  const [viewFormData, setViewFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age:"",
    address:{
      city: "",
      state:"",
      zipCode:""
    },
    index: "",
  });


  // Input Clear Func
  const clear = () => {
    setAddFormData({ ...addFormData, name: '', email: "", phone: "", age: "",address: {city:"", state:"", zipCode:""} })
  }

  // Create Modal
  const [modalData, setModalData] = useState({
    type: '',
    show: false,
  });

  // modal close
  const handleClose = () => {
    clear();
    const mData ={
      type:'',
      show: false
    }
    setModalData(mData);
  }
  // modal open
  const handleShow = (i) => {
    const uData = {
      type:i,
      show: true
    }
    setModalData(uData);
  };

  // Create user modal
  const createModal = ()=>{
    handleShow(0);
  }
  // Update user modal
  const editModal = ()=>{
    handleShow(1);
  }
 
  // Create Func
  const formSubmit = (event) => {
    console.log('create function------>>>>>')
    event.preventDefault();

    const newUser = {
      name: addFormData.name,
      email: addFormData.email,
      age: addFormData.age,
      phone: addFormData.phone,
      address:{
        city: addFormData.address.city,
        state: addFormData.address.state,
        zipCode :addFormData.address.zipCode
      }
    };
    
    const newUsers = [...users, newUser];
    setUser(newUsers);
    handleClose();
    clear();
  };

  // View Data func
  const viewData = (i)=>{
    const usersData = [...users];
    const userData = usersData[i];
    setViewFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      age: userData.age,
      address:{
        city: userData.address.city,
        state: userData.address.state,
        zipCode :userData.address.zipCode
      },
      index : i,
    });
    editModal();
  }

  // Edit Func
  const editFormSubmit = (i) => {
    // event.preventDefault();
    const ind = parseInt(i);
    const editUser = {
      name: viewFormData.name,
      email: viewFormData.email,
      phone: viewFormData.phone,
      age: viewFormData.age,
      address:{
        city: viewFormData.address.city,
        state: viewFormData.address.state,
        zipCode :viewFormData.address.zipCode
      }
    };
    const oldData = [...users];
    oldData.splice(ind,1,editUser);
    // console.log(oldData);
    setUser(oldData);
    handleClose();
    clear();
  };

  // Delete Func
  const onDelete = (i) => {
    const oldUsers = [...users];
    const index = parseInt(i);
    oldUsers.splice(index, 1);

    setUser(oldUsers);
  };


  return (
    <>
    {/* MAIN View */}
    <div className='App'>
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
            <th>zipCode</th>
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

              <td><Button style={{"backgroundColor":"#b8ccf3", "border":"none"}} onClick={()=>viewData(i)} ><BiEditAlt color='black' /></Button><Button style={{"backgroundColor":"#b8ccf3", "border":"none", "marginLeft":"10px"}}  onClick={()=>onDelete(i)}><RiDeleteBinLine color='black' /></Button></td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button style={{"backgroundColor":'#7ea2e9',"color":"black","border":"none"}} onClick={createModal}>Add User</Button>
    </div>
    
    {/* user Modal */}
    <Modal show={modalData.show} onHide={handleClose}> 
        <Modal.Header closeButton>
          <Modal.Title>{ modalData.type === 0 ?'Add User':'Update User'}</Modal.Title>
        </Modal.Header>

        {(modalData.type === 0)?
          <Modal.Body>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter name..."
          value={addFormData.name}
          onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter email..."
          value={addFormData.email}
          onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })}
        />
        <input
          type="text"
          name="phone"
          required="required"
          placeholder="Enter phone number..."
          value={addFormData.phone}
          onChange={(e) => setAddFormData({ ...addFormData, phone: e.target.value })}
        />
        <input
          type="text"
          name="age"
          required="required"
          placeholder="Enter age"
          value={addFormData.age}
          onChange={(e) => setAddFormData({ ...addFormData, age: e.target.value })}
        />
        <input
          type="text"
          name="city"
          required="required"
          placeholder="Enter city"
          value={addFormData.address.city}
          onChange={(e) => setAddFormData({ ...addFormData, address:{...addFormData.address, city: e.target.value }})}
        />
        <input
          type="text"
          name="state"
          required="required"
          placeholder="Enter state"
          value={addFormData.address.state}
          onChange={(e) => setAddFormData({ ...addFormData, address:{...addFormData.address, state: e.target.value} })}
        />
        <input
          type="text"
          name="zipCode"
          required="required"
          placeholder="Enter zipCode"
          value={addFormData.address.zipCode}
          onChange={(e) => setAddFormData({ ...addFormData, address:{...addFormData.address, zipCode: e.target.value} })}
        />
        </Modal.Body>
        :
        <Modal.Body>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter name..."
          value={viewFormData.name}
          onChange={(e) => setViewFormData({ ...viewFormData, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter email..."
          value={viewFormData.email}
          onChange={(e) => setViewFormData({ ...viewFormData, email: e.target.value })}
        />
        <input
          type="text"
          name="phone"
          required="required"
          placeholder="Enter phone number..."
          value={viewFormData.phone}
          onChange={(e) => setViewFormData({ ...viewFormData, phone: e.target.value })}
        />
        <input
          type="text"
          name="age"
          required="required"
          placeholder="Enter age.."
          value={viewFormData.age}
          onChange={(e) => setViewFormData({ ...viewFormData, age: e.target.value })}
        />
        <input
          type="text"
          name="city"
          required="required"
          placeholder="Enter city"
          value={viewFormData.address.city}
          onChange={(e) => setViewFormData({ ...viewFormData, address:{...viewFormData.address, city: e.target.value }})}
        />
        <input
          type="text"
          name="state"
          required="required"
          placeholder="Enter state"
          value={viewFormData.address.state}
          onChange={(e) => setViewFormData({ ...viewFormData, address:{...viewFormData.address, state: e.target.value} })}
        />
        <input
          type="text"
          name="zipCode"
          required="required"
          placeholder="Enter zipCode"
          value={viewFormData.address.zipCode}
          onChange={(e) => setViewFormData({ ...viewFormData, address:{...viewFormData.address, zipCode: e.target.value} })}
        />
        </Modal.Body>
        }
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        
          <Button variant="primary" onClick={()=> modalData.type === 0 ? formSubmit() : editFormSubmit(viewFormData.index)}>{(modalData.type === 0)?'ADD':'UPDATE'}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
