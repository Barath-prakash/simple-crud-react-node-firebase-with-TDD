import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Validator from 'validator';
import { MSG } from 'shared/commonMessages/messages';
moment.suppressDeprecationWarnings = true;

const FormModal = ({ employeeFormModal, employee, addEmployee, updateEmployee, employeeFormMoalClose }) => {

    let stateObj = {
        data: {
            empId: "",
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            dateOfBirth: "",
            age: ""
        },
        errors: {},
        loading: false
    };
   
    const [state, setState] = useState(stateObj);
    
    useEffect(() => {
        if(Object.keys(employee).length > 0) {
            let stateObjVal = {
                data: {
                    empId: employee.empId,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email,
                    gender: employee.gender,
                    dateOfBirth: employee.dateOfBirth,
                    age: employee.age
                },
                errors: {},
                loading: false
            };
            setState(stateObjVal);
        }
    }, [employee]);

        const handleCloseFormModal = () => {
            resetForm();
            employeeFormMoalClose();
        }
    
        const handleChange = (e) => {
            // this.setState({ data: {...this.state.data, [e.target.name]: e.target.value } });
            setState({...state, data: { ...data, [e.target.name] : e.target.value } });
        }
        
        const handleDateChange = (date) => {
            if(date !== null && date !== "Invalid date") {
                setState({...state, data: { ...data, dateOfBirth : date, age: moment().diff(moment(date).format('L'), 'years') } });
            } else {
                setState({...state, data: { ...data, dateOfBirth : "", age: "" } });
            }
        }
        
        const handleSubmit = (e) => {
            e.preventDefault();
            let data = state.data;
            const errors = validate(data);
            setState({ ...state, errors });
            if(Object.keys(errors).length === 0) {
                setState({ ...state, loading: true })
                if(state.data.empId) {
                    return updateEmployee(data).then(res => handleCloseFormModal()).catch(err => setState({ ...state, loading: false }))
                } else {
                    return addEmployee(data).then(res => handleCloseFormModal()).catch(err => setState({ ...state, loading: false }))
                }
            }
        }
    
        const validate = (data) => {
            const errors = {};
    
            if(Validator.isEmpty(data.firstName)) {
               errors['firstName'] = MSG['firstName_cannot_empty'];
            } else if(!Validator.isLength(data.firstName, { min: 3 })) {
               errors['firstName'] = MSG['firstName_length'];
            }
    
            if(Validator.isEmpty(data.lastName)) {
                errors['lastName'] = MSG['lastName_cannot_empty'];
            } else if(!Validator.isLength(data.lastName, { min: 2 })) {
                errors['lastName'] = MSG['lastName_length'];
            }
    
            if(Validator.isEmpty(data.email)) {
                errors['email'] = MSG['email_cannot_empty'];
            } else if(!Validator.isEmail(data.email)) {
                errors['email'] = MSG['email_invalid'];
            }
    
            if(Validator.isEmpty(data.gender)) {
                errors['gender'] = MSG['gender_cannot_empty'];
            }
    
            if(Validator.isEmpty(data.dateOfBirth.toString().trim())) {
                errors['dateOfBirth'] = MSG['dob_cannot_empty'];
            }
    
            if(Validator.isEmpty(data.age.toString().trim()) || data.age === 0) {
                errors['age'] = MSG['age_cannot_empty'];
            }
    
            return errors;
        }
        
        const resetForm = () => {
            setState(stateObj);
        }

        const { data, loading, errors } = state;
        return (
            <Modal 
                id="modal"
                size="lg" 
                backdrop="static"
                isOpen={employeeFormModal} 
                toggle={() => handleCloseFormModal()} 
                >
                <ModalHeader toggle={() => handleCloseFormModal()}>
                    {data.empId ? "Update employee" : "Add employee"}
                </ModalHeader>
                <form onSubmit={(e) => handleSubmit(e)}>
                <ModalBody className="modal-overlay">
                    <div className="form-group">
                        <label htmlFor="firstName">First name:</label>
                        <input type="text" className="form-control" id="fn" name="firstName" value={data.firstName ? data.firstName: ""} onChange={(e) => handleChange(e)} placeholder="Enter first name" maxLength="75"/>
                        {errors.firstName && <span className="fld-error">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last name:</label>
                        <input type="text" className="form-control" id="ln" name="lastName" value={data.lastName ? data.lastName: ""} onChange={(e) => handleChange(e)} placeholder="Enter last name" maxLength="50"/>
                        {errors.lastName && <span className="fld-error">{errors.lastName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="em" name="email" value={data.email ? data.email: ""} onChange={(e) => handleChange(e)} placeholder="Enter email address" maxLength="200"/>
                        {errors.email && <span className="fld-error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" id="gender">Gender:</label>
                            <label className="btn btn-default" style={{marginTop: 5}}>
                                <input type="radio" id="gender-male" name="gender" value="male" onChange={(e) => handleChange(e)} checked={data.gender && data.gender === "male"}/> Male
                            </label> 
                            <label className="btn btn-default" style={{marginTop: 5}}>
                                <input type="radio" id="gender-female" name="gender" value="female" onChange={(e) => handleChange(e)} checked={data.gender && data.gender === "female"}/> Female
                            </label><br/> 
                        {errors.gender && <span className="fld-error">{errors.gender}</span>}
                    </div>  
                    <div>
                    <label htmlFor="dateOfBirth">Date of birth:</label><br/>
                    <Datepicker
                        id="datepicker"
                        selected={(data.dateOfBirth && data.dateOfBirth !== "Invalid date") ? new Date(data.dateOfBirth) : null}
                        onChange={(e) => handleDateChange(e)}
                        peekNextMonth={true}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        dropdownMode="select"
                        placeholderText="DD-MM-YYYY"
                        dateFormat="dd-MM-yyyy"
                        shouldCloseOnSelect={true}
                        isClearable={true}
                        maxDate={new Date()}
                    />
                    <br/>
                    {errors.dateOfBirth && <span className="fld-error">{errors.dateOfBirth}</span>}
                    </div>
                    <div className="loading"></div>
                    <div className="form-group" style={{marginTop: 10}}>
                        <label htmlFor="age">Age:</label>
                        <input type="text" className="form-control" id="ag" value={data.age ? data.age: ""} maxLength="2" readOnly placeholder="Select your date of birth to fill this field"/>
                        {errors.age && <span className="fld-error">{errors.age}</span>}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button id="cancelButton" type="button" variant="secondary" onClick={() => handleCloseFormModal()} disabled={loading}>Close</Button>
                    <Button id="submitButton" type="submit" variant="primary" disabled={loading}>Save</Button>
                </ModalFooter>
                </form> 
            </Modal>
        )
   }

export default FormModal;