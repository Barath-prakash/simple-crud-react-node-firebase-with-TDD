import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// Installed plugins 
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Combine reducer file
import rootReducer from 'rootReducer';
import { wrap } from 'module';

import renderer from 'react-test-renderer';
import jest from 'jest-mock';
import { shallow, mount, /*render*/ } from 'enzyme';
import sinon from 'sinon';
import { render, fireEvent, getByTestId } from "react-testing-library";

//Components
import EmployeePage from '../EmployeePage';
import EmployeeList from '../EmployeeList';
import FormModal from 'components/forms/employees/FormModal';
import { Button } from 'react-bootstrap';
import { Modal, ModalHeader } from 'reactstrap';

// Redux-mock-store
import configureStore from 'redux-mock-store';

import * as actions from '../../../../action/employeeAction'
import * as employeeReducer from '../../../../reducers/employeesReducer';
import axios from 'axios';

// Redux store config
let store = createStore(rootReducer, applyMiddleware(thunk));

it('Console error check', () => {
    const consoleError = sinon.spy(global.console, 'error'); 
    // console.log(consoleError);
    // expect(consoleError).toBe(null);
});

describe("Parent component full test", () => {
    let empComponent;
    let props;

    beforeEach(() => {
        props = {
            fetchAllEmployees: jest.fn((fetchAllEmployees) => fetchAllEmployees),
            notifyMsg: false
        }
        empComponent = mount(<Provider store={store}><EmployeePage {...props}/></Provider>, { lifecycleExperimental: true });
    });

    const allOver = () => new Promise((resolve) => setImmediate(resolve));
    const todos = { data: [{
        "id": 1,
        "status": "testActive",
        "text": "test1"
    }, {
        "id": 2,
        "status": "testComplete",
        "text": "test2"
    }]};

    it('renders without crashing', () => {
        expect(empComponent).toBeDefined();
    });

    it('componentDidMount check', async () => {
        let empPage = empComponent.find('EmployeePage');
        fetch = jest.fn().mockReturnValue(Promise.resolve(todos));
        await allOver();
        empPage.update();
        const spy = sinon.spy(empPage.instance(), 'deleteMultipleEmployeesC');
        // console.log(spy)

    });

    // it('enzyme should mount object refs', () => {
    //     const ref = React.createRef()
    //     const wrapper = mount(<div ref={ref} />)
    //     const div = wrapper.find('div').first()
    //     expect(div).toBeTruthy()
    //     expect(ref).toHaveProperty('current', div.instance())
    //   })

    it("Function calls test", async () => {
        // Snapshot check
            const tree = renderer.create(empComponent).toJSON();
            expect(tree).toMatchSnapshot();
        
        // createPortal
            let createPortalFn = ReactDOM.createPortal = (element, node) => element;
    
        // DidMount call check
        let empPage = empComponent.find('EmployeePage');
        console.log(empPage.instance().fetchAllEmployees());
        // Existing check with undefined
            expect(empPage.instance().deleteEmployeeConfirm()).toBeUndefined(); 
            expect(empPage.instance().mDeleteEmpId()).toBeUndefined(); 
            expect(empPage.instance().deleteMultipleEmployeesConfirm()).toBeUndefined(); 
            expect(empPage.instance().notifyMsgFn()).toBeUndefined(); 
        // Render functions 
            expect(empPage.instance().employeeFormMoalOpen()).toBeDefined(); 
            expect(empPage.instance().employeeFormMoalClose()).toBeDefined();
            expect(empPage.instance().addEmployee()).toBeDefined();
            expect(empPage.instance().editEmployeeP()).toBeDefined();
            expect(empPage.instance().updateEmployee()).toBeDefined();
            expect(empPage.instance().deleteEmployee()).toBeDefined();
            expect(empPage.instance().deleteMultipleEmployeesC()).toBeDefined();
           
            empComponent.unmount();
    });
});

describe("EmployeeList child component test", () => {
        let props;
        let empLiCompWrapper;

        beforeEach(() => {
            props = {
            employees: [],
            editEmployeeL: jest.fn(() => 'editEmployeeL'),
            deleteEmployee: jest.fn(() => 'deleteEmployee'),
            mDelete: false, 
            mDeleteEmpId: jest.fn(() => 'mDeleteEmpId'),
            deleteMultipleEmployees: jest.fn(() => 'deleteMultipleEmployees')
            };
            empLiCompWrapper = shallow(<EmployeeList {...props} />);
        });

        it('renders without crashing', () => {
            expect(empLiCompWrapper).toBeDefined();
        });

        it('renders one button when employees array length is zero', () => {
            expect(empLiCompWrapper.find(Button)).toHaveLength(0);
        });

        it('renders two buttons when employees array has value', () => {
            empLiCompWrapper.setProps({ employees: [{name: "testname", email: "testemail@gmail.com", gender: "testgender"}] });
            expect(empLiCompWrapper.find(Button)).toHaveLength(2);
        });

        it('calls formModalOpem when edit button is clicked', () => {
            empLiCompWrapper.setProps({ employees: [{name: "testname", email: "testemail@gmail.com", gender: "testgender"}] });
            const editButton = empLiCompWrapper.find(Button).first();
            expect(editButton.prop('children').toLowerCase()).toEqual('edit');
            editButton.simulate('click');
            expect(props.editEmployeeL).toHaveBeenCalled();
        });

        it('calls Delete popup open when save changes button is clicked', () => {
            empLiCompWrapper.setProps({ employees: [{name: "testname", email: "testemail@gmail.com", gender: "testgender"}] });
            const deleteButton = empLiCompWrapper.find(Button).at(1);
            expect(deleteButton.prop('children').toLowerCase()).toEqual('delete');
            deleteButton.simulate('click');
            expect(props.deleteEmployee).toHaveBeenCalled();
        });

        it('Multiple delete button click check', () => {
            empLiCompWrapper.setProps({ employees: [{name: "testname", email: "testemail@gmail.com", gender: "testgender"}] });
            const checkBoxEvent = empLiCompWrapper.find(".chkInput");
            checkBoxEvent.simulate("change", { target: { value: "myValue" } });  
            // expect(checkBoxEvent.handleEmpChecked).toHaveBeenCalled();
            expect(props.mDeleteEmpId).toHaveBeenCalled();
        });
        
        it('Multiple delete button click check', () => {
            empLiCompWrapper.setProps({ mDelete: true });
            const mDeleteButton = empLiCompWrapper.find(Button).first();
            expect(mDeleteButton.prop('children').toLowerCase()).toEqual('delete');
            mDeleteButton.simulate('click');
            expect(props.deleteMultipleEmployees).toHaveBeenCalled();
        })
});

describe("FormModal child component test", () => {

    let props;
    let formComponent;

        beforeEach(() => {
            props = {
                employeeFormModal: false,
                employee: {},
                handleCloseFormModal: jest.fn(() => 'handleCloseFormModal'),
                employeeFormMoalClose: jest.fn(() => 'employeeFormMoalClose'),
                addEmployee: jest.fn((addEmployee) => addEmployee),
                updateEmployee: jest.fn(() => 'updateEmployee')
            };
            formComponent = shallow(<FormModal props={props} />);
        });

        it('Modal component exist check', () => {
            expect(formComponent.find(Modal)).toHaveLength(1);
        });

        it('renders one close button when employeeFormModal value is true', () => {
            formComponent.setProps({ employeeFormModal: true });

            // let closeTriggerModal = formComponent.find('#modal');
            // closeTriggerModal.simulate('click');

            // let closeTriggerModalHeader = formComponent.find('ModalHeader');
            // closeTriggerModalHeader.simulate('click');
            // expect(props.handleCloseFormModal).toHaveBeenCalled();

            let cancelButton = formComponent.find('#cancelButton');
            expect(cancelButton.prop('children').toLowerCase()).toEqual('close');
            cancelButton.simulate('click');``

            expect(props.employeeFormMoalClose).toHaveBeenCalled();
        });

        it('renders one add button when employeeFormModal value is true', () => {
            formComponent.setProps({ employeeFormModal: true });
            formComponent.find('form').simulate('submit', { preventDefault () {} });
            formComponent.update();
            expect(props.addEmployee).toBeDefined(); // Nu
            expect(props.updateEmployee).toBeDefined(); // Nu
        });

        it("renders onchange event handling in form", () => {

            let onChangeNode = formComponent.find('.form-control');
                onChangeNode.first().simulate("change", { target: { value: "myValue" } }); 
                onChangeNode.at(1).simulate("change", { target: { value: "myValue" } });
                onChangeNode.at(2).simulate("change", { target: { value: "myValue" } });
                onChangeNode.at(3).simulate("change", { target: { value: "myValue" } }); 

                let genderMale = formComponent.find('#gender-male');
                let genderFemale = formComponent.find('#gender-female');
                genderMale.simulate("change", { target: { value: "myValue" } }); 
                genderFemale.simulate("change", { target: { value: "myValue" } }); 

                let datepicker = formComponent.find('#datepicker');
                datepicker.simulate("change", { target: { value: "myValue" } }); 
           
        });
});

describe('Action and reducer test', () => {
        const mockInitialState = {
            employees: [],
            employeeFormModal: false,
            employee: {}
        }

        it('should return the initial state', () => {
            expect(employeeReducer.default(undefined, {})).toEqual(mockInitialState);
        });

        it('should create an action to get all employees', () => {
        const employees = [];
        const expectedAction = {
            type: actions.GET_ALL_EMPLOYEES,
            empData: employees
        }
        expect(actions.getAllEmployees(employees)).toEqual(expectedAction)
        });
        
        it('should create an action to get particular employee', () => {
            const employee = {};
            const expectedAction = {
            type: actions.GET_ONE_EMPLOYEE,
            employee
            }
            expect(actions.getAnEmployee(employee)).toEqual(expectedAction)
        })
  });

describe('action creators', () => {
      beforeEach(() => {
        store =  configureStore({});
      });
      afterEach(() => {
        // clear all HTTP mocks after each test
        // axios.cleanAll();
      });
    
    //   it('creates FETCH_TODO_SUCCESS when fetching to-dos has been done', () => {
    //     // Simulate a successful response
    //     axios.get('http://localhost:8000/api/employees/fetchAllEmployees')
    //       .then(200, [{id: 1, name: "testname1"}, {id: 2, name: "testname2"}]); // Mock reponse code and data
    
    //     // Dispatch action to fetch to-dos
    //     return store.dispatch(actions.getAllEmployees([{id: 1, name: "testname1"}, {id: 2, name: "testname2"}]));

    //     expect(store.dispatch(actions.getAllEmployees([{id: 1, name: "testname1"}, {id: 2, name: "testname2"}]))).toBeDefined()
    //   })
});
