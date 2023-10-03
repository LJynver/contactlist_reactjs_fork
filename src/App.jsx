import './App.css'
import React, {Component} from 'react'
import FormInterface from './components/FormInterface.jsx';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class App extends Component{
  constructor(){
    super();
    this.state = {
      data: []
    }
  }

  handleButtonClick = () => {
    this.props.history.push('/form-interface');
  }

  componentDidMount() {
    var self = this;
    var contactsData;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost/contactlist_reactjs_fork/src/backends/read.php", true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        contactsData = JSON.parse(this.responseText);
        var arr = [];
        for(var x = 0; x < contactsData.count; x++){
          arr.push(contactsData.data[x]);
        }
        self.setState({
          data: arr
        })
      }
    };
  }

  render(){
    return(
      <div style={{position: 'relative', width: '100%'}}>
        <div id="contactList" className='divTable'>
            <center><h1>Contact List</h1></center>
            <table id="contactTable" className='MainTable'>
              <thead>
                <tr>
                    <th>ID</th>
                    <th>LAST NAME</th>
                    <th>FIRST NAME</th>
                    <th>EMAIL ADDRESS</th>
                    <th>CONTACT NUMBER</th>
                    <th style={{width: '100px'}}></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map((item)=>{
                    return(
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.lastName}</td>
                      <td>{item.firstName}</td>
                      <td>{item.email}</td>
                      <td>{item.number}</td>
                      <td>
                        <button style={{backgroundColor: 'green'}} className='actionButtons'>EDIT</button>
                        <button style={{backgroundColor: 'red'}} className='actionButtons'>DELETE</button>
                      </td>
                    </tr>);
                  })
                }
              </tbody>
            </table>
            <br/>
            <button className='AddButton' onClick={this.handleButtonClick}>Add New</button>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
