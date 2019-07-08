import React, { Component } from 'react'
import classes from './Login.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import ls from 'local-storage';

const url = "http://localhost:1050/Login";

class Login extends Component {
    state = {
        form: {
            custID: "",
            password: ""
        },
        formErrors: {
            custID: "",
            password: ""
        },
        formValid: {
            custID: false,
            password: false,
        },
        valid: false,
        errorMessage: "",
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let tempform = this.state.form;
        tempform[name] = value;
        this.setState({ form: tempform });
        this.validate(name, value);
    }

    validate = (fieldname, fieldvalue) => {
        let errors = this.state.formErrors;
        let valid = this.state.formValid;
        let tempvalid;
        if (fieldvalue === "") {
            errors[fieldname] = "Field required";
            valid[fieldname] = false;
        } else {
            errors[fieldname] = "";
            valid[fieldname] = true;
        }
        tempvalid = valid.custID && valid.password;
        this.setState({ formErrors: errors, valid: tempvalid, formValid: valid });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post(url, this.state.form)
            .then(res => {
                console.log("response", res);
                //dispatch an action to login
                if (res.data) {
                    //this.props.login(res.data);
                    ls.set('userID', res.data);
                    this.props.closemodal();
                } else {
                    this.setState({ errorMessage: "Invalid username or password" });
                }
            })
            .catch(err => {
                this.setState({ errorMessage: "Please start your server first" });
            })
    }

    render() {
        return (
            <div className={classes.Login}>
                <div className="card">
                    <div className="card-header bg-dark">
                        <h5 className="text-info display-4">Login</h5>
                    </div>
                    <div className="card-body">
                        <div className="form">
                            <form>
                                <div className="form-group">
                                    <label className="font-weight-bold text-left">User ID:</label>
                                    <input name="custID" type="text" className="form-control" onChange={this.handleChange} value={this.state.form.custID} required autoFocus />
                                    <span className="text-danger">{this.state.formErrors.custID}</span>
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Password:</label>
                                    <input name="password" type="password" className="form-control" onChange={this.handleChange} value={this.state.form.password} required />
                                    <span className="text-danger">{this.state.formErrors.password}</span>
                                </div>
                                {this.state.errorMessage ?
                                    (<span className="text-danger">{this.state.errorMessage}</span>)
                                    : null}
                            </form>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" disabled={!this.state.valid} onClick={this.handleSubmit} className="btn btn-primary btn-block">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (data) => dispatch({ type: actions.LOGIN, id: data })
    }
}

export default connect(null, mapDispatchToProps)(Login);