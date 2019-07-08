import React from 'react'
import classes from './Details.css';
import Property from '../Property/Property';
import ls from 'local-storage';

const details = (props) => {
    return (
        <div className={classes.Details}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Property prop={ls.get('property')} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default details;