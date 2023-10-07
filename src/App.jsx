import './App.css'
import React, {Component} from 'react'
import FormInterface from './components/FormInterface.jsx';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

//THIS REQUIRES AXIOS

class App extends Component{
  constructor(){
    super();
    this.state = {
      data: [],
      editID: null
    }
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  handleButtonClick = (editID) => {
    this.props.history.push('/form-interface');
  }

  deleteEntry(id) {
    if (confirm("This entry will be deleted! Proceed?")) {
      fetch('http://localhost/contactlist_reactjs_fork/src/backends/delete.php', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        body: 'id='+id
      })
      .then((response) => response.json())
      .then((res) => {
        alert(res["message"]);
        if (res["status"] == 200) {
          var arr = this.state.data;
          const delIndex = arr.findIndex(function(item) {
            return item.id == id; // Use == for comparison
          });
          if (delIndex !== -1) {
            arr.splice(delIndex, 1);
          }
          this.setState({
            data: arr
          });
        }
      })
      .catch(function(error) {
        console.error("Error detected: ", error);
      });
    }
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
            <center><h1 style={{margin: '30px'}}>Contact List</h1></center>
            <table id="contactTable" className='MainTable'>
              <thead>
                <tr>
                    <th>LAST NAME</th>
                    <th>FIRST NAME</th>
                    <th>EMAIL ADDRESS</th>
                    <th>CONTACT NUMBER</th>
                    <th style={{width: '300px'}}>OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map((item)=>{
                    return(
                    <tr key={item.id}>
                      <td>{item.lastName}</td>
                      <td>{item.firstName}</td>
                      <td>{item.email}</td>
                      <td>{item.number}</td>
                      <td>
                        <button style={{backgroundColor: 'green'}} className='actionButtons' onClick={()=>this.handleButtonClick(item.id)}>EDIT</button>
                        <button style={{backgroundColor: 'red'}} className='actionButtons' onClick={()=>this.deleteEntry(item.id)}>DELETE</button>
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
