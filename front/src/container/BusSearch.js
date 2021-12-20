import React from 'react'
import AvailableBus from './AvailableBus'
import Axios from 'axios'


class BusSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data : [],
            From: '',
            To: '',
            Date: '',
            isThereError: {
                From: '',
                To: '',
                Date: ''
            },
            ShowBus: [],
            show: false,
            ifNoFound:'',
            isFieldsEmpty:''
        }
    }

    isValid = ({ isThereError, From, To, Date }) => {
        let valid = true
        Object.values(isThereError).forEach(value => {
            if (value.length > 0) {
                valid = false
                this.setState({
                    show:false
                })
            }
        });
        if (From === '') {
            valid = false
            this.setState({
                show:false
            })
        }
        if (To === '') {
            valid = false
            this.setState({
                show:false
            })
        }
        if (Date === '') {
            valid = false
            this.setState({
                show:false
            })
        }
        return valid
    }
    Validate = (event) => {
        event.preventDefault();
        if (this.isValid(this.state)) {
            this.getBusDataFromDb()
            this.setState({
                isFieldsEmpty:''
            })
        }
        else {
            this.setState({
                isFieldsEmpty:'Plese Enter All Fields'
            })
        }
    }


    OnchangeInputHandler = (event) => {
        event.preventDefault();

        const { name, value } = event.target

        const isThereError = { ...this.state.isThereError }
        switch (name) {
            case 'From':
                isThereError.From = value.length < 3 ? 'Please Enter City' : ''
                break;
            case 'To':
                isThereError.To = value.length < 3 ? 'Please Enter City' : ''
                break;
            case 'Date':
                isThereError.Date = value.lengthl < 0 ? 'Please Enter City' : ''
                break;
            default:
                break;
        }
        this.setState({
            isThereError: isThereError,
            [name]: value
        })
    }

    async  getBusDataFromDb(){
        await  Axios.post('http://localhost:3001/api/getBusData',
          {
              From:this.state.From,
              To:this.state.To,
              Date:this.state.Date
           })
           .then((res)=>{
               let d = res.data.data
               console.log(d)
               this.setState({ Data: d })
           })
           console.log(this.state.Data)
  
           if(this.state.Data.length > 0){
            
               this.setState({
                   ifNoFound:'',
                   show:true
               })
           }
           else{
        
               this.setState({
                  ifNoFound:'Route Not Found',
                  show:false
              })
           }    
         
       }


    render() {
         
         console.log(this.state.Data)
        const isThereError = { ...this.state.isThereError }
        return (<div>
            <div className=' busSearch d-flex justify-content-center align-items-center'>
                <form onSubmit={this.Validate} className="text-center SearchForm">
                    <h4>Search Bus</h4><br />
                    <div className="form-group ">
                        <label htmlFor="from"><h6>Leaving From:</h6></label>
                        <select type="text"
                            className="form-control"
                            id="from"
                            onChange={this.OnchangeInputHandler}
                            placeholder="From"
                            name="From" >
                                <option>
                                    From
                                </option>
                                <option>
                                    Bangalore
                                </option>
                                <option>
                                    Chennai
                                </option>
                            </select>
                    </div>
                    {isThereError.From.length > 0 ? <h6 style={{ 'color': 'red' }}>{isThereError.From}</h6> : ''}
                    <div className="form-group">
                        <label htmlFor="to"><h6>Going To:</h6></label>
                        <select type="text"
                            className="form-control"
                            id="To"
                            onChange={this.OnchangeInputHandler}
                            name='To' >
                                <option>
                                    To
                                </option>
                                <option>
                                    Bangalore
                                </option>
                                <option>
                                    Chennai
                                </option>
                            </select>
                    </div>
                    {isThereError.To.length > 0 ? <h6 style={{ 'color': 'red' }}>{isThereError.To}</h6> : ''}
                    <div className="form-group">
                        <label htmlFor="date"><h6>Journey Date:</h6></label>
                        <input type="date"
                            onChange={this.OnchangeInputHandler}
                            className="form-control"
                            id="date"
                            min='2020-05-06'
                            max='2020-06-08'
                            placeholder="DD-MM-YYYY"
                            name="Date" />
                    </div>
                    {isThereError.Date.length > 0 ? <h6 style={{ 'color': 'red' }}>{isThereError.Date}</h6> : ''}
                    {this.state.ifNoFound === '' ? '' : <h6 style={{ color: 'red' }}>{this.state.ifNoFound}</h6>}
                    {this.state.isFieldsEmpty === '' ? '' : <h6 style={{ color: 'red' }}>{this.state.isFieldsEmpty}</h6>}

                    <div className="form-group" style={{ 'textAlign': 'center' }}>
                        <button  type="submit" className="btn btn-info  btn-block">Search</button>
                    </div>
                </form>
            </div>
            {this.state.show ? <AvailableBus ShowBus={this.state.Data} /> : ''}
        </div>
        )
    }
}
export default BusSearch;
