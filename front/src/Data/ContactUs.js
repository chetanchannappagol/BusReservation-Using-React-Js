
import React from "react";

class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Email: '',
            Message: "",
            isThereError: {
                NameError: '',
                EmailError: '',
                MessageError: ''
            },
            isValidForm:false
        }
    }

    isValid = ({isThereError,...rest}) =>{
        let valid = true
        console.log(isThereError)
        Object.values(isThereError).forEach(value => {
            if(value.length > 0 ){
                valid = false
            }        
        });
        console.log(rest)

        Object.values(rest).forEach(value => {
            if(value === ''){
                valid = false
            } 
        });
        console.log(valid)
        return valid
    }

    Validate = (event) =>{
        event.preventDefault()
        let isValidForm = {...this.state.isValidForm}

        if(this.isValid(this.state)){
            this.setState({
                isValidForm : true
            })
        }
        else{
            alert('your Infomation is Empty Or You Entered Wrong Information ')
        }
    }

    

    onChangeInputHandler = (event) => {

        event.preventDefault();
        const isThereError = { ...this.state.isThereError }
        const { name, value } = event.target
        const MailForm = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)

        switch (name) {
            case 'Name':
                isThereError.NameError = value.length < 3 ? 'Name Must Contain 3 Charecters ' : ''
                break;
            case 'Email':
                isThereError.EmailError = MailForm.test(value) ? '' : 'Enter Valid Email'
                break;
            case 'Message':
                isThereError.MessageError = value.length < 15 ? 'Message Must Contain 15 Charecters ' : ''
                break;
        }

        this.setState({
            isThereError, [name]: value
        })
    }
    render() {
        console.log(this.props.location.Name)
        const isThereError = { ...this.state.isThereError }
        return (
            <div className='ContactUs d-flex justify-content-center align-items-center' >
                { this.state.isValidForm ? 
                <div className="text-center ContactForm"><h1>Thank You We Will Contact You</h1></div> :
                <form onSubmit={this.Validate} className="text-center ContactForm">
                    <h4>Contact Us</h4><br />
                    <div className="row">
                        <div className="col-md">
                            <div className="form-group">
                                <input type="text" 
                                className="form-control" 
                                name="Name" 
                                autocomplete="off" 
                                onChange={this.onChangeInputHandler}
                                id="Name" 
                                placeholder="Name" />
                            </div>
                            {isThereError.NameError.length > 0 ? <h6 style={{'color':'red'}}>{isThereError.NameError}</h6> : ''}
                        </div>
                        <div className="col-md">
                            <div className="form-group">
                                <input type="email" 
                                className="form-control" 
                                name="Email" 
                                autocomplete="off" 
                                id="email" 
                                onChange={this.onChangeInputHandler}
                                placeholder="E-mail" />
                            </div>
                            {isThereError.EmailError.length > 0 ? <h6 style={{'color':'red'}}>{isThereError.EmailError}</h6> : ''}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <div className="form-group">
                                <textarea className="form-control textarea" 
                                rows="3" 
                                name="Message" 
                                id="Message" 
                                onChange={this.onChangeInputHandler}
                                placeholder="Message"></textarea>
                            </div>
                            {isThereError.MessageError.length > 0 ? <h6 style={{'color':'red'}}>{isThereError.MessageError}</h6> : ''}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <button type="submit" className="btn btn-info ">Send a message</button>
                        </div>
                    </div>
                </form>}
            </div>



        )

    }
}

export default ContactUs;