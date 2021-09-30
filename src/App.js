import React, { Component } from 'react';
import "./App.css";

const emailPattern = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );  

const formValid = ({formErrors, ...rest}) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        if(val.length > 0){ 
            valid = false;
        }
    });
    Object.values(rest).forEach(val => {
        if(val === null){
            valid = false;
        } 
    })
    return valid;
}

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            }
        };
    }
    submitHandler = (e) => {
        e.preventDefault();
        if(formValid(this.state)){
            console.log(`
            --submitting--
            First Name: ${this.state.firstName}
            Last Name: ${this.state.lastName}
            Email: ${this.state.email}
            Password: ${this.state.password}
            `);
        }else{
            alert("Please fill up the form properly!!");
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
        }
    };
    
    changeHandler = (e) =>{
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        
        switch(name){
            case "firstName":
                formErrors.firstName = value.length < 3 && value.length > 0 ? "minimum 3 character is required" : "";
                break;
            case "lastName":
                formErrors.lastName = value.length < 3 && value.length > 0 ? "minimum 3 character is required" : "";
                break;
            case "email":
                formErrors.email = emailPattern.test(value) && value.length > 0 ? "" : "Please enter valid email address!";
                break;
            case "password":
                formErrors.password = value.length < 6 && value.length > 0 ? "minimum 6 character is required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value}, () => console.log(this.state));
    }
    
    render(){
        const {formErrors} = this.state;
        return(
            <div className="container">
                <div className="title-container">
                    <h2>Form Validation</h2>
                </div>
                <div className="space">
                    <div className="info">
                        <p>
                            This is a
                        </p>
                        <h1 id="infom">ReactJS Form Validation</h1>
                        <p>by <span>PJS</span></p>
                        
                    </div>
                    <div className="form-container">
                        <div className="text">
                            <h1>Create Account</h1>
                        </div>
                        <form onSubmit={this.submitHandler} noValidate>
                            <div className="input-field">
                                <div className="firstName">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className={formErrors.firstName.length > 0 ? "error" : null} placeholder="First Name" name="firstName" 
                                    noValidate onChange={this.changeHandler} />
                                    {formErrors.firstName.length > 0 && (
                                        <span className="errorMessage">{formErrors.firstName}</span>
                                    )}
                                </div>
                                <div className="lastName">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className={formErrors.lastName.length > 0 ? "error" : null} placeholder="Last Name" name="lastName" 
                                    noValidate onChange={this.changeHandler} />
                                    {formErrors.lastName.length > 0 && (
                                        <span className="errorMessage">{formErrors.lastName}</span>
                                    )}
                                </div>
                                <div className="email">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className={formErrors.email.length > 0 ? "error" : null} placeholder="Email" name="email" 
                                    noValidate onChange={this.changeHandler} />
                                    {formErrors.email.length > 0 && (
                                        <span className="errorMessage">{formErrors.email}</span>
                                    )}
                                </div>
                                <div className="password">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className={formErrors.password.length > 0 ? "error" : null} placeholder="Password" name="password" 
                                    noValidate onChange={this.changeHandler} />
                                    {formErrors.password.length > 0 && (
                                        <span className="errorMessage">{formErrors.password}</span>
                                    )}
                                </div>
                                <div className="submit-btn">
                                    <div><button type="submit">Sign Up</button></div>
                                    <div><small><a href="#">Already Have an Account?</a></small></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;