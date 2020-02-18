import React, { useContext } from 'react';
import { TableContext } from './App'

function Tr({ detail, index }) {

    const { handalDelete, handleEditSelect } = useContext(TableContext)

    function handalchangeEditId(id) {
        handleEditSelect(id)
    }

    function DeleteConfirm(id) {
        return window.confirm('Do You Want To Delete ?') ? handalDelete(id) : ''
    }

    return (
        <>
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{detail.name}</td>
                <td>{detail.lname}</td>
                <td>{detail.age}</td>
                <td>{detail.gender}</td>
                <td><button className="button button-save" onClick={() => handalchangeEditId(detail.id)}>Edit</button></td>
                <td><button className="button button-delete" onClick={() => DeleteConfirm(detail.id)}>Delete</button></td>
            </tr>
        </>
    )

}

export default Tr
