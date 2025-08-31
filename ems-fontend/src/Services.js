import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees';

export const ListEmployees_server = ()=> axios.get(API_URL);

export const AddEmployer = (employee)=> axios.post(API_URL,employee);

export const get_all_employe_by_id = (employee_id)=> axios.get(API_URL +'/'  + employee_id);

export const UpdateEmployee= (employee,employeeid)=> axios.put(API_URL + '/' + employeeid,employee);


export const Deletemployee = (id)=> axios.delete(API_URL + '/' + id);