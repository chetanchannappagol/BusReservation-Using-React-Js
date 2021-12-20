import React from 'react'
import axios from 'axios'

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            Password: '',
            ConfirmPassword: '',
            isThereError: {
                FirstName: '',
                LastName: '',
                Email: '',
                Phone: '',
                Password: '',
                ConfirmPassword: ''
            },
            FormInvalid: ''
        }
    }

    //checking whether the fields are empty or no
    //also checking errors before submiting

    isValid = ({ isThereError, ...rest }) => {
        let valid = true
        Object.values(isThereError).forEach(value => {
            if (value.length > 0) {
                valid = false
            }
        });

        Object.values(rest).forEach(value => {
            if (value === '') {
                valid = false
            }
        });
        console.log(valid)
        return valid
    }


    Validate = event => {
        event.preventDefault()
        if (this.isValid(this.state)) {
            window.localStorage.setItem('data', (JSON.stringify(this.state)))
            axios.post('http://localhost:3001/api/putUserData', {
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Email: this.state.Email,
                Phone: this.state.Phone,
                Password: this.state.Password,
                ConfirmPassword: this.state.ConfirmPassword,
            });
            window.location = ('./loginpage')
        }
        else {
            console.log('form is invalid')
            this.setState({
                FormInvalid: 'Please Enter All feilds Correctly'
            })
        }
    }

    OnchangeInputHandler = (event) => {
        event.preventDefault();

        const { name, value } = event.target
        const isThereError = { ...this.state.isThereError }
        const MailForm = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)
        console.log(this.state)
        // isThereError.ConfirmPassword = this.state.Password !== this.state.ConfirmPassword ? 'mismatch' : ''
        switch (name) {
            case "FirstName":
                isThereError.FirstName = value.length < 3 ? "FirstName must Containe Atleast 3 Charecters" : ""
                break;
            case 'LastName':
                isThereError.LastName = value.length < 3 ?
                    'LastName must Containe Atleast 3 Charecters' : ''
                break;
            case 'Email':
                isThereError.Email = MailForm.test(value) ?
                    '' : 'Enter Valid Email'
                break;
            case 'Phone':
                isThereError.Phone = value.length < 10 || value.length > 10 ?
                    'Phone No must Containe 10 Digit' : ''
                break;
            case 'Password':
                isThereError.Password = value.length < 6 ?
                    'Password must Containe Atleast 6 Charecters' : ''
                break;
            case 'ConfirmPassword':
                isThereError.ConfirmPassword = this.state.Password !== event.target.value ? 'Mismatch Password' : ''
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
            <div className='Registration  d-flex justify-content-center align-items-center' >
                <form onSubmit={this.Validate} method='post' className="text-center RegisterForm " noValidate>
                    <h4>Registration</h4><br />
                    <div className="form-group " >
                        <label htmlFor="RegFirstName"><h6>First Name:</h6></label>
                        <input type="text"
                            name='FirstName'
                            onChange={this.OnchangeInputHandler}
                            className="form-control"
                            id="RegFirstName"
                            noValidate
                            placeholder="First Name" />
                        {isThereError.FirstName.value === '' ?
                            '' : <h6 style={{ 'color': 'red' }}>{isThereError.FirstName}</h6>}
                    </div>

                    <div className="form-group ">
                        <label htmlFor="RegLastName"><h6>Last Name:</h6></label>
                        <input type="text"
                            name='LastName'
                            onChange={this.OnchangeInputHandler}
                            className="form-control"
                            id="RegLastName"
                            noValidate
                            placeholder="Last Name" />
                        {isThereError.LastName.value === '' ?
                            '' : <h6 style={{ 'color': 'red' }}>{isThereError.LastName}</h6>}
                    </div>
                    <div className="form-group ">
                        <label htmlFor="RegEmail"><h6>Email:</h6></label>
                        <input type="email"
                            name='Email'
                            onChange={this.OnchangeInputHandler}
                            className="form-control"
                            id="RegEmail"
                            placeholder="Email" />
                        {isThereError.Email.value === '' ?
                            '' : <h6 style={{ 'color': 'red' }}>{isThereError.Email}</h6>}
                    </div>
                    <div className="form-group ">
                        <label htmlFor="RegPhone"><h6>Phone No:</h6></label>
                        <input type="number"
                            name='Phone'
                            onChange={this.OnchangeInputHandler}
                            className="form-control"
                            id="RegPhone"
                            noValidate

                            placeholder="Phone No" />
                        {isThereError.Phone.value === '' ?
                            '' : <h6 style={{ 'color': 'red' }}>{isThereError.Phone}</h6>}
                    </div>
                    <div className="form-group ">
                        <label htmlFor="RegPassword"><h6>Password:</h6></label>
                        <input type="password"
                            name='Password'
                            noValidate
                            onChange={this.OnchangeInputHandler}
                            className="form-control"
                            id="RegPassword"
                            placeholder="Password" />
                        {isThereError.Password.value === '' ?
                            '' : <h6 style={{ 'color': 'red' }}>{isThereError.Password}</h6>}
                    </div>
                    <div className="form-group ">
                        <label htmlFor="RegConfirmPassword"><h6>Confirm Password:</h6></label>
                        <input type="password"
                            name='ConfirmPassword'
                            noValidate
                            onChange={this.OnchangeInputHandler}
                            className="form-control"
                            id="RegConfirmPassword"
                            placeholder="Confirm Password" />
                        {isThereError.ConfirmPassword.value === '' ?
                            '' : <h6 style={{ 'color': 'red' }}>{isThereError.ConfirmPassword}</h6>}
                    </div>
                    {this.state.FormInvalid === '' ? '' : <h6 style={{ color: 'red' }}>{this.state.FormInvalid}</h6>}
                    <div className="form-group" >
                        <button type="submit"
                            className="btn btn-info btn-block ">Register</button>
                    </div>
                </form>
            </div>

        )
    }
}
export default Registration;
