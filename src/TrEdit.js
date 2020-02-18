import React, { useState, useContext } from 'react'
import { TableContext } from './App'

function TrEdit({ detail, index }) {

    const { handleEditSelect, handalEditSave } = useContext(TableContext)

    const [Defaultvalue, setDefaultvalue] = useState(detail)

    const [Error, setError] = useState({
        'name': '',
        'lname': '',
        'age': '',
        'gender': ''
    })


    const handlechangevalue = (e) => {
        const name = e.target.name
        const value = e.target.value
        setDefaultvalue((prev) => ({ ...prev, [name]: value }))
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

    const handalsubmit = (e) => {
        if (isFormvalid(Defaultvalue)) {
            handalEditSave(Defaultvalue)
        }
    }

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td><input type="text" onChange={handlechangevalue} name="name" value={Defaultvalue.name} />
                    <br />{Error.name}
                </td>
                <td><input type="text" onChange={handlechangevalue} name="lname" value={Defaultvalue.lname} />
                    <br />{Error.lname}
                </td>
                <td><input type="text" onChange={handlechangevalue} name="age" value={Defaultvalue.age} />
                    <br />{Error.age}
                </td>
                <td><input type="text" onChange={handlechangevalue} name="gender" value={Defaultvalue.gender} />
                    <br />{Error.gender}
                </td>
                <td><button className="button button-save" onClick={handalsubmit}>Save</button></td>
                <td><button className="button button-delete" onClick={() => handleEditSelect(0)}>Cancel</button></td>
            </tr>
        </>
    )
}

export default TrEdit
