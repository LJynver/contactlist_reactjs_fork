import React, {Component} from "react";
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../App.css';
import axios from "axios";

class FormInterface extends Component{
    constructor(){
        super();
        this.state = {
            lname: '',
            fname: '',
            emailAdd: '',
            contactNum: ''
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
        
        const data = {
            fname: this.state.fname,
            lname: this.state.lname,
            emailAdd: this.state.emailAdd,
            contactNum: this.state.contactNum
        }

        console.log(data);

        axios.post(`http://localhost/contactlist_reactjs_fork/src/backends/add.php?fname=${data.fname}&lname=${data.lname}&emailAdd=${data.emailAdd}&contactNum=${data.contactNum}`)
        .then((response)=> {
            if (response.status == 200) {
                alert(response.data.message);
                this.props.history.push('/');
            }
        })
        .catch((error)=> {
            console.error(error);
        });
    }

    render(){
        return(
            <div style={{position: 'relative', width: 'inherit', height: 'inherit'}}>
                <div id="transparentGrayBG">
                </div>
                <div id="modal">
                <center>
                    <br/>
                    <h2 style={{margin: '10px'}}>Add New Contact here</h2><br/>
                        <form id="modalForm" onSubmit={this.formSubmitted}>
                            <input onChange={this.inputType} required maxlength="50" name="lname" id="lname" placeholder="Last name" className="inputFields"/><br/>
                            <input onChange={this.inputType}  required maxlength="50" name="fname" id="fname" placeholder="First name" className="inputFields"/><br/>
                            <input onChange={this.inputType}  required maxlength="50" name="emailAdd" id="emailAdd" type="email" placeholder="Email address" className="inputFields"/><br/>
                            <input onChange={this.inputType}  required maxlength="15" name="contactNum" id="contactNum" type="tel" placeholder="Contact number" className="inputFields"/><br/>
                            <button id="btnName" type="submit" onClick={this.formSubmitted}>Submit</button>
                        </form>
                    <a href="/ " style={{margin: '20px'}}>Return to Home</a>
                </center>
                </div>
            </div>
        );
    }
}

export default withRouter(FormInterface);