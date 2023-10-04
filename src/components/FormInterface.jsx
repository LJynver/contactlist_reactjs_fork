import React, {Component} from "react";
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../App.css';

class FormInterface extends Component{
    constructor(){
        super();
        this.state = {
            lastName: '',
            firstName: '',
            emailAdd: '',
            contactNumber: ''
        };
        this.formSubmitted = this.formSubmitted.bind(this);
        this.inputType = this.inputType.bind(this);
    }
    
    inputType(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    

    formSubmitted(e){
        e.preventDefault();
    }

    render(){
        return(
            <div style={{position: 'relative', width: 'inherit', height: 'inherit'}}>
                <div id="transparentGrayBG">
                </div>
                <div id="modal">
                <center>
                    <br/>
                    <h2 style={{margin: '0px'}}>Contact</h2><br/>
                        <form id="modalForm" onSubmit={this.formSubmitted}>
                            <input onChange={this.inputType} required maxlength="50" name="lname" id="lname" placeholder="Last name" className="inputFields"/><br/>
                            <input onChange={this.inputType}  required maxlength="50" name="fname" id="fname" placeholder="First name" className="inputFields"/><br/>
                            <input onChange={this.inputType}  required maxlength="50" name="emailAdd" id="emailAdd" type="email" placeholder="Email address" className="inputFields"/><br/>
                            <input onChange={this.inputType}  required maxlength="15" name="contactNum" id="contactNum" type="tel" placeholder="Contact number" className="inputFields"/><br/>
                            <button id="btnName" type="submit">Submit</button>
                        </form>
                    <a href="/ " style={{margin: '20px'}}>Return to Home</a>
                </center>
                </div>
            </div>
        );
    }
}

export default FormInterface;