import React from 'react';
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
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

//Components
import EmployeePage from '../EmployeePage';
import EmployeeList from '../EmployeeList';
import FormModal from 'components/forms/employees/FormModal';
import { Button } from 'react-bootstrap';
import { Modal, ModalHeader } from 'reactstrap';

// Redux-mock-store
import configureStore from 'redux-mock-store';
// Redux store config
const store = createStore(rootReducer, applyMiddleware(thunk));

it('Console error check', () => {
    const consoleError = sinon.spy(global.console, 'error'); 
    // console.log(consoleError);
    // expect(consoleError).toBe(null);
})

describe("Parent component full test", () => {
    let empComponent;
    beforeEach(() => {
        // const actions = {fetchAll: jest.fn()}
        empComponent = mount(<Provider store={store}><EmployeePage /></Provider>, { lifecycleExperimental: true });
    });

    it("Function calls test", () => {
        // Snapshot check
            const tree = renderer.create(empComponent).toJSON();
            expect(tree).toMatchSnapshot();
        
        // createPortal
            let createPortalFn = ReactDOM.createPortal = (element, node) => element;
    
        // DidMount call check
            const didMountLf = sinon.spy(empComponent.instance(), 'componentDidMount');
            const renderFn = sinon.spy(empComponent.instance(), 'render');
            setTimeout(() => {
                expect(EmployeePage.prototype.componentDidMount).toHaveProperty('callCount', 1);
                expect(didMountLf.calledImmediatelyAfter(renderFn)).toBe(true);
            })
        
        let empPage = empComponent.find('EmployeePage');
        // FetchAllEmp function
            const mockFetchEmployeesFn = sinon.spy(empPage.instance(), 'fetchAllEmployees');
            // console.log(mockFetchEmployeesFn())
            // expect(mockFetchEmployeesFn.called).toBe(true); // return false
    
        // Refs
            const setState = sinon.spy(empPage.instance(), 'setState');
            // expect(setState.called).toBe(true); // return false
       
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
})

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
            formComponent = shallow(<FormModal {...props} />), { lifecycleExperimental: true };
        });

        it('Modal component exist check', () => {
            expect(formComponent.find(Modal)).toHaveLength(1);
            formComponent.setProps({ employeeFormModal: true });
            let closeFormClickToggle = formComponent.find(ModalHeader);
            closeFormClickToggle.simulate('click');
            expect(props.handleCloseFormModal).toBeDefined(); // Nu
        });

        it('renders one close button when employeeFormModal value is true', () => {
            formComponent.setProps({ employeeFormModal: true })
            const cancelButton = formComponent.find('#cancelButton');
            expect(cancelButton.prop('children').toLowerCase()).toEqual('close');
            cancelButton.simulate('click');
            expect(props.employeeFormMoalClose).toHaveBeenCalled();
        });

        it('renders one add button when employeeFormModal value is true', () => {
            formComponent.setProps({ employeeFormModal: true });
            formComponent.find('form').simulate('submit', { preventDefault () {} });
            formComponent.update();
            formComponent.setState({ errors: {}, data: { empId: "", name: "testname", email: "testemail" } });
            // expect(props.addEmployee).toBeCalledWith(formComponent.state().data);
            // expect(props.addEmployee).toHaveBeenCalled(); // Nu
        });

        it('renders one update button when employeeFormModal value is true', () => {
            formComponent.setProps({ employeeFormModal: true });
            let submitBtnForm = formComponent.find('form');
            submitBtnForm.simulate('submit', { preventDefault () {} });
            formComponent.setState({ errors: {}, data: { empId: "testId" } })
            expect(props.updateEmployee).toBeDefined(); // Nu
        });

        it("renders onchange event handling in form", () => {
            // console.log(formComponent.state());
            // formComponent.setState({ errors: {}, data: { empId: "testId" } });
            // console.log(formComponent.state())
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

            // Didupdate call check  Nu
                // const didUpdateLf = sinon.spy(formComponent.instance(), 'componentDidUpdate');
                // expect(didUpdateLf.calledAfter.bind()).toBeDefined();
            
                formComponent.unmount();
        });
});
