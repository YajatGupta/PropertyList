import React from 'react';
import classes from './Sides.css';

const sides = (props) => {
    return (
        <div className={classes.Sides} style={{float:"left"}}>
        <div className="card bg-dark text-light" style={{margin:"auto",width:"90%",boxSizing:"border-box",boxShadow:"0 0 5px 2px"}}>
            <div className="card-header"><h5>Filters</h5></div>
            <div className="card-body">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary btn-block dropdown-toggle" data-toggle="dropdown">
                        Rating Filter
        </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item card-text" value="4" onClick={(event)=>props.filter(4)}>4 & above</button>
                        <button className="dropdown-item card-text" value="3" onClick={(event)=>props.filter(3)}>3 & above</button>
                        <button className="dropdown-item card-text" value="2" onClick={(event)=>props.filter(2)}>2 & above</button>
                        <button className="dropdown-item card-text" value="1" onClick={(event)=>props.filter(1)}>1 & above</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="card bg-dark text-light"  style={{margin:"auto",width:"90%",boxSizing:"border-box",boxShadow:"0 0 5px 2px"}}>
            <div className="card-header"><h5>Sort</h5></div>
            <div className="card-body">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary btn-block dropdown-toggle" data-toggle="dropdown">
                        Rating
    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item card-text" onClick={props.ascending}>Ascending</button>
                        <button className="dropdown-item card-text" onClick={props.descending}>Descending</button>
                    </div>
                </div>
            </div>
        </div>
        </div>);
}

export default sides;