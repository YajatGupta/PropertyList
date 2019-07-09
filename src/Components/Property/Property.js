import React from 'react';
import classes from './Property.css'
import ls from 'local-storage';
import { withRouter } from 'react-router-dom';



const property = (props) => {
    const arr = [];
    if (props.prop.propertyRating) {
        for (let i = 0; i < props.prop.propertyRating; i++) {
            arr.push(<span key={"span" + i}><i className="fa fa-star" style={{ color: "orange",margin:"0 0.5rem"}}></i></span>);
        }
    }

    let imageurl = props.prop.propertyImage ? props.prop.propertyImage.split('\\')[props.prop.propertyImage.split('\\').length-1] : 'house4.jpg';
    return (
        props.prop.propertyName?(<div className="card">
        <div className="card-header text-center">
            <h5>{props.prop.propertyName}</h5>
        </div>
        <img src={imageurl} style={{ width: "100%", height: "100%" }} className="card-image" alt="" />
        <div className="card-body" style={{textAlign:"left"}}>
            <div>
                <span style={{ fontWeight: "bold" }}>Price: </span>
                <span >{props.prop.propertyPrice}</span>
            </div>
            <div>
                <span style={{fontWeight:"bold"}}>Ratings: </span>
                <div className={classes.Rating} style={{display:"inline"}}>
                    {arr}
                </div>
            </div>
            <div>
                <span style={{ fontWeight: "bold" }}>Amenities: </span>
                <span>{props.prop.propertyAmenities.join(' ')}</span>
            </div>
        </div>
        <div className="class-footer">
            <button
                onClick={() => {
                    ls.set('property',props.prop);
                    props.history.push('/propertyDets');
                }}
                className="btn btn-primary btn-block">Details</button>
        </div>
    </div>):(<h2 className="display-4 text-dark text-center">Something Went Wrong</h2>)
        );
}

export default withRouter(property);