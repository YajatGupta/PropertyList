import React from 'react';

import classes from './Properties.css';
import Property from '../Property/Property';

const properties = (props) => {
    return (
        <div className={classes.Properties}>
            <div className="container">
                <div className="row">
                    {props.properties.map((property, index) => {
                        return (
                            <div 
                            key={"property"+index}
                            className="col-md-4 mb-2">
                                <Property
                                    prop={property} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default properties;