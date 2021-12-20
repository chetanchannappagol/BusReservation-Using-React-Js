import React from 'react'
import '../css/SeatSelection.css'
import {Link} from 'react-router-dom'


import AddDetailsToSeat from './AddDetailsToSeat'
import Axios from 'axios';
import {BrowserRouter, Redirect} from 'react-router-dom'


class SeatSelection extends React.Component {
    constructor() {
        super();
        this.state = {
            SelectedSeat: [],
            NoOfSeates: '',
            BusInfo:[],
            Show:false
        }
    }

    componentDidMount() {
        this.getBusDataFromDb()
    }

    //fetching bus info from db
    async getBusDataFromDb() {
        await Axios.get('http://localhost:3001/api/getBuseInfo')
            // .then((res) => res.json())
            .then((data) => {

                if (data.data.data[0] === undefined) {
                }
                else {
                    this.setState({ BusInfo: data.data.data[0] })
                }
            }
            )
    }

    render() {
        console.log(this.state.BusInfo)
        //to check wethere the seat is clicked or  no 
        const isSeatSelected = (e) => {
            let SeatSelected = this.state.SelectedSeat
            let NoOfSeates = this.state.NoOfSeates
            if (e.target.checked) {
                if (SeatSelected.length === 0) {
                    SeatSelected.push(e.target.id)
                    NoOfSeates = SeatSelected.length
                    this.setState({
                        SelectedSeat: SeatSelected,
                        NoOfSeates: NoOfSeates
                    })
                }
                else {
                    SeatSelected.push(e.target.id)
                    NoOfSeates = SeatSelected.length
                    this.setState({
                        SelectedSeat: SeatSelected,
                        NoOfSeates: NoOfSeates
                    })
                }
                console.log('checked')
                console.log(SeatSelected)
                console.log(NoOfSeates)
            }
            else {
                for (let i = 0; i < SeatSelected.length; i++) {
                    if (SeatSelected[i] === e.target.id) {
                        SeatSelected.splice(i, 1)
                        NoOfSeates = SeatSelected.length
                        this.setState({
                            SelectedSeat: SeatSelected,
                            NoOfSeates: NoOfSeates
                        })
                    }
                }

                console.log('unchecked')
                console.log(SeatSelected)
                console.log(NoOfSeates)

            }
        }

        let rows = [];

        for (var i = 0; i < this.state.BusInfo.TotalSeats; i++) {
            rows.push(i + 1);
        }
        
        console.log(rows)

        return (
            <div className=' container d-flex   SelectSeat'>
                    <div className='row'>
                        <div className= " col-md-4 SeatSelectTable ">
                            <ul className='seatlist'>
                                <li>
                                    <label htmlFor=''></label>
                                </li>
                                <li>
                                    <label htmlFor=''></label>
                                </li>
                                <li>
                                    <label htmlFor=''><img src={require('../images/SteerIcon.png')}></img></label>
                                </li>
                            </ul>
                            <ul className='seatlist'>
                                {
                                    rows.map((ele) => {
                                        if (this.state.BusInfo.BookedSeats.includes(ele)) {
                                           return <li className="seat">
                                                <input type="checkbox" onClick={isSeatSelected} id={ele} disabled />
                                                <label htmlFor={ele}><img id={ele} src={require('../images/SeatOnDisable3.png')}></img></label>
                                            </li>
                                        }
                                        else {
                                           return <li className="seat">
                                                <input type="checkbox" onClick={isSeatSelected} id={ele} />
                                                <label htmlFor={ele}><img id={ele} src={require('../images/SeatOnDisable3.png')}></img></label>
                                            </li>
                                        }
                                    })
                                }
                            </ul>
                          {/* <button onClick={()=>this.setState({Show:true})} type='submit' className="btn btn-info btn-block ">Proceed</button> */}
                        </div>
                    <div>
                        <div className='col-md AddDetails'>
                            <AddDetailsToSeat Post={this.postDeatailse} SeatDetails={this.state} />
                        </div> 
                    </div>

                </div>
            </div>
        )
    }
}


export default SeatSelection;