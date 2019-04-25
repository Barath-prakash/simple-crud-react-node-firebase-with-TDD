import { combineReducers } from 'redux';
import employees from 'reducers/employeesReducer';

const rootReducer = combineReducers({
    employees
});

export default rootReducer;