import React, { Component } from 'react';
import axios from 'axios';
import ls from 'local-storage';

const URL = "http://localhost:1050/add-property/"
const url2 = "http://localhost:1050/updateProperty/";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                price: "",
                name: "",
                rating: "",
                amenities: "",
            },
            formErrors: {
                price: "",
                name: "",
                rating: "",
                amenities: ""
            },
            formValid: {
                price: false,
                name: false,
                rating: false,
                amenities: false
            },
            image: null,
            valid: this.props.property ? true : false,
            successMessage: "",
            errorMessage: ""
        }
    }

    // placeholder={this.props.property ? this.props.property.propertyName : null}

    handleUpdate = (event) => {
        event.preventDefault();
        console.log(this.props.property._id);
        console.log(this.state.form);
        console.log("image, ", this.state.image);
        let config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        let formdata = new FormData();
        formdata.append('price', this.state.form.price);
        formdata.append('name', this.state.form.name);
        formdata.append('rating', this.state.form.rating);
        formdata.append('amenities', this.state.form.amenities.split(' '));
        formdata.append('propimage', this.state.image);
        formdata.append('id',this.props.property._id);
        axios.put(url2 + ls.get('userID'), formdata,config).then(response => {
            if (response.data.res) {
                this.setState({ successMessage: response.data.message, errorMessage: "" });
            } else {
                this.setState({ successMessage: "", errorMessage: response.data.message });
            }
        }).catch(err => {
            this.setState({ successMessage: "", errorMessage: err.response.data.message });
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.form);
        console.log("image, ", this.state.image);
        let formdata = new FormData();
        formdata.append('price', this.state.form.price);
        formdata.append('name', this.state.form.name);
        formdata.append('rating', this.state.form.rating);
        formdata.append('amenities', this.state.form.amenities.split(' '));
        formdata.append('propimage', this.state.image);
        console.log(formdata);
        console.log(this.state.image);
        axios({
            url: URL + ls.get('userID'),
            method: "POST",
            data: formdata
        }).then(response => {
            if (response.data.res) {
                this.setState({ successMessage: response.data.message, errorMessage: "" });
            } else {
                this.setState({ successMessage: "", errorMessage: response.data.message });
            }
        }).catch(err => {
            this.setState({ successMessage: "", errorMessage: err.response.data.message });
        })
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let tempForm = this.state.form;
        tempForm[name] = value;
        this.setState({ form: tempForm })
        if (name !== "propimage") {
            this.validate(name, value);
        } else {
            this.setState({ image: event.target.files[0] });
        }
    }

    validate(fieldname, fieldvalue) {
        let valid = true;
        let tempvalid = this.state.formValid;
        let temperrors = this.state.formErrors;
        if (fieldvalue === "") {
            temperrors[fieldname] = "Field Required";
            tempvalid[fieldname] = false;
        }
        else {
            temperrors[fieldname] = "";
            tempvalid[fieldname] = true;
        }
        if (fieldname === "rating") {
            if (Number(fieldvalue) > 5) {
                temperrors.rating = "Rating cannot be more than 5";
                tempvalid.rating = false;
            }
            else {
                temperrors.rating = "";
                tempvalid.rating = true;
            }
        }
        for (let value of Object.values(tempvalid)) {
            valid = valid && Boolean(value);
        }
        this.setState({ formErrors: temperrors, formValid: tempvalid, valid: valid });
    }

    render() {
        return (
            <div className="container" style={{ position: "fixed", top: "10%", left: "10%"}}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header bg-dark text-secondary text-center">
                                <h5 className="display-4 text-secondary">Add a Property</h5>
                            </div>
                            <div className="card-body">
                                <div className="form">
                                    <form>
                                        <div className="form-group">
                                            <label className="form-label">
                                                Name:
                        </label>
                                            <input className="form-control" name="name" type="text" value={this.state.form.name || (this.props.property && this.props.property.propertyName)}  onChange={this.handleChange} required autoFocus />
                                            <span className="text-danger">{this.state.formErrors.name}</span>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                Price:
                        </label>
                                            <input className="form-control" name="price" type="text" value={this.state.form.price || (this.props.property && this.props.property.propertyPrice)}  onChange={this.handleChange} required />
                                            <span className="text-danger">{this.state.formErrors.price}</span>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                Rating:
                        </label>
                                            <input className="form-control" name="rating" type="number" value={this.state.form.rating || (this.props.property && this.props.property.propertyRating)} onChange={this.handleChange} required />
                                            <span className="text-danger">{this.state.formErrors.rating}</span>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                Amenities:
                        </label>
                                            <input className="form-control" name="amenities" type="text" value={this.state.form.amenities || (this.props.property && this.props.property.propertyAmenities.join(' '))} onChange={this.handleChange} required />
                                            <span className="text-danger">{this.state.formErrors.amenities}</span>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                Image:
                        </label>
                                            <input className="form-control" name="propimage" type="file" onChange={this.handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            {this.props.property ? (
                                                <button onClick={this.handleUpdate} disabled={!this.state.valid} className="btn btn-primary btn-block">Update Property</button>
                                            ) : (
                                                    <button onClick={(event) => this.handleSubmit(event)} disabled={!this.state.valid} className="btn btn-primary btn-block">Add Property</button>
                                                )}
                                        </div>
                                        {this.state.successMessage ? (<span className="text-success">{this.state.successMessage}</span>) : null}
                                        {this.state.errorMessage ? (<span className="text-danger">{this.state.errorMessage}</span>) : null}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form;