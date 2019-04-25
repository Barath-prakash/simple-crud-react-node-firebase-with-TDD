import { GET_ALL_EMPLOYEES, EMP_FORM_MODAL_OPEN, EMP_FORM_MODAL_CLOSE, GET_ONE_EMPLOYEE } from "action/employeeAction";

const initialState = {
    employees: [],
    employeeFormModal: false,
    employee: {}
}

export default function employeeReducer(state = initialState, action) {
    switch (action && action.type) {
        case GET_ALL_EMPLOYEES: {
            return { ...state, employees: action.empData }
        }
        case EMP_FORM_MODAL_OPEN: {
            return { ...state, employeeFormModal: true }
        }
        case EMP_FORM_MODAL_CLOSE: {
            return { ...state, employeeFormModal: false }
        }
        case GET_ONE_EMPLOYEE: {
            return { ...state, employee: action.employee }
        }
        default: return state
    }
}