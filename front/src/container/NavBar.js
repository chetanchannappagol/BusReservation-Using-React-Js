import React from 'react'
import BusSearch from './BusSearch'
import SeatSelection from './SeatSelection'
import Login from './Login'
import Reg from './Registration'
import ContactUs from '../Data/ContactUs'
import Payment from './Payment'
import CheckOut from './Checkout'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom'
import Axios from 'axios'

class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            Logindata: [],
            length: ''
        }
    }
    componentDidMount() {
        this.getLoginDataFromDb()
    }

    async getLoginDataFromDb() {
        await Axios.get('http://localhost:3001/api/getLoginData')
            .then((data) => this.setState({ Logindata: data.data.data }))
        console.log(this.state.Logindata.length)
    }

    deleteLogin = () => {
        Axios.delete('http://localhost:3001/api/deleteLoginData');
        Axios.delete('http://localhost:3001/api/deleteBusData')
        Axios.delete('http://localhost:3001/api/deletepassengerinfo')
        window.location = ('./')
    }

    render() {
        return (
            <BrowserRouter>
                <nav className="navbar navbar-expand-lg navbar-dark NavBar">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/">BusBooking</a>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            
                            <li className="nav-item">
                                <Link to='/' className="nav-link" >Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/contactus' className="nav-link" >ContactUs </Link>
                            </li>
                            {
                                this.state.Logindata.length === 0 ?
                                    <>
                                        <li className="nav-item">
                                            <Link to='/loginpage' className="nav-link">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/registrationpage' className="nav-link" >Register</Link>
                                        </li>
                                    </> :
                                    <>
                                        <li className="nav-item"><Link onClick={this.deleteLogin} to='/' className="nav-link "  >Log Out</Link></li>
                                        <li className="nav-item">
                                            <h5 style={{ color: 'White', paddingLeft: '10px', marginTop: '12px' }}>
                                                <i>Welcome {this.state.Logindata[0].Name}</i> </h5></li>
                            
                                    </>
                            }

                        </ul>

                    </div>
                </nav>
                <Switch>
                    <Route exact path='/'>
                        <BusSearch />
                    </Route>
                    <Route path='/loginpage'>
                        <Login />
                    </Route>
                    <Route path='/registrationpage'>
                        <Reg />
                    </Route>
                    <Route path='/seatselect'>
                        <SeatSelection />
                    </Route>
                    <Route path='/payment' component={Payment}>

                    </Route>
                    <Route path='/contactus' component={ContactUs}>
                    </Route>
                    <Route path='/checkout' component={CheckOut}>
                    </Route>
                    <Redirect from='' to='/' />
                </Switch>
            </BrowserRouter>
        )
    }


}

export default NavBar;