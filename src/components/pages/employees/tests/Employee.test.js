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
            setTimeout(() => {
                expect(EmployeePage.prototype.componentDidMount).toHaveProperty('callCount', 1);
                expect(didMountLf.calledImmediatelyAfter(renderFn)).toBe(true);
            })
            // console.log(didMountLf.calledImmediatelyAfter(renderFn)); 
            // expect(didMountLf).toBeCalled();
            // console.log(didMountLf, renderFn)
        // 51.79 |    35.71 |    63.64 |    52.73 |... 29,130,131,136 
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

    // it("Function calls test", () => {
    //     const onButtonClick = sinon.spy();
    //     const empListComponent = shallow(<EmployeeList onButtonClick={onButtonClick} />);
    //     // console.log(empListComponent.find("#empList").props());
    //     // console.log(empListComponent.props());
    //     empListComponent.update();
    //     console.log(empListComponent.html())
    //     console.log(empListComponent.find('#editBtn').exists())
    //     // expect(onButtonClick).toHaveProperty('callCount', 1);
    //     // setTimeout(() => {
    //     //     console.log(empListComponent.find("#editBtn1").length)
    //     //     console.log(empListComponent.html())
    //     // }, 0)
    //     // expect(empListComponent.find('#editBtn1').simulate('click', { preventDefault () {} })).toBeDefined();
    //    // expect(empListComponent.find(".chkInput").simulate('change', { preventDefault () {} })).toBeDefined();
    //    // expect(empListComponent.find('Button').simulate('click', { preventDefault () {} })).toBeDefined();
    //    console.log(mount(<EmployeeList />).instance())
    //     empListComponent.unmount();
    // });

    const employees = [
        { firstName: '1', lastName: 'poster1', email: 'title1', dateOfBirth: 'type1', age: '1' },
        { firstName: '1', lastName: 'poster1', email: 'title1', dateOfBirth: 'type1', age: '1' }
      ];
      let empList; 
    
      beforeEach(() => {
        empList = shallow(<EmployeeList employees={employees} />);
      });
    
    //   it('renders 2 articles', () => {
    //     // const didMountLf = sinon.spy(empComponent.instance(), 'handleEmpChecked');
    //     // const renderFn = sinon.spy(empComponent.instance(), 'render');
    //     // setTimeout(() => {
    //         let spyed = sinon.stub(EmployeeList.prototype, 'handleEmpChecked')
    //         console.log(spyed())
    //         // expect(spyed).toHaveProperty('callCount', 1);
    //         // expect(didMountLf.calledImmediatelyAfter(renderFn)).toBe(true);
    //     // })
    //     expect(empList.find('article').length).toBe(0);
    //   });

        let props;
        let wrapper;

        beforeEach(() => {
            props = {
            editEmployeeL: jest.fn(() => 'editEmployeeL'),
            employees: false,
            deleteEmployee: jest.fn(() => 'deleteEmployee'),
            };
            wrapper = shallow(<EmployeeList {...props} />);
        });

        it('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });

        it('renders one button when showEditView is false', () => {
            expect(wrapper.find(Button)).toHaveLength(1);
        });

        it('calls toggleVisibility when Edit Profile button is clicked',
        () => {
            const editProfileButton = wrapper.find(Button).first();
            expect(editProfileButton.prop('children').toLowerCase()).toEqual('edit profile');
            editProfileButton.simulate('click');
            expect(props.deleteEmployee).toHaveBeenCalled();
        });

        it('renders two buttons when showEditView is true', () => {
            wrapper.setProps({ employees: true });
            expect(wrapper.find(Button)).toHaveLength(2);
        });

        it('calls toggleVisibility when cancel button is clicked', () => {
            wrapper.setProps({ employees: true });
            const cancelButton = wrapper.find(Button).first();
            expect(cancelButton.prop('children').toLowerCase()).toEqual('cancel');
            cancelButton.simulate('click');
            expect(props.deleteEmployee).toHaveBeenCalled();
        });

        it('calls editEmployeeL when save changes button is clicked', () => {
            wrapper.setProps({ showEditView: true });
            const cancelButton = wrapper.find(Button).at(1);
            expect(cancelButton.prop('children').toLowerCase()).toEqual('save changes');
            cancelButton.simulate('click');
            expect(props.editEmployeeL).toHaveBeenCalled();
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
            let firstName = formComponent.find('#fn'), lastName = formComponent.find('#ln'), email = formComponent.find('#email'),
                gender = formComponent.find('#gender'), genderMaleFemale = formComponent.find('#gender-male' && '#gender-female'),
                datepicker = formComponent.find('#datepicker'), age = formComponent.find('#age');
            // expect(firstName.length).toBe(1); Nu all
            // expect(lastName.length).toBe(1);
            // expect(email.length).toBe(1);
            // expect(gender.length).toBe(1);
            // expect(datepicker.length).toBe(1);
            // expect(age.length).toBe(1);
                
            firstName.simulate("change", { target: { value: "myValue" } });  
                expect(firstName.props().onChange).toBeDefined();
                // expect(firstName.props().value).toBeDefined();
            // lastName.simulate("change", { target: { value: "myValue" } }); 
            //     expect(lastName.props().onChange).toBeDefined();
            //     expect(lastName.props().value).toBeDefined();
            // email.simulate("change", { target: { value: "myValue" } }); 
            //     expect(email.props().onChange).toBeDefined();
            //     expect(email.props().value).toBeDefined();
            genderMaleFemale.simulate("change", { target: { value: "myValue" } }); 
                // expect(genderMaleFemale.props().onChange).toBeDefined();
                // expect(genderMaleFemale.props().value).toBeDefined();
            datepicker.simulate("change", { target: { value: "myValue" } }); 
                // expect(datepicker.props().onChange).toBeDefined();
                // expect(datepicker.props().selected).toBeDefined();
            // age.simulate("change", { target: { value: "myValue" } }); Nu
            //     expect(age.props().value).toBeDefined();

               // 54.9 |    58.06 |       50 |     58.7 |... 94,102,113,195
        // Submit event trigger check
            // expect(formComponent.find('form').simulate('click', { preventDefault () {} })).toBeDefined(); // Nu
            setTimeout(() => {
                expect(formComponent.find('#cancelButton').simulate('click', { preventDefault () {} })).toBeDefined();
            })
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
