import React from 'react'
import '../css/checkout.css'
import Axios from 'axios';
import {saveAs}  from 'file-saver'

class Checkout extends React.Component {

    constructor() {
        super();
        this.state = {
            Logindata: [],
            Passenger: [],
            TotalCost:'',
            SGST:'',
            CGST:''
        }
    }

 componentDidMount() {
        this.getLoginDataFromDb()
        this.getPassengerInfo()
    }
    async getLoginDataFromDb() {
        await Axios.get('http://localhost:3001/api/getLoginData')
            .then((data) => this.setState({ Logindata: data.data.data[0] }))
    }

    async getPassengerInfo() {
        await Axios.get('http://localhost:3001/api/getPassengerInfo')
            .then((data) => this.setState({ Passenger: data.data.data[0] }))
        console.log(this.state.Passenger)
        const SGST = this.state.Passenger.Cost*0.09
        const CGST =  this.state.Passenger.Cost*0.09
        const TotalCost = this.state.Passenger.Cost+SGST+CGST
        this.setState({
            TotalCost:TotalCost,
            SGST:SGST,
            CGST:CGST
        })
    }

    generate=()=>{
        Axios.post('http://localhost:3001/api/createpdf', this.state)
        .then(()=> Axios.get('http://localhost:3001/api/fetch-pdf'),{responseType : 'blob'})
        .then((res)=>{
            const pdfBlob = new Blob([res.data],{type:'Application/pdf'})
            saveAs(pdfBlob,'new-pdf')
        })
    } 

    render() {
        return (
            <div className='containerc d-flex  justify-content-center  align-items-center'>

                <table className="table checkout table-borderless  " style={{width:'70%'}}>

                    <tbody>
                        <tr style={{ margin: '100px' }}>
                            <th className="bg-dark " colSpan='4'><h5>BusBooking.com</h5></th>
                        </tr>
                        <tr style={{ margin: '100px'}}>
                            <td colSpan='3'><h6>Dear {this.state.Logindata.Name} , Congratulation, Your Ticket Has Been Booked</h6></td>
                        </tr>
                        <tr>
                            <th scope="row" className="bg-dark" colSpan='4'><h5>Bus Information</h5></th>
                        </tr>
                        <tr>
                            <td><h5>BusType</h5></td>
                            <td><h5>Departure</h5></td>
                            <td><h5>Arrivals</h5></td>
                            <td><h5>Journey Date</h5></td>
                        </tr>
                        <tr>
                            <td><h6>{this.state.Passenger.BusType}</h6></td>
                            <td><h6>{this.state.Passenger.Departure}</h6></td>
                            <td><h6>{this.state.Passenger.Arrivals}</h6></td>
                            <td><h6>{this.state.Passenger.Date}</h6></td>
                        </tr>
                        <tr>
                            <th scope="row" className="bg-dark" colSpan='4'><h5>Passenger Information</h5></th>
                        </tr>
                        <tr>
                            <td><h5>Name</h5></td>
                            <td><h5>Seat No</h5></td>
                            <td><h5>Contact No</h5></td>
                            <td><h5>Email</h5></td>
                        </tr>
                        <tr>
                            <td><h6>{this.state.Passenger.Name}</h6></td>
                            <td><h6>{this.state.Passenger.SeatNo}</h6></td>
                            <td><h6>{this.state.Passenger.Phone}</h6></td>
                            <td><h6>{this.state.Passenger.Email}</h6></td>
                        </tr>
                        <tr>
                            <th scope="row " className="bg-dark" colSpan='4'><h5>Price Information</h5></th>
                        </tr>
                        <tr>
                            <td><h5>Particulars</h5></td>
                            <td></td>
                            <td></td>
                            <td><h5>Total Amount</h5></td>
                        </tr>
                        <tr>
                            <td><h5>Booking Fee</h5></td>
                            <td></td>
                            <td><h6>{this.state.Passenger.Cost}</h6></td>
                            
                        </tr>
                        <tr>
                            <td><h5>Other Tax</h5></td>
                            <td></td>
                            <td><h6>0</h6></td>
                            <td rowSpan='4'><h6>{this.state.TotalCost}</h6></td>
                        </tr>
                        <tr>
                            <td><h5>CGST Tax</h5></td>
                            <td></td>
                            <td><h6>{this.state.CGST}</h6></td>
                            
                        </tr>
                        <tr>
                            <td><h5>SGST Tax</h5></td>
                            <td></td>
                            <td><h6>{this.state.SGST}</h6></td>
                        </tr>
                        <tr>
                        <td colSpan="4"><button onClick={this.generate} type="submit" className="btn btn-info  ">Generate Pdf</button></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Checkout;