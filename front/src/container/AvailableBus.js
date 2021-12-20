import React from 'react'
import Axios from 'axios'
import {NavLink} from 'react-router-dom'



class AvailableBus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            From: '',
            To: '',
            Date: '',
            ShowBus: [],
            Logindata:[],
            NotAvailable: false,
            PleaseLogin:''
        }
    }

    componentDidMount(){
        //fetching user login info
                    Axios.get('http://localhost:3001/api/getLoginData')
                   .then((data) => this.setState({ Logindata: data.data.data }))
                   console.log(this.state.Logindata.length)
        
    }

    static getDerivedStateFromProps(props, state) {
        if (props.ShowBus.length > 0) {
            state.ShowBus = props.ShowBus
            state.NotAvailable = true
        }
        else {
            state.NotAvailable = false
        }
        return true
    }

    BookSeat = (index)=>{
        // event.preventDefault();
        console.log(index)
        console.log(this.state.ShowBus)

        Axios.delete('http://localhost:3001/api/deleteBusData')


        if(this.state.Logindata.length > 0){
            Axios.post('http://localhost:3001/api/postBuses',{
                From:this.state.ShowBus[index].From,
                To:this.state.ShowBus[index].To,
                Fare:this.state.ShowBus[index].Fare,
                Travels:this.state.ShowBus[index].Travels,
                Date:this.state.ShowBus[index].Date,
                BusType:this.state.ShowBus[index].BusType,
                Departure:this.state.ShowBus[index].Departure,
                Arrivals:this.state.ShowBus[index].Arrivals,
                TotalSeats:this.state.ShowBus[index].TotalSeats,
                Route:this.state.ShowBus[index].Route,
                 BookedSeats:this.state.ShowBus[index].BookedSeats,
            })
            window.location = ('/seatselect')
            this.setState({
                PleaseLogin:false
            })
        }
        else{
            this.setState({
                PleaseLogin:true
            })
        }
    }

    render() {
        return (
            <div className='container  table-responsive Available justify-content-center align-items-center'>
                <table className="table borderless ShowBusTable">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Travels</th>
                            <th scope="col">BusType</th>
                            <th scope="col">Route</th>
                            <th scope="col">Journey Date</th>
                            <th scope="col">Fare</th>
                            <th scope="col">Search</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ShowBus.map((ele,index) => <tr key={ele.RouteId}>
                            <td>{ele.Travels}</td>
                            <td>{ele.BusType}</td>
                            <td>{ele.Route}</td>
                            <td>{ele.Date}</td>
                            <td>{ele.Fare}</td>
                            <td><button onClick={()=>this.BookSeat(index)} type="submit" className="btn btn-info ">Proceed</button></td></tr>)}
                            {this.state.PleaseLogin ? <tr style={{textAlign:'center'}}>
                                <td colSpan='6'><NavLink className="btn btn-info " to={{pathname:'/loginpage'}}>Please Login</NavLink></td>
                            </tr> : ''}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default AvailableBus;

