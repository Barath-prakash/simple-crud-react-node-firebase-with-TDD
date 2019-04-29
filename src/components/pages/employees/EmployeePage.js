import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { MSG } from 'shared/commonMessages/messages';

//React-Notification
import NotificationSystem from 'react-notification-system';

// Import dependent components
import EmployeeList from './EmployeeList';
import FormModal from 'components/forms/employees/FormModal';

// Action
import { fetchAllEmployeesA, employeeFormMoalOpenA, employeeFormMoalCloseA, 
         addEmployeeA, fetchEmployeeA, updateEmployeeA, deleteEmployeeA, deleteMultipleEmployeesA } from 'action/employeeAction';

const notifyStyle = {
    NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
            margin: '100px 5px 5px 5px',
            padding: '20px 5px 15px 5px',
            fontSize: 17,
            textAlign: 'center'      
        }
    }
}
           
class EmployeePage extends Component {
    state = {
        mDeleteEmpArr: []
    }

    componentDidMount() {
        this.fetchAllEmployees();
    }

    // P
    fetchAllEmployees = () => {
        return this.props.fetchAllEmployees1();
    }
 
    // P
    employeeFormMoalOpen = () => {
        return this.props.employeeFormMoalOpen1();
    }

    employeeFormMoalClose = () => {
        return this.props.employeeFormMoalClose1();
    }

    addEmployee = (data) => {
        return this.props.addEmployee1(data).then(res => {
            this.fetchAllEmployees();
            this.setState({ mDeleteEmpArr: [] });
            this.notifyMsgFn(MSG['added_success'], 'success');
        })
    }

    editEmployeeP = (empId) => {
       return this.props.fetchEmployee1(empId).then(res => {
        this.employeeFormMoalOpen();
      })
    }

    updateEmployee = (data) => {
        return this.props.updateEmployee1(data).then(res => {
            this.fetchAllEmployees();
            this.setState({ mDeleteEmpArr: [] });
            this.notifyMsgFn(MSG['updated_success'], 'success');
        })
    }

    deleteEmployee = (empId) => {
        return this.props.deleteEmployee1(empId).then(res => {
            this.fetchAllEmployees();
            this.setState({ mDeleteEmpArr: [] });
            this.notifyMsgFn(MSG['removed_success'], 'success');
        })  
    }

    deleteEmployeeConfirm = (empId) => {
        let id = empId;
        this.notifyRef.addNotification({
            position: "tc",
            level: 'error',
            message: 'Are you sure you want to delete this employee?',
            autoDismiss: 0,
            action: {
                label: 'Ok',
                callback: () => {
                  this.deleteEmployee(id);
                }
              }
        })
    }

    mDeleteEmpId = (empData) => {
      let empIdArr = [...this.state.mDeleteEmpArr];
      if(empData.checked) {
        empIdArr.push(empData.empId);
      } else {
        let existIdInx = empIdArr.findIndex(data => data === empData.empId)
        if(existIdInx > -1) {
           empIdArr.splice(existIdInx, 1);
        }
      }
      this.setState({ mDeleteEmpArr: empIdArr });
    }

    deleteMultipleEmployeesConfirm = () => {
        this.notifyRef.addNotification({
            position: "tc",
            level: 'error',
            message: 'Are you sure you want to delete multiple employees?',
            autoDismiss: 0,
            action: {
                label: 'Ok',
                callback: () => {
                  this.deleteMultipleEmployeesC();
                }
              }
        })
        
    }

    deleteMultipleEmployeesC = () => {
        return this.props.deleteMultipleEmployees1(this.state.mDeleteEmpArr)
        .then(res => {
            this.setState({ mDeleteEmpArr: [] });
            this.fetchAllEmployees();
            this.notifyMsgFn(MSG['removed_success'], 'success');
        })
    }

    notifyMsgFn = (message, level) => {
        this.notifyMsg.addNotification({
            position: "tc",
            message: message,
            level: level
        });
    }

    render() {
        const { employees, employeeFormModal, employee } = this.props;
        const { mDeleteEmpArr } = this.state;
        return (
            <div className="container">
            <NotificationSystem ref={input => this.notifyRef = input} style={notifyStyle}/>
            <div>
                <h4 style={{float: 'left'}}>Employees List</h4>
                <Button variant="primary" style={{float: 'right'}} onClick={this.employeeFormMoalOpen}>Add employee</Button>
            </div><br/><br/>
                <EmployeeList 
                    id="employeeList"
                    employees={employees} 
                    editEmployeeL={this.editEmployeeP} 
                    deleteEmployee={this.deleteEmployeeConfirm} 
                    mDeleteEmpId={this.mDeleteEmpId} 
                    mDelete={mDeleteEmpArr.length > 1 ? true : false}
                    deleteMultipleEmployees={this.deleteMultipleEmployeesConfirm}
                    />
                <FormModal 
                    employeeFormMoalClose={this.employeeFormMoalClose} 
                    employeeFormModal={employeeFormModal}
                    employee={employee}
                    addEmployee={this.addEmployee} 
                    updateEmployee={this.updateEmployee}
                    />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let employees = state.employees.employees ? state.employees.employees : [];
    let employeeFormModal = state.employees.employeeFormModal ? state.employees.employeeFormModal : false;
    let employee = state.employees.employee ? state.employees.employee : {};
    return {
        employees, employeeFormModal, employee
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllEmployees1: () => dispatch(fetchAllEmployeesA()),
        employeeFormMoalOpen1: () => dispatch(employeeFormMoalOpenA()), // TP
        employeeFormMoalClose1: () => dispatch(employeeFormMoalCloseA()),
        addEmployee1: (data) => dispatch(addEmployeeA(data)),
        fetchEmployee1: (empId) => dispatch(fetchEmployeeA(empId)),
        updateEmployee1: (data) => dispatch(updateEmployeeA(data)),
        deleteEmployee1: (empId) => dispatch(deleteEmployeeA(empId)),
        deleteMultipleEmployees1: (empIdArr) => dispatch(deleteMultipleEmployeesA(empIdArr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);