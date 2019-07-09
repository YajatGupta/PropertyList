import React, { Component } from 'react';

import Property from '../Property/Property';
import classes from './Myproperties.css';
import axios from 'axios';
import ls from 'local-storage';
import {withRouter} from 'react-router-dom';

const url = "http://localhost:1050/get-properties/"

class Myproperties extends Component {
    state = {
        properties: []
    }

    componentWillMount() {
        //ajax call to fetch the data for the respective user
        axios.get(url + ls.get('userID')).then(res => {
            if (res.data) {
                this.setState({ properties: res.data })
            } else {
                this.setState({ properties: [] });
            }
        })
            .catch(err => {
                this.setState({ properties: [] });
            })
    }

    render() {
        return (
            <div className={classes.Myproperties}>
                {ls.get('userID') ? (this.state.properties.length > 0 ? (<div className="container">
                    <div className="row">
                        {this.state.properties.map((property,i) => {
                            return (
                                <div 
                                key={"property" + i}
                                className="col-md-4 mb-2">
                                    <Property prop={property} />
                                    <button
                                        onClick={() => {
                                            ls.set('property', property);
                                            this.props.history.push('/edit-details');
                                        }}
                                        className="btn btn-dark text-warning btn-block">Edit Details</button>
                                </div>
                            )
                        })}
                    </div>
                </div>) : (<h2 className="text-dark display-4">No properties to show, Add some First</h2>)) : (<h2 className="text-dark display-4">Something went Wrong, Please Login First</h2>)}
            </div>
        )
    }

}

export default withRouter(Myproperties);