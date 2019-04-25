import axios from 'axios';
const proxyHost = "http://localhost:8080";

// Type decralation section
export const GET_ALL_EMPLOYEES = 'GET_ALL_EMPLOYEES';
export const EMP_FORM_MODAL_OPEN = 'EMP_FORM_MODAL_OPEN';
export const EMP_FORM_MODAL_CLOSE = 'EMP_FORM_MODAL_CLOSE';
export const GET_ONE_EMPLOYEE = 'GET_ONE_EMPLOYEE';

// Reducer dispatch section 
export const getAllEmployees = (empData) => ({
    type: GET_ALL_EMPLOYEES,
    empData
});

export const employeeFormMoalOpenA = () => ({
    type: EMP_FORM_MODAL_OPEN
});

export const employeeFormMoalCloseA = () => ({
    type: EMP_FORM_MODAL_CLOSE
});

export const getAnEmployee = (employee) => ({
    type: GET_ONE_EMPLOYEE,
    employee
});

// Api service section
export const fetchAllEmployeesA = () => dispatch => {
    axios.get(proxyHost+"/api/employees/fetchAllEmployees")
    .then(res => res.data.employees)
    .then(empData => dispatch(getAllEmployees(empData)))
}

export const addEmployeeA = (data) => dispatch => {
    return axios.post(proxyHost+"/api/employees/addEmployee", {data})
}

export const fetchEmployeeA = (empId) => dispatch => {
    return axios.get(proxyHost+`/api/employees/fetchEmployee/${empId}`)
    .then(res => res.data.employee)
    .then(oneEmployeeData => dispatch(getAnEmployee(oneEmployeeData)))
}

export const updateEmployeeA = (data) => dispatch => {
    return axios.put(proxyHost+"/api/employees/updateEmployee", {data})
}

export const deleteEmployeeA = (empId) => dispatch => {
    return axios.delete(proxyHost+`/api/employees/deleteEmployee/${empId}`)
}

export const deleteMultipleEmployeesA = (empIdArr) => dispatch => {
    return axios.post(proxyHost+"/api/employees/deleteMultipleEmployees", {empIdArr});
}