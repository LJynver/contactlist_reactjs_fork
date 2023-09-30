import React, {Component} from "react";
import '../App.css';

class PopUp extends Component{
    constructor(){
        super();
        this.formSubmitted = this.formSubmitted.bind(this);
    }

    formSubmitted(e){
        e.preventDefault();
    }

    render(){
        return(
            <div style={{position: 'relative', width: 'inherit', height: 'inherit'}} onClick={this.props.hidePopUp}>
                <div id="transparentGrayBG">
                </div>
                <div id="modal" onClick={(e) => e.stopPropagation()}>
                <center>
                    <br/>
                    <h2 style={{margin: '0px'}}>Contact</h2><br/>
                    <form id="modalForm" onSubmit={this.formSubmitted(event)}>
                    <input required maxlength="50" name="lname" id="lname" placeholder="Last name" className="inputFields"/><br/>
                    <input required maxlength="50" name="fname" id="fname" placeholder="First name" className="inputFields"/><br/>
                    <input required maxlength="50" name="emailAdd" id="emailAdd" type="email" placeholder="Email address" className="inputFields"/><br/>
                    <input required maxlength="15" name="contactNum" id="contactNum" type="tel" placeholder="Contact number" className="inputFields"/><br/>
                    <button id="btnName" type="submit">Submit</button>
                    </form>
                </center>
                </div>
            </div>
        );
    }
}

export default PopUp;