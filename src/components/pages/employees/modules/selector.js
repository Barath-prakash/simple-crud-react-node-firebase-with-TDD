import { createSelector } from 'reselect';
import { initialState } from '../../../../reducers/employeesReducer';

const getBar = (state) => state || initialState;

export const makeSelect = () => createSelector(
  getBar, 
  (data) => 
    {
        console.log(data)
        return {
        employeeFormModal: data.employeeFormModal,
        employees: data.employees,
        employee: data.employee
        }
    }
  )