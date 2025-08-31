import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddEmployer, UpdateEmployee ,get_all_employe_by_id , Deletemployee} from "../Services.js";
const EmployeeComponent = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    const { id } = useParams();
    const navigate2 = useNavigate();


    function handleSave(e) {
        e.preventDefault();
        const employee = { firstname, lastname, email }
        console.log(employee);


        if (validateEmployee()) {

            if (id) {
                UpdateEmployee(employee, id).then((response) => {
                    console.error("There was an error saving the employee!", response.data);
                    navigate2("/employee")
                }).catch((error) => {
                    console.error("There was an error updating the employee!", error);
                    navigate2("/employee")
                })
            } else {
                AddEmployer(employee).then((response) => {
                    console.error("There was an error saving the employee!", response.data);
                    navigate2("/employee")
                }).catch((error) => {
                    console.error("There was an error saving the employee!", error);
                    navigate2("/employee")
                })
            }

        }
    }

    function validateEmployee() {
        let validate = true;

        const employees = { ...errors }
        if (firstname.trim()) {
            employees.firstname = '';
        } else {
            employees.firstname = 'First name is required';
            validate = false;
        }

        if (lastname.trim()) {
            employees.lastname = '';
        } else {
            employees.lastname = 'last name is required';
            validate = false;
        }

        if (email.trim()) {
            employees.email = '';
        } else {
            employees.email = 'Email is required';
            validate = false;
        }


        setErrors(employees);
        return validate;
    }


    function PageTitle() {
        if (id) {
            return <div> <h5>Update Employee</h5></div>
        } else {
            return <div> <h5>Add Employee</h5></div>
        }
    }

    useEffect(() => {
        if (id) {
            get_all_employe_by_id(id).then((response) => {
                setEmail(response.data.email)
                setLastname(response.data.lastname)
                setFirstname(response.data.firstname)
            }).catch((error) => {
                console.error("There was an error fetching the employee details!", error);
            })
        }
    }, [id])

    return (
        <div className="container">
            <div className="form-row mt-4">
                <div className="card col-md-7  offset-md-3">
                    <div className="card-body col-md-12 form-row">
                        <form>
                            <div className="form-group ">
                                {
                                    PageTitle()

                                }
                                <input type="text" className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} placeholder="Enter First name here" onChange={(e) => setFirstname(e.target.value)} value={firstname} />
                                {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                            </div>
                            <div className="form-group ">
                                <label>Last Name</label>
                                <input type="text" className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} placeholder="Enter Last name here" onChange={(e) => setLastname(e.target.value)} value={lastname} />
                                {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
                            </div>
                            <div className="form-group ">
                                <label>E-Mail</label>
                                <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter Email here" onChange={(e) => setEmail(e.target.value)} value={email} />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>

                            <button className="btn btn-success float-right" onClick={handleSave}>Save</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent;