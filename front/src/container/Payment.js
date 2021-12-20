import React from 'react'
import { Link } from 'react-router-dom'

class Payment extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            NameOnCard: '',
            CardNumber: '',
            Month: '',
            Year: '',
            Cvv: '',
            isThereError: {
                NameOnCard: '',
                CardNumber: '',
                Month: '',
                Year: '',
                Cvv: ''
            },
            Alert:''
        }

    }

    isValid = ({ isThereError, NameOnCard, CardNumber, Month, Year, Cvv }) => {
        let valid = true
        Object.values(isThereError).forEach(value => {
            if (value.length > 0) {
                valid = false
            }
        });

        if (NameOnCard === '') {
            valid = false

        }
        if (CardNumber === '') {
            valid = false

        }
        if (Month === '') {
            valid = false

        }
        if (Year === '') {
            valid = false

        }

        if (Cvv === '') {
            valid = false

        }
        return valid
    }

    validate = (event) => {
        event.preventDefault()
        if (this.isValid(this.state) === true) {
        window.location=('/checkout')
        }
        else {
            this.setState({
                Alert:'Please Enere All Fields Correctly'
            })
        }
    }


    OnchangeInputHandler = (event) => {
        event.preventDefault();

        const { name, value } = event.target

        const isThereError = { ...this.state.isThereError }
        switch (name) {
            case 'NameOnCard':
                isThereError.NameOnCard = value.length < 3 ? 'Please Enter Name' : ''
                break;
            case 'CardNumber':
                isThereError.CardNumber = value.length < 16 || value.length > 16 ? 'Please Enter valid Card Number' : ''
                break;
            case 'Month':
                isThereError.Month = value < 1 || value > 12 ? 'Please Enter valid Month' : ''
                break;
            case 'Year':
                isThereError.Year = value < 2020 ? 'Please Enter valid Year' : ''
                break;
            case 'Cvv':
                isThereError.Cvv = value.length === 3 ? '' : 'Please Enter Valid Cvv'
                break;
            default:
                break;
        }
        this.setState({
            isThereError: isThereError,
            [name]: value
        })
    }
    render() {
        console.log(this.state.Data)
        let isThereError = { ...this.state.isThereError }
        return (
            <div className='Payment d-flex justify-content-center align-items-center'>
                <form className="PaymentForm">
                    <h4 className="text-center">Make Payment</h4><br />
                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="NameOnCard"><h6>Card On Name:</h6></label>
                            <input type="text"
                                className="form-control"
                                id="NameOnCard"
                                onChange={this.OnchangeInputHandler}
                                placeholder="Name On Card"
                                name="NameOnCard" />
                        </div>
                    </div>
                    {isThereError.NameOnCard === '' ? '' : <h6 style={{ color: 'red' }}>{isThereError.NameOnCard}</h6>}
                    <div className='row'>
                        <div className="form-group col">
                            <label htmlFor="CardNumber"><h6>Card Number:</h6></label>
                            <input type="number"
                                className="form-control"
                                onChange={this.OnchangeInputHandler}
                                minLength='16'
                                maxLength='16'
                                id='CardNumber'
                                placeholder="Card Number"
                                name="CardNumber" />
                        </div>
                    </div>
                    {isThereError.CardNumber === '' ? '' : <h6 style={{ color: 'red' }}>{isThereError.CardNumber}</h6>}
                    <label htmlFor="Expire"><h6>Expiry Date:</h6></label>
                    <div className='row' id='Expire'>
                        <div className="form-group col">
                            <input type="number"
                                onChange={this.OnchangeInputHandler}
                                className="form-control"
                                id="month"
                                placeholder="MM"
                                name="Month" />
                        </div>
                        <div className="form-group col">
                            <input type="number"
                                onChange={this.OnchangeInputHandler}
                                className="form-control"
                                id="year"
                                min='2020'
                                placeholder="YYYY"
                                name="Year" />
                        </div>
                        <div className="form-group col">
                            <input type="number"
                                onChange={this.OnchangeInputHandler}
                                className="form-control"
                                id="cvv"
                                placeholder="CVV"
                                name="Cvv" />
                        </div>
                    </div>
                    {isThereError.Month === '' ? '' : <h6 style={{ color: 'red' }}>{isThereError.Month}</h6>}
                    {isThereError.Cvv === '' ? '' : <h6 style={{ color: 'red' }}>{isThereError.Cvv}</h6>}
                    {isThereError.Year === '' ? '' : <h6 style={{ color: 'red' }}>{isThereError.Year}</h6>}
                    <div className="form-group">
                        {this.state.Alert === '' ? '' : <h6 style={{ color: 'red' }}>{this.state.Alert}</h6>}
                        <Link to={{ pathname: '/checkout' }} onClick={this.validate} className="btn btn-info btn-block "  >Proceed</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Payment;


