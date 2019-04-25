import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import moment from 'moment';

const EmployeeList = ({ employees, editEmployeeL, deleteEmployee, mDelete, mDeleteEmpId, deleteMultipleEmployees }) => {

    const [value, setValue] = useState({});

    const handleEmpChecked = (e) => {
        value[e.target.id] = e.target.checked;
        setValue(value);
        mDeleteEmpId({checked: e.target.checked, empId: e.target.id });
    }

    const tableBodyDiv = (
        (employees !== undefined && employees.length > 0) &&
        employees.map((employee, index) => {
        return (
            <tr key={index} id="dataRow">
                <td style={{textAlign: "center"}}>
                    <input className="chkInput" type="checkbox" checked={value[employee.empId] ? true : false} id={employee.empId} onChange={(e) => handleEmpChecked(e)}/>
                </td>
                <td>{employee.firstName +" "+ employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.gender}</td>
                <td>{moment(employee.dateOfBirth).format("DD-MM-YYYY")}</td>
                <td>{employee.age}</td>
                <td>
                <Button id="editBtn" variant="success" onClick={() => editEmployeeL(employee.empId)}>Edit</Button>
                <Button id="deleteBtn" variant="danger" style={{marginLeft: 5}} onClick={() => deleteEmployee(employee.empId)}>Delete</Button>
                </td>
            </tr>
        )
        })
    )

    const emptyDiv = <tr><td colSpan="7">No employees found</td></tr>
    
    return (
            <Table id="empList" striped bordered hover>
                <thead>
                <tr>
                    <th>Multiple delete</th>
                    <th>Employee name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {(employees && employees.length > 0) ? tableBodyDiv : emptyDiv}
                    {mDelete &&
                    <tr>
                    <td style={{textAlign: "center"}}>
                        <Button  id="editBtn1" variant="danger" style={{marginLeft: 5}} onClick={() => deleteMultipleEmployees()}>Delete</Button>
                    </td>
                    <td colSpan="6"></td>
                    </tr>
                    }
                </tbody>
            </Table>
    )
}

export default EmployeeList;