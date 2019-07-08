import React, { Component } from 'react';
import Sides from '../../Components/Sides/Sides';
import axios from 'axios';
import Properties from '../../Components/Properties/Properties';


const url = "http://localhost:1050/getproperties";

class Home extends Component {
    state = {
        properties: [],
        propertiescopy: [],
    }

    componentWillMount() {
        //make the ajax call to recieve all the property listings from the data base
        axios.get(url).then(response => {
            if (response.data.res) {
                console.log("true");
                console.log(response.data.properties);
                this.setState({ properties: response.data.properties, propertiescopy: response.data.properties });
            } else {
                this.setState({ properties: [], propertiescopy: [] });
            }
        })
            .catch(err => {
                this.setState({ properties: [], propertiescopy: [] });
            })

    }

    compareAsc = (A, B) => {
        return A.propertyRating < B.propertyRating ? -1 : 1;
    }

    compareDesc = (A, B) => {
        return A.propertyRating > B.propertyRating ? -1 : 1;
    }

    sortAsc = () => {
        const tempprops = [...this.state.propertiescopy];
        tempprops.sort(this.compareAsc);
        this.setState({ propertiescopy: tempprops });
    }

    sortDesc = () => {
        const tempprops = [...this.state.propertiescopy];
        tempprops.sort(this.compareDesc);
        this.setState({ propertiescopy: tempprops });
    }

    filter = (value) => {
        const tempprops = [...this.state.properties];
        const filtered = tempprops.filter(property => property.propertyRating >= value);
        this.setState({ propertiescopy: filtered });
    }

    render() {
        return (
            this.state.properties.length === 0 ? (
                <h2 className="text-dark display-4" style={{ marginTop: "70px" }}>Something Went Wrong<br />No Properties to show</h2>
            ) : (
                    <div>
                        <Sides filter={this.filter} ascending={this.sortAsc} descending={this.sortDesc} />
                        <Properties properties={this.state.propertiescopy} />
                    </div>
                )
        )
    }
}

export default Home;