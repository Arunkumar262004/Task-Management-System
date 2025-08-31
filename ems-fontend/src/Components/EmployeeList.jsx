import React, { useEffect, useState } from "react"
import { ListEmployees_server,Deletemployee } from "../Services.js";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {

    const navigate = useNavigate();
    const [listemployees, setlistemployees] = useState([]);

    function AddEmployee() {
        navigate('/add-employee');
    }

    function updateEmployee(id) {
        navigate(`/update-employee/${id}`);
    }
    useEffect(() => {
        totListEmployees();
    })

    function totListEmployees() {
        ListEmployees_server().then((response) => {
            setlistemployees(response.data);
        }).catch((error) => {
            console.error("There was an error fetching the employee list!", error);
        })
    }

    function deleteEmployee(id) {
        Deletemployee(id).then(() => {
            totListEmployees();
        }).click((error) => {
            console.error("There was an error deleting the employee!", error);
        })
    }
    return (
        <div className='container'>
            <button className="btn btn-primary mt-4 mb-4" onClick={AddEmployee}>Add Employee</button>
            <table className="table table-striped">
                <thead>
                    <tr>

                        <th>id</th>
                        <th>first name</th>
                        <th>last name</th>
                        <th>email</th>
                        <th>Actions</th>

                    </tr>

                </thead>
                <tbody>
                    {
                        listemployees.map((employee) =>
                            <tr key={employee.id}>
                                <td className="badge bg-secondary text-white text-center float-right"><span>{employee.id}</span></td>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>

                                <td >{employee.email}</td>
                                <td >

                                    <button className="btn btn-primary text-white" onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className="btn btn-danger text-white" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                </td>

                            </tr>

                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeList
