import React from 'react'
import Axios from 'axios';
import {NavLink} from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Data: [],
            Email: '',
            Password: '',
            intervalIsSet: '',
            isThereError: {
                Email: '',
                Password: ''
            },
            FormInvalid:''
        }
    }


    Validate = event => {
        event.preventDefault()
        this.getUserDataFromDb()

        let valid = true
        const data = this.state.Data
    
        return valid
    }


    async  getUserDataFromDb(){
        await  Axios.post('http://localhost:3001/api/getUserData',
          {
              Email:this.state.Email,
              Password:this.state.Password
           })
           .then((res)=>{
               let d = res.data.data
               this.setState({ Data: d })
           })
           console.log(this.state.Data)
  
           if(this.state.Data.length > 0){
               Axios.post('http://localhost:3001/api/putLoginData', {
                        Email: this.state.Email,
                        Password: this.state.Password,
                        Name : this.state.Data[0].FirstName
                    });
                    window.location=('/')
           }
           else{
               this.setState({
                FormInvalid: 'If New User Login or User Not Found '
            })
           }    
         
       }

    onChangeInputHandler = (event) => {
        event.preventDefault()
        const MailForm = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)
        const { name, value } = event.target
        const isThereError = { ...this.state.isThereError }

        switch (name) {
            case 'Email':
                isThereError.Email = MailForm.test(value) ? "" : 'Please Provide correct Email'
                break;
            case 'Password':
                isThereError.Password = value.length < 6 ? "Password Must Containe Min 6 Charecters" : ''
                break;
            default:
                break;
        }
        this.setState({ isThereError: isThereError, [name]: value })
    }

    render() {
        console.log(this.state.Data[0])
        const isThereError = { ...this.state.isThereError }
        return (
            <div className='Login d-flex justify-content-center align-items-center'>
                <form onSubmit={this.Validate} className="text-center LoginForm" action="#!">
                    <h4>Sign in</h4><br />
                    <div className="form-group ">
                        <label htmlFor="LoginFormEmail"><h6>User Email:</h6></label>
                        <input type="email"
                            onChange={this.onChangeInputHandler}
                            id="LoginFormEmail"
                            name='Email'
                            className="form-control"
                            placeholder="E-mail" />
                    </div>
                    {isThereError.Email.length === '' ? '' : <h6 style={{ 'color': 'red' }}>{isThereError.Email}</h6>}
                    <div className="form-group ">
                        <label htmlFor="LoginFormPassword"><h6>User Password:</h6></label>
                        <input type="password"
                            id="LoginFormPassword"
                            onChange={this.onChangeInputHandler}
                            className="form-control "
                            name='Password'
                            placeholder="Password" />
                    </div>
                    {isThereError.Password.length === '' ? '' : <h6 style={{ 'color': 'red' }}>{isThereError.Password}</h6>}
                    {this.state.FormInvalid === '' ? '' : <h6 style={{ color: 'red' }}>{this.state.FormInvalid}</h6>}

                    <button className="btn btn-info btn-block " type="submit">Sign in</button>
                      <NavLink to={{pathname:'/registrationpage'}}>New User? <b>click here</b></NavLink>
                </form>
            </div>
        )
    }
}
export default Login;