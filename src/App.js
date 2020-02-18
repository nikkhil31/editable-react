import React, { useState, useEffect } from 'react';
import Tr from "./Tr";
import TrEdit from "./TrEdit";
import './App.css';

export const TableContext = React.createContext()

function App() {

  const FormInputs = {
    'id': '0',
    'name': '',
    'lname': '',
    'age': '',
    'gender': ''
  }

  const [SelectedRowID, setSelectedRowID] = useState()
  const [fromData, setfromData] = useState(FormInputs)

  const [Error, setError] = useState(FormInputs)

  const [Data, setData] = useState([])

  const [Add, setAdd] = useState(false)

  
  const handlechange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setfromData({ ...fromData, [name]: value })
  }
  
  const isFormvalid = (form) => {
    
    let valid = true
    
    if (form.name === '') {
      setError((prev) => ({ ...prev, name: 'Please Enter Name' }))
      valid = false
    } else {
      setError((prev) => ({ ...prev, name: '' }))
    }
    if (form.lname === '') {
      setError((prev) => ({ ...prev, lname: 'Please Enter Last name' }))
      valid = false
    } else {
      setError((prev) => ({ ...prev, lname: '' }))
    }
    
    if (form.gender === '') {
      setError((prev) => ({ ...prev, gender: 'Please Enter Gender' }))
      valid = false
    } else {
      setError((prev) => ({ ...prev, gender: '' }))
    }
    
    if (form.age === '' || !/^[0-9]+$/.test(form.age)) {
      setError((prev) => ({ ...prev, age: 'Please Enter Valid Age Number' }))
      valid = false
    } else {
      setError((prev) => ({ ...prev, age: '' }))
    }
    
    
    return valid
  }
  
  const handleAddTableData =  async (e) => {
    setData(predata => [{ ...fromData, id: Date.now() }, ...predata])
  }
  
  
  const handleSubmit = (e) => {
    e.preventDefault() 
    if (isFormvalid(fromData)) {
      handleAddTableData()
      setfromData(FormInputs)
      setError([])
      setSelectedRowID(0)
      setAdd(false)
    }
  }

  const handalEditSave = async (TableData) => {
    const updatedData = [...Data]
    const index = await Data.findIndex(info => info.id === SelectedRowID)
    updatedData[index] = TableData
    setData(updatedData)
    handleEditSelect(0)
  }

  const LOCAL_STORAGE_KEY = 'Xeditable.data'

  useEffect(() => {
    const TableDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (TableDataJSON != null) setData(JSON.parse(TableDataJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Data))
  }, [Data])
  
  const handleEditSelect = (id) => {
    setSelectedRowID(id)
  }

  const handalDelete  = (id)  => {
    setData(prevs => prevs.filter(data => data.id !== id))
    console.log(id)
  }

  
  const TableContextValue = {
    handleAddTableData,
    handleSubmit,
    handlechange,
    handleEditSelect,
    handalEditSave,
    handalDelete,
    isFormvalid
  }
  return (
    <TableContext.Provider value={TableContextValue}>
      <div className="App">
        <button className="btn-add" onClick={()=>setAdd(true)}>Add</button>
        <table align="center">
          <thead>
            <tr>
              <th>sr.</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { Add &&
              <tr>
                <td>#</td>
                <td><input type="text" onChange={handlechange} name="name" value={fromData.name} />
                  <br />{Error.name}
                </td>
                <td><input type="text" onChange={handlechange} name="lname" value={fromData.lname} />
                  <br />{Error.lname}
                </td>
                <td><input type="text" onChange={handlechange} name="age" value={fromData.age} />
                  <br />{Error.age}
                </td>
                <td><input type="text" onChange={handlechange} name="gender" value={fromData.gender} />
                  <br />{Error.gender}
                </td>
                <td><button className="button button-save" onClick={handleSubmit}>Save</button></td>
                <td><button className="button button-delete" onClick={()=>setAdd(false)}>Cancel</button></td>
              </tr>
            }
            {
              Data.length > 0 ?

              Data.map((detail, index) => {
                return (
                  detail.id !== SelectedRowID ? 
                    <Tr key={detail.id} detail={detail} index={index} /> : 
                    <TrEdit key={detail.id} detail={detail} index={index}/>
                )
              }) 

              :
              <tr>
                <td colSpan={7} style={{textAlign:"center"}}>Data Not available</td>
              </tr>
          }
          </tbody>
        </table>
      </div>
    </TableContext.Provider>
  );
}

export default App;
