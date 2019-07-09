import React, { Component } from 'react';
import classes from './App.css';
import { Switch, Link, Route, Redirect, withRouter } from 'react-router-dom';

import Home from './Container/Home/Home';
import Myproperties from './Components/MyProperties/Myproperties';
import Form from './Components/Form/Form';
import Modal from './UI/Modal/Modal';
import Login from './Components/Login/Login';
import Aux from './hoc/frag';
import Details from './Components/Details/Details';
import Edit from './Components/Edit/Edit';
import ls from 'local-storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  showmodal = () => {
    this.setState({ show: true });
  }

  closemodal = () => {
    this.setState({ show: false });
  }

  componentWillUnmount() {
    //clear the local storage of all the values
    ls.clear();
  }

  render() {
    return (
      <div className={classes.App}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ position: "fixed", top: '0', zIndex: "10", width: "100%" }}>
          <span className="navbar-brand">Property Dekho</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              {ls.get('userID') ? (
                <Aux>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-property">
                      Add Properties
                </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-properties">
                      My Properties
                </Link>
                  </li>
                </Aux>
              ) : null}
            </ul>
            <ul className="navbar-nav ml-auto">
              {ls.get('userID') ? (<li className="nav-item nav-link text-light font-weight-bold">
                Hi, {ls.get('userID')}
              </li>) : null}
              <li className="nav-item">
                {ls.get('userID') ? (<button style={{ display: "inline" }} onClick={() => { ls.set('userID', ''); ls.set('property', {}); this.props.history.replace('/home') }} className="nav-link btn bg-light text-dark">Logout
                </button>) : (<button style={{ display: "inline" }} onClick={this.showmodal} className="nav-link btn bg-light text-dark">Login
                </button>)}
              </li>
            </ul>
          </div>
        </nav>
        <Modal show={this.state.show} closemodal={this.closemodal}>
          <Login closemodal={this.closemodal} />
        </Modal>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/add-property" component={Form} />
          <Route path="/my-properties" component={Myproperties} />
          <Route path="/propertyDets" component={Details} />
          <Route path="/edit-details" component={Edit} />
          <Route path="/" component={Home} />
          <Route path="*" render={() => { return <Redirect to="/home" /> }} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
