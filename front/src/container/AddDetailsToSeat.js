import React from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';


class AddDetailsToSeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SeatBooked: [],
            NoOfSeats: '',
            BusInfo: [],
            Name: [],
            Email: '',
            Phone: '',
            Gender: '',
            isThereError: {
                Name: '',
                Email: '',
                Phone: '',
                Gender: ''
            },
            Alert:''

        }
    }

    isValid = ({ isThereError, Name,Email,Phone,Gender }) => {
        let valid = true
        Object.values(isThereError).forEach(value => {
            if (value.length > 0) {
                valid = false
            }
        });
        if (Name === '') {
            valid = false
            
        }
        if (Email === '') {
            valid = false
            
        }
        if (Phone === '') {
            valid = false
            
        }
        if (Gender === '') {
            valid = false
            
        }
        console.log(valid)
        return valid
    }

    //taking bus info and seat ifo fron seatselection component
    static getDerivedStateFromProps(props, state) {
        state.SeatBooked = props.SeatDetails.SelectedSeat
        state.BusInfo = props.SeatDetails.BusInfo
        state.NoOfSeats = props.SeatDetails.SelectedSeat.length
        return true
    }

    SubmitInfo = (event)=>{
        event.preventDefault();
        const cost = this.state.BusInfo.Fare*this.state.NoOfSeats
        if(this.isValid(this.state)) {
            Axios.delete('http://localhost:3001/api/deletepassengerinfo')
            Axios.post('http://localhost:3001/api/putpassengerinfo', {
                Name: this.state.Name,
                Email: this.state.Email,
                Phone: this.state.Phone,
                Gender: this.state.Gender,
                BusType: this.state.BusInfo.BusType,
                Arrivals: this.state.BusInfo.Arrivals,
                Departure: this.state.BusInfo.Departure,
                SeatNo:this.state.SeatBooked,
                Cost:cost,
                Date:this.state.BusInfo.Date
            });
            window.location=('/payment')
        }
        else{
            this.setState({
                Alert:'All Fields Require Correct Information'
            })
        }
        
        
    }

    OnchangeInputHandler = (event) => {
        const { name, value } = event.target
        const isThereError = { ...this.state.isThereError }
        const MailForm = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)
        console.log(this.state)
        // isThereError.ConfirmPassword = this.state.Password !== this.state.ConfirmPassword ? 'mismatch' : ''
        switch (name) {
            case "Name1":
                isThereError.Name = value.length < 3 ? "Containe Atleast 4 Charecters" : ""
                break;
            case 'Email':
                isThereError.Email = MailForm.test(value) ?
                    '' : 'Enter Valid Email'
                break;
            case 'Phone':
                isThereError.Phone = value.length < 10 || value.length > 10 ?
                    ' Containe 10 Digit' : ''
                break;
            case 'Gender':
                isThereError.Gender = value.length < 4 ?
                    ' Atleast 4 Charecters' : ''
                break;
            default:
                break;
        }

        console.log(name, value)

        this.setState({
            isThereError: isThereError,
            [name]: value

        })
    }


    render() {

        const isThereError = { ...this.state.isThereError }
        return (
            <div className='justify-content-center align-items-center'>
                <div>
                    <form onSubmit={this.SubmitInfo} action="#">
                        <h5>Bus Information</h5>
                        <div>
                            <div className="form-row">
                                <div className="col">
                                    <h6>Leaving From</h6>
                                </div>
                                <div className="col">
                                    <h6>Going To</h6>
                                </div>
                                <div className="col">
                                    <h6>Departure</h6>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <input type="text"
                                        name='From'
                                        value={this.state.BusInfo.From}
                                        className="form-control"
                                        readOnly />
                                </div>
                                <div className="col">
                                    <input type="text"
                                        name='To'
                                        value={this.state.BusInfo.To}
                                        className="form-control" readOnly />
                                </div>
                                <div className="col">
                                    <input type="text"
                                        name='Arrivals'
                                        value={this.state.BusInfo.Departure}
                                        className="form-control" readOnly />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="form-row">
                                <div className="col">
                                    <h6>Journey Date</h6>
                                </div>
                                <div className="col">
                                    <h6>Fare</h6>
                                </div>
                                <div className="col">
                                    <h6>Arrivals</h6>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <input type="text"
                                        name='JourneyDate'
                                        value={this.state.BusInfo.Date}
                                        className="form-control" readOnly />
                                </div>
                                <div className="col">
                                    <input type="text"
                                        name='Bustype'
                                        value={this.state.BusInfo.Fare}
                                        className="form-control" readOnly />
                                </div>
                                <div className="col">
                                    <input type="text"
                                        name='Departure'
                                        value={this.state.BusInfo.Arrivals}
                                        className="form-control" readOnly />
                                </div>
                            </div>
                        </div>
                        {this.state.NoOfSeats > 0 ? <div>
                            <label><h5>Passenger Information</h5></label>
                            {this.state.SeatBooked.map((ele, index) => {
                                return (
                                    <div key={index}>
                                        <div className="form-row">
                                            <div className="col">
                                                <h6>{`Passenger Name ${index + 1}`}</h6>
                                            </div>
                                            <div className="col">
                                                <h6>Passenger Seat</h6>
                                            </div>
                                            <div className="col">
                                                <h6>Passenger Gender</h6>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col">
                                                <input type="text" onChange={this.OnchangeInputHandler} name='Name' className="form-control" placeholder="Name" />
                                            </div>
                                            <div className="col">
                                                <input type="text" name='SeatNo' className="form-control" value={ele} readOnly />
                                            </div>
                                            <div className="col">
                                                <input type="text" onChange={this.OnchangeInputHandler} name='Gender' className="form-control" placeholder="Gender" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col">
                                                {isThereError.Name.value === '' ?
                                                    '' : <h6 style={{ 'color': 'red' }}>{isThereError.Name}</h6>}

                                            </div>
                                            <div className="col">


                                            </div>
                                            <div className="col">
                                                {isThereError.Gender.value === '' ?
                                                    '' : <h6 style={{ 'color': 'red' }}>{isThereError.Gender}</h6>}

                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                            <br />
                            <label><h5>Contact Information</h5></label>
                            <div className="form-row">
                                <div className="col">
                                    <h6>Passenger Phone</h6>
                                </div>
                                <div className="col">
                                    <h6>Passenger Email</h6>
                                </div>
                                <div className="col">
                                    <h6>Total Cost</h6>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <input type="number" name='Phone' onChange={this.OnchangeInputHandler} className="form-control" placeholder="Phone No" />
                                </div>
                                <div className="col">
                                    <input type="text" name='Email' onChange={this.OnchangeInputHandler} className="form-control" placeholder="Email" />
                                </div>
                                <div className='col'>
                                    <input type="number" className="form-control" name='TotalSeats' value={this.state.NoOfSeats * this.state.BusInfo.Fare} id="TotalSeat" readOnly />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    {isThereError.Phone.value === '' ?
                                        '' : <h6 style={{ 'color': 'red' }}>{isThereError.Phone}</h6>}

                                </div>
                                <div className="col">
                                {isThereError.Email.value === '' ?
                                        '' : <h6 style={{ 'color': 'red' }}>{isThereError.Email}</h6>}

                                </div>
                                <div className="col">
                                    
                                </div>
                            </div>
                            <br />
                            {/* <Link className="btn btn-info btn-block " to={{pathname:'/payment'}}>Book Ticket</Link> */}
                        </div>  : ''}
                        {this.state.Alert === ''?'': <h6 style={{ 'color': 'red' }}>{this.state.Alert}</h6>}
                        <button type='submit' className="btn btn-info btn-block "  >Proceed</button>
                    </form>
                </div>
            </div >
        )
    }
}


export default AddDetailsToSeat;
