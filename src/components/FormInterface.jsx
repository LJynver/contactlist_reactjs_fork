import React, {Component} from "react";
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../App.css';
import axios from "axios";

class FormInterface extends Component{
    constructor(props){
        super(props);
        this.state = {
            lname: '',
            fname: '',
            emailAdd: '',
            contactNum: '',
            curEmail: '' //this is only for insertion
        };
        this.formSubmitted = this.formSubmitted.bind(this);
        this.inputType = this.inputType.bind(this);
    }
    
    inputType(event) { //as it is being typed, the data is updated to the this.state object
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    formSubmitted(e){
        e.preventDefault();
        
        const data = { //variable constant data gets a hold of the this.state datas
            fname: this.state.fname,
            lname: this.state.lname,
            emailAdd: this.state.emailAdd,
            contactNum: this.state.contactNum,
            curEmail: this.state.curEmail
        }

        if (this.props.location.state && this.props.location.state.editID) {

            const editID = this.props.location.state.editID;
            axios.post(`http://localhost/contactlist_reactjs_fork/src/backends/edit.php?id=${editID}&fname=${data.fname}&lname=${data.lname}&emailAdd=${data.emailAdd}&contactNum=${data.contactNum}&curEmail=${data.curEmail}`)
            .then((response) => {
                if (response.status == 200) {
                    alert(response.data.message);
                    this.props.history.push('/');
                }
            })
            .catch((error) => {
                console.error(error);
            })
            ;

        } else {

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
    }

    componentDidMount() { //method only does its thing when the state.editID was set
        if (this.props.location.state && this.props.location.state.editID) {
            const editID = this.props.location.state.editID;
            axios.get(`http://localhost/contactlist_reactjs_fork/src/backends/read.php?id=${editID}`)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response.data.data[0]);
                    this.setState({
                        lname: response.data.data[0].lastName || '',
                        fname: response.data.data[0].firstName || '',
                        emailAdd: response.data.data[0].email || '',
                        contactNum: response.data.data[0].number || '',
                        curEmail: response.data.data[0].email || ''
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
        }
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
                            <input onChange={this.inputType} required maxLength="50" name="lname" id="lname" placeholder="Last name" className="inputFields" value={this.state.lname}/><br/>

                            <input onChange={this.inputType}  required maxLength="50" name="fname" id="fname" placeholder="First name" className="inputFields" value={this.state.fname}/><br/>

                            <input onChange={this.inputType}  required maxLength="50" name="emailAdd" id="emailAdd" type="email" placeholder="Email address" className="inputFields" value={this.state.emailAdd}/><br/>

                            <input onChange={this.inputType}  required maxLength="15" name="contactNum" id="contactNum" type="tel" placeholder="Contact number" className="inputFields" value={this.state.contactNum}/><br/>

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

//fixed some typos in Sir's original repo. It was the maxLength attribute