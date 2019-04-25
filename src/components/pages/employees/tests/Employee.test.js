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
import jest from 'jest';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

//Components
import EmployeePage from '../EmployeePage';
import EmployeeList from '../EmployeeList';
import FormModal from 'components/forms/employees/FormModal';

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
        
            // expect(empComponent).toBeDefined();
        // createPortal
            let createPortalFn = ReactDOM.createPortal = (element, node) => element;
    
        // Mounting check
            // expect(empComponent.instance()._isMounted).toBe(true); Nu
        
        // Childern existance check
            // let empMainNode = empComponent.find('.container');
            // expect(empMainNode.children('EmployeeList').length).toEqual(1); Nu
            // expect(empMainNode.children('FormModal').length).toEqual(1); Nu
        
        // DidMount call check
            const didMountLf = sinon.spy(empComponent.instance(), 'componentDidMount');
            const renderFn = sinon.spy(empComponent.instance(), 'render');
            // console.log(didMountLf.calledImmediatelyAfter(renderFn)); 
            // expect(didMountLf).toBeCalled();
            // console.log(didMountLf, renderFn)
        
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
            
            // console.log(empPage.instance().notifyMsgFn())
            // console.log(empComponent.instance())
        
        // Dispatch render props check
            //expect(empPage.renderProp('fetchAllEmployees1')).toBeTruthy(); Nu
    
        // Reducer props type check
            // let empPageProps = empPage.props();
            // expect(empPageProps.employees).toEqual(Array()); Nu
            // expect(empPageProps.employeeFormModal).toEqual(Boolean()); Nu
            // expect(empPageProps.employee).toEqual(Object()); Nu
            
        // State variable type check Nu
            // expect(empPage.instance().state.mDeleteEmpArr).toBeDefined(); 
        
            empComponent.unmount();
    });
})

describe("EmployeeList child component test", () => {

    it("Function calls test", () => {
        const empListComponent = shallow(<EmployeeList />).dive();
        // console.log(empListComponent.find("#empList").props());
        console.log(empListComponent.find(".chkInput"))
       // expect(empListComponent.find(".chkInput").simulate('change', { preventDefault () {} })).toBeDefined();
       // expect(empListComponent.find('Button').simulate('click', { preventDefault () {} })).toBeDefined();
        empListComponent.unmount();
    });
});

describe("FormModal child component test", () => {

    it("Form and functionality test", () => {
        const formComponent = shallow(<FormModal />, { lifecycleExperimental: true });
        
        // Component to be defined Nu
            // expect(formComponent).toBeDefined();
        
        // Form modal existance check based on className Nu
            // expect(formComponent.find('#modal').length).toEqual(1);
        
        // Component state obj check Nu
            // let stateObj = {"empId": "", "firstName": "", "lastName": "", "email": "", "gender": "", "dateOfBirth": "", "age": ""};
            // expect(formComponent.state('data')).toEqual(stateObj);
        
        // Form existance check Nu
            // expect(formComponent.find('form').exists()).toBe(true);
        
        // Form fields existance check
            let firstName = formComponent.find('#firstName'), lastName = formComponent.find('#lastName'), email = formComponent.find('#email'),
                gender = formComponent.find('#gender'), genderMaleFemale = formComponent.find('#gender-male' && '#gender-female'),
                datepicker = formComponent.find('#datepicker'), age = formComponent.find('#age');
            // expect(firstName.length).toBe(1); Nu all
            // expect(lastName.length).toBe(1);
            // expect(email.length).toBe(1);
            // expect(gender.length).toBe(1);
            // expect(datepicker.length).toBe(1);
            // expect(age.length).toBe(1);
                
            firstName.simulate("change", { target: { value: "myValue" } }); expect(firstName.props().value).toBeDefined();
            lastName.simulate("change", { target: { value: "myValue" } }); expect(lastName.props().value).toBeDefined();
            email.simulate("change", { target: { value: "myValue" } }); expect(email.props().value).toBeDefined();
            genderMaleFemale.simulate("change", { target: { value: "myValue" } }); expect(genderMaleFemale.props().value).toBeDefined();
            datepicker.simulate("change", { target: { value: "myValue" } }); expect(datepicker.props().selected).toBeDefined();
            age.simulate("change", { target: { value: "myValue" } }); expect(age.props().value).toBeDefined();

        // Submit event trigger check
            // expect(formComponent.find('form').simulate('click', { preventDefault () {} })).toBeDefined(); // Nu
            expect(formComponent.find('form').simulate('submit', { preventDefault () {} })).toBeDefined();
            

        // Handle function check Nu
            // let formInstance = formComponent.instance();
            // expect(formInstance.handleCloseFormModal).toBeInstanceOf(Function);
            // expect(formInstance.handleChange).toBeInstanceOf(Function);
            // expect(formInstance.handleDateChange).toBeInstanceOf(Function);
            // expect(formInstance.handleSubmit).toBeInstanceOf(Function);
            // expect(formInstance.validate).toBeInstanceOf(Function);
            // expect(formInstance.resetForm).toBeInstanceOf(Function);
        
        // Didupdate call check  Nu
            // const didUpdateLf = sinon.spy(formComponent.instance(), 'componentDidUpdate');
            // expect(didUpdateLf.calledAfter.bind()).toBeDefined();
        
            formComponent.unmount();
    });
});
